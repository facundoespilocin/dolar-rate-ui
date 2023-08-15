<template>
    <div>
        <div class="row my-2">
            <label id="searchedEmail" class="control-label">Buscar como</label>

            <div class="col-2">
                <div class="form-group">
                    <select id="selectTypeSearch" class="form-select" v-model="searchByFilterSelected">

                        <option 
                            v-for="(searchByFilter, index) in searchByFilters" :value="searchByFilter" :key="index">
                                {{ searchByFilter.description }}
                        </option>
                    </select>
                </div>
            </div>
            
            <div class="col-xs-12 col-sm-6">
                <input type="text"
                    :placeholder="textPlaceholder"
                    :class="[errorInputFilterRequired ? 'form-control is-invalid' : 'form-control']"
                    maxlength="100"
                    v-model="inputFilter">
                    <small v-if="errorInputFilterRequired">Es un campo requerido</small>
            </div>

            <div class="col-xs-12 col-sm-4" style="text-align: left">
                <b-button variant="primary" type="submit" v-on:click="getProductsFiltered()">Buscar</b-button>
            </div>
        </div>

        <div class="row">
            <label>Estado:</label>

            <div class="radio-group">
                <label>
                    <input type="radio" value="2" v-model="statusSelected" /> Todos
                </label>

                <label>
                    <input type="radio" value="1" class="margin-left" v-model="statusSelected" /> Activo
                </label>

                <label>
                    <input type="radio" value="0" class="margin-left" v-model="statusSelected" /> No Activo
                </label>
            </div>
        </div>

        <hr>

        <div class="row">
            <p class="mb-1"><em>Mostrando {{ totalRowsFiltered }} de {{ totalRows }} registros encontrados</em></p>
        </div>

        <!-- Table -->
        <div v-if="products.length > 0">
            <b-overlay :show="showOverlay" rounded="sm">
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
            </b-overlay>

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
                :total-rows="totalRowsFiltered"
                :per-page="pageSize"
                align="fill"
                size="sm"
                class="my-0">
            </b-pagination>
        </div>

        <ResultsNotFounded v-if="noResultsFounded"></ResultsNotFounded>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import ResultsNotFounded from '@/components/Warnings/ResultsNotFounded.vue'
import "@/assets/style.css"

export default {
    components: {
        ResultsNotFounded
    },
    delimiters: ['${', '}'],
    data() {
        return {
            products: [],
            productSelected: null,
            isBusy: false,

            // Filter Area
            // States
            options: [
                {
                    text: "Todos",
                    value: 2
                },
                {
                    text: "Activo",
                    value: 1
                },
                {
                    text: "No Activo",
                    value: 0
                },
            ],
            statusSelected: 2,

            // Search By
            searchByFilterSelected: {
                id: 1,
                description: "Nombre",
                label: "p.name"
            },
            searchByFilters: [
                {
                    id: 1,
                    description: "Nombre",
                    label: "p.name"
                },
                {
                    id: 2,
                    description: "Categoría",
                    label: "c.name"
                },
            ],
            inputFilter: "",
            textPlaceholder: "Ingresá la Descripción",

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
                { key: 'categoryName', label: 'Categoría' },
                { key: 'brandId', label: 'Marca' },
                { key: 'tags', label: 'Etiquetas' },
                { key: 'operations', label: '' },
            ],
            currentPage: 1,
            totalRowsFiltered: 0,
            totalRows: 0,
            pageSize: 15,
            inputFilter: "",
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

    async mounted() {
        //this.getProducts();
        await this.getAllProducts();
    },

    created() {
    },

    methods: {
        // Modal
        showModal(item, index, button) {
            this.$root.$emit('bv::show::modal', this.deleteModal.id, button);
            this.productSelected = item?.id;
        },

        closeTag() {},

        async getProductsFiltered() {
            if (this.validateFields()) {
                this.showOverlay = true;
                this.isBusy = true;

                let resource = "/products";

                let params = {
                    searchBy: this.searchByFilterSelected.label,
                    query: this.inputFilter,
                    status: this.statusSelected,
                }

                await this.axios.get(resource, { params })
                .then(res => {
                    this.products = res?.data;
                    this.totalRowsFiltered = res?.data?.length;

                    if (this.totalRowsFiltered === 0) {
                        this.noResultsFounded = true;
                    } else {
                        this.noResultsFounded = false;
                    }
                })
                .catch(e => {
                    this.showNotification("error", "No fue posible cargar los Productos. Error: " + e);
                })
                .finally(e => {
                    this.showOverlay = false;
                    this.isBusy = false;
                })
            }
        },

        async getAllProducts() {
            this.showOverlay = true;
            this.isBusy = true;

            let resource = "/products";

            await this.axios.get(resource)
            .then(res => {
                this.products = res.data;
                this.totalRows = this.totalRowsFiltered = res.data.length;

                if (this.totalRowsFiltered === 0) {
                        this.noResultsFounded = true;
                    } else {
                        this.noResultsFounded = false;
                    }
            })
            .catch(e => {
                this.showNotification("error", "No fue posible cargar los Productos. Error: " + e);
            })
            .finally(e => {
                this.showOverlay = false;
                this.isBusy = false;
            })
        },

        validateFields() {
            let result = true;
            this.errorInputFilterRequired = false;

            if (this.inputFilter === "") {
                this.errorInputFilterRequired = true;
                result = false;
            }
            
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

    watch: {
        searchByFilterSelected: function(newValue, oldValue) {
            if (newValue !== oldValue) {
                if (this.searchByFilterSelected.id === 1 || this.searchByFilterSelected.id === 2) {
                    this.textPlaceholder = "Ingresá la Descripción";
                }
            }
        },
        currentPage: async function(newValue, oldValue)    
        {
            //await this.getAllProducts();
        }
    }
}
</script>