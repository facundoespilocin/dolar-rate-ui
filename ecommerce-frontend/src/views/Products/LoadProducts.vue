<template>
    <div>
        <div v-if="statusCode !== 200">
            <h3>Cargar Productos</h3>

            <hr>

            <b-progress :max="totalSteps" variant="primary" stripe :animated="true">
                <b-progress-bar :value="step">
                    <span>Paso: <strong>{{ step }} / {{ totalSteps }}</strong></span>
                </b-progress-bar>
            </b-progress>

            <b-overlay :show="showOverlay" rounded="sm">
                <!-- <v-stepper :steps="steps" v-model="step"></v-stepper> -->

                <template v-if="step === 1">
                    <h4 class="my-3">Seleccioná el origen de los datos a cargar</h4>
                    
                    <div class="row margin-bottom">
                        <b-card class="col-sm-2 sombreado mx-3" v-for="dataSource in dataSourceList" :key="dataSource.id" v-model="dataSourceSelected" v-on:click="goNextStep(step)">
                            <label class="pointer">{{ dataSource.description }}</label>
                        </b-card>
                    </div>
                </template>

                <template v-if="step === 2">
                    <div class="card text-center p-2 my-3" @dragover="dragOver" @dragleave="dragLeave" @drop="drop">
                        <label for="assetsFieldHandle" class="cursor-pointer">
                            <p>Empezá por agregar tu archivo</p>
                            <p>Una vez finalizada la carga, en el siguiente paso, vas a previsualizar el listado de los Productos a cargar </p>
                        </label>

                        <div class="row">
                            <div class="my-2">
                                <input 
                                    type="file"
                                    id="assetsFieldHandle" 
                                    @change="fileListOnChange"
                                    class="col-sm-2 px-3"
                                    ref="file"
                                    accept=".jpg, .xlsx" />
                            </div>
                        </div>
                        
                        <div v-if="fileList.length" v-cloak>
                            <hr class="mx-5 margin-bottom-none">
                            
                            <div class="my-2">
                                <span v-for="file in fileList" :key="file.id">
                                    {{ file.name }} <b-button class="mx-3" pill variant="danger" type="button" @click="removeFile(fileList.indexOf(file))" title="Remove file">Quitar</b-button>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="row" v-if="products.length === 0">
                        <div class="pull-right">
                            <b-button 
                                class="pull-right"
                                variant="primary"
                                type="button"
                                v-on:click="postReadProducts()"
                                :disabled="fileList.length < 1">Siguiente</b-button>
                        </div>
                    </div>
                </template>
            
                <div v-if="products.length > 0">
                    <hr>

                    <div class="row">
                        <p class="mb-1"><em>Mostrando {{ products.length }} de {{ totalRows }} registros encontrados</em></p>
                    </div>

                    <b-table 
                        ref="productsTable"
                        class="margin-bottom"
                        :busy.sync="isBusy"
                        :items="products"
                        :fields="fields"
                        :bordered="true"
                        :table-variant="'warning'"
                        :current-page="currentPage"
                        :per-page="pageSize"
                        responsive="sm">

                        <template #cell(operations)="data">
                            <div class="pull-center">
                                <b-button 
                                    size="sm"
                                    class="btn-danger"
                                    v-b-modal.delete-modal
                                    v-on:click="showModal(data.item, data.index, $event.target)">
                                        Eliminar
                                    <b-icon-trash></b-icon-trash>
                                </b-button>
                            </div>
                        </template>

                        <template #cell(price)="data">
                            <span>$</span>{{ data.item.price }}
                        </template> 

                        <!-- A virtual composite column -->
                        <template #cell(isActive)="data">
                            <div class="pull-center mt-2">
                                <b-icon-x v-if="!data.item.isActive"></b-icon-x>
                                <b-icon-check2 v-if="data.item.isActive"></b-icon-check2>
                            </div>
                        </template> 
                    </b-table>

                    <b-modal 
                        :id="deleteModal.id"
                        :title="deleteModal.title"
                        centered 
                        hide-header-close
                        @ok="removeProduct" 
                        header-bg-variant="primary"
                        header-text-variant="light">
                        <span>{{ deleteModal.content }}</span>
                    </b-modal>

                    <b-pagination
                        v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="pageSize"
                        align="fill"
                        size="sm"
                        class="my-0">
                    </b-pagination>

                    <div class="row mt-2">
                        <div class="pull-right">
                            <b-button 
                                class="pull-right"
                                variant="primary"
                                type="button"
                                v-on:click="postLoadProducts()"
                                :disabled="fileList.length < 1">Finalizar</b-button>
                        </div>
                    </div>
                </div>

                <ResultsNotFounded v-if="noResultsFounded"></ResultsNotFounded>
            </b-overlay>
        </div>

        <Success v-if="statusCode === 200"></Success>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import "@/assets/style.css"
import ResultsNotFounded from '@/components/Warnings/ResultsNotFounded.vue'
import Success from '@/components/Warnings/Success.vue'
import { VStepper } from 'vue-stepper-component'

