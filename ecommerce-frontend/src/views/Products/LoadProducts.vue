<template>
    <div>
        <h3>Cargar Productos</h3>

        <hr>

        <b-overlay :show="showOverlay" rounded="sm">
            <v-stepper :steps="steps" v-model="step"></v-stepper>

            <template v-if="step === 1">
                <div>
                    <h4 class="my-3">Seleccioná el origen de los datos a cargar</h4>

                    <div class="row">
                        <b-card class="col-sm-2 sombreado mx-3" v-for="dataSource in dataSourceList" :key="dataSource.id" v-model="dataSourceSelected" v-on:click="goNextStep(step)">
                            <label class="pointer">{{ dataSource.description }}</label>
                        </b-card>
                    </div>
                </div>
            </template>

            <template v-if="step === 2">
                <div class="card text-center p-2 my-3" @dragover="dragover" @dragleave="dragleave" @drop="drop">
                    <label for="assetsFieldHandle" class="cursor-pointer">
                        <p>Empezá por agregar tu archivo</p>
                        <p>Una vez finalizada la carga, en el siguiente paso, vas a previsualizar el listado de los Productos a cargar </p>
                    </label>

                    <div class="row">
                        <div class="my-2">
                            <input 
                                type="file"
                                id="assetsFieldHandle" 
                                @change="onChange"
                                class="col-sm-2 px-3"
                                ref="file"
                                accept=".jpg, .xlsx" />
                            </div>
                        </div>
                    
                        <div v-if="fileList.length" v-cloak>
                            <hr class="mx-5 margin-bottom-none">
                            
                            <div class="my-2">
                                <span v-for="file in fileList">
                                    {{ file.name }} <b-button class="mx-3" pill variant="danger" type="button" @click="remove(fileList.indexOf(file))" title="Remove file">Quitar</b-button>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="pull-right">
                            <b-button 
                                class="pull-right"
                                variant="primary"
                                type="button"
                                v-on:click="getLoadProducts()"
                                :disabled="fileList.length < 1">Siguiente</b-button>
                        </div>
                    </div>
            </template>
        </b-overlay>

        <div v-if="products.length > 0">
            <hr>

            <div class="row my-3">
                <div class="col-sm-4" v-if="appliedFilter !== ''">
                    <span class="label success">
                        {{ appliedFilter }}
                        <span href="#" v-on:click="closeTag(true)" class="pointer">x</span>
                    </span>
                </div>
            </div>

            <div class="row">
                <p class="mb-1"><em>{{ resultsMessage }}</em></p>
            </div>

            <!-- Table-->
            <b-table
                :items="products"
                :dark="true"
                :fields="fields"
                :bordered="true"
                :hover="true"
                striped
                responsive="sm">
                    <!-- <template #cell(operaciones)="row"> -->
                    <template #cell(operations)="data">
                        <!-- <b-button size="sm" class="mx-2 btn-warning" v-on:click="editCadet(data.item)">Editar</b-button> -->
                        <b-button size="sm" class="mr-2 btn-danger" v-on:click="removeProduct(data.item)">Eliminar</b-button>
                    </template>

                    <!-- A virtual composite column -->
                    <!-- <template #cell(cellphone)="data">
                        {{ data.item.cellPhone.areaCod }}{{ data.item.cellPhone.number }}
                    </template> -->
            </b-table>
        </div>

        <div class="row mt-4" v-if="noResultsFounded">
            <div class="col-sm-1">            
                <b-icon icon="exclamation-circle" class="icon-size-l pull-left text-color-red" />
            </div>
            <div class="col-sm-9">
                <h4 class="text-color-red">
                    No se encontraron resultados. Por favor, selecciona nuevos parámetros de búsqueda.
                </h4>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import "@/assets/style.css"
import { VStepper } from 'vue-stepper-component'

export default {
    components: {
        VStepper
    },
    delimiters: ['${', '}'],
    data() {
        return {
            steps: 2,
            step: undefined,
            showOverlay: false,
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

            products: [],

            fileList: [], 

            dataSourceSelected: {},

            selectedFile: {},

            // Tags
            appliedFilter: "Nombre",
            resultsMessage: "Mostrando 1 de 30 registros encontrados",

            // Table
            fields: [
                { key: 'id', label: 'Id' },
                { key: 'name', label: 'Descripción' },
                { key: 'price', label: 'Precio' },
                { key: 'quantity', label: 'Cantidad' },
                { key: 'isActive', label: 'Activo' },
                { key: 'productCategoryId', label: 'Categoría' },
                { key: 'brandId', label: 'Marca' },
                { key: 'tags', label: 'Etiquetas' },
                { key: 'imageUrl', label: 'Imagen' },
                { key: 'operations', label: '' },
            ],

            noResultsFounded: false,
        }
    },

    created() { 
        
    },

    methods: {
        goNextStep(step) {
            this.step = step >= 1 && step < 2 ? ++step : step;
        },

        onChange() {
            this.fileList = [...this.$refs.file.files];
            this.selectedFile = this.fileList[0];
        },

        remove(i) {
            this.fileList.splice(i, 1);
        },

        dragover(event) {
            event.preventDefault();
            // Add some visual fluff to show the user can drop its files
            if (!event.currentTarget.classList.contains('bg-green-300')) {
                event.currentTarget.classList.remove('bg-gray-100');
                event.currentTarget.classList.add('bg-green-300');
            }
        },
        
        dragleave(event) {
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

        getLoadProducts() {
            this.showOverlay = true;

            if (this.selectedFile) {
                const formData = new FormData();
                
                console.log("selectedFile: " + this.selectedFile)

                formData.append("file", this.selectedFile);
                formData.append("dataSource", 1);

                let resource = "/products/read-products";
                
                this.axios.post(resource, formData)
                .then(res => {
                    this.products = res.data;
                })
                .catch(e => {
                    console.log("error: " + e);

                    this.showNotification("error", "No se pudo leer el archivo");
                    this.showOverlay = false;
                })
            }

            this.showOverlay = false;
        },

        validateFields() {
            let result = true;
            
            return result
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
    },

    computed: {},

    watch: {}
}
</script>