export default {
    components: {
        VStepper,
        ResultsNotFounded,
        Success
    },
    delimiters: ['${', '}'],
    data() {
        return {
            showOverlay: false,
            products: [],
            productSelected: null,

            // Step 1
            fileList: [], 
            dataSourceSelected: {},
            selectedFile: {},
            dataSourceList: [
                {
                    id: 1,
                    description: "Excel",
                    isActive: true
                },
                {
                    id: 2,
                    description: "Connector",
                    isActive: false
                }
            ],

            // Wizard
            steps: 2,
            step: 1,
            totalSteps: 4,

            // Tags
            appliedFilter: "Nombre",
            resultsMessage: "Mostrando 1 de 30 registros encontrados",

            // Table
            isBusy: true,
            fields: [
                { key: 'id', label: 'Id' },
                { key: 'name', label: 'Descripción' },
                { key: 'price', label: 'Precio' },
                { key: 'quantity', label: 'Cantidad' },
                { key: 'isActive', label: 'Activo' },
                { key: 'productCategoryId', label: 'Categoría' },
                { key: 'brandId', label: 'Marca' },
                { key: 'tags', label: 'Etiquetas' },
                { key: 'operations', label: '' },
            ],
            currentPage: 1,
            totalRows: 100,
            pageSize: 15,
            inputFilter: "",
            textPlaceholder: "Ingresá el Nombre",
            errorInputFilterRequired: false,
            noResultsFounded: false,

            // Modal
            deleteModal: {
                id: 'delete-modal',
                title: 'Eliminar Producto',
                content: '¿Estás seguro que deseas eliminar este elemento?'
            },

            statusCode: null,
        }
    },

    created() { },

    methods: {
        // Modal
        showModal(item, index, button) {
            this.$root.$emit('bv::show::modal', this.deleteModal.id, button);
            this.productSelected = item?.id;
        },

        // Wizard
        goNextStep(step) {
            this.step = step >= 1 && step < 4 ? ++step : step;
        },

        // FileDrop
        fileListOnChange() {
            this.fileList = [...this.$refs.file.files];
            this.selectedFile = this.fileList[0];
        },

        removeFile(i) {
            this.fileList.splice(i, 1);
        },

        dragOver(event) {
            event.preventDefault();
            // Add some visual fluff to show the user can drop its files
            if (!event.currentTarget.classList.contains('bg-green-300')) {
                event.currentTarget.classList.remove('bg-gray-100');
                event.currentTarget.classList.add('bg-green-300');
            }
        },
        
        dragLeave(event) {
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        
        drop(event) {
            event.preventDefault();
            this.$refs.file.files = event.dataTransfer.files;
            this.onChange(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        
        closeTag() {},

        async postReadProducts() {
            this.showOverlay = true;
            this.isBusy = true;

            if (this.selectedFile) {
                let resource = "/products/read-products";

                const formData = new FormData();
                formData.append("file", this.selectedFile);
                formData.append("dataSource", 1);
                
                await this.axios.post(resource, formData)
                .then(res => {
                    if (res?.data.length === 0) {
                        this.noResultsFounded = true;
                    } else {
                        this.goNextStep(2);
                        this.products = res.data;
                        this.totalRows = res.data.length;
                    }
                })
                .catch(e => {
                    console.log("error: " + e);

                    this.showNotification("error", "No se pudo leer el archivo " + e);
                })
                .finally(e => {
                    this.showOverlay = false;
                    this.isBusy = false;
                })
            } else {
                this.showNotification("error", "No se seleccionó un archivo" + e);
            }
        },

        async postLoadProducts() {
            this.showOverlay = true;
            this.isBusy = true;

            let resource = "/products/load-products";

            let body = {
                products: this.products
            }

            await this.axios.post(resource, body)
            .then(res => {
                //console.log("Se cargaron.");
                this.goNextStep(3);
                this.statusCode = res.data.metadata.status;
            })
            .catch(e => {
                //console.log("Error al cargar: " + e);

                this.showNotification("error", "No fue posible cargar los Productos. Error: " + e);
            })
            .finally(e => {
                this.showOverlay = false;
                this.isBusy = false;
            })
        },

        validateFields() {
            let result = true;
            
            return result;
        },

        showNotification(type, text) {
            this.$toasted.show(text, {
                duration: 3000,
                type: type,
                theme: "bubble",
                singleton: true,
                action: {
                    text: 'X',
                    onClick: (e, toastObject) => {
                        toastObject.goAway(0);
                    }
                },
            });
        },

        // Table functions
        removeProduct() {
            let index  = this.products.findIndex(i => i.id === this.productSelected);
            
            if (index !== -1) {
                this.products.splice(index, 1);
            } else {
                this.showNotification("error", "No fue posible eliminar el registro elegido" + e);
            }
        },
    },

    computed: {},

    watch: {}
}
</script>