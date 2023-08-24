<template>
    <div>
        <b-overlay :show="showOverlay" rounded="sm">
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
                    <b-button variant="primary" type="submit" v-on:click="getCategoriesFiltered()">Buscar</b-button>
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
            <div v-if="categories.length > 0">
                <b-table 
                    ref="categoriesTable"
                    class="margin-bottom"
                    :busy.sync="isBusy"
                    :items="categories"
                    :fields="fields"
                    :bordered="true"
                    :table-variant="'warning'"
                    :current-page="currentPage"
                    :per-page="pageSize"
                    responsive="sm">

                    <template #cell(name)="data">
                        <div v-if="data.item.hasChildren">
                            <u>
                                <span class="link" v-on:click="showCategoryDetail(data.item, data.index, $event.target)">{{ data.item.name }}</span>
                            </u>
                        </div>
                        <div v-else>{{ data.item.name }}</div>
                    </template>

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

                <!-- Detail modal -->
                <b-modal 
                    :id="categoryDetailModal.id"
                    :title="categoryDetailModal.title"
                    centered 
                    hide-header-close
                    @ok="removeProduct"
                    header-bg-variant="primary"
                    header-text-variant="light">

                        <div class="row">
                            <div class="col-sm-6">
                                <label id="productName" class="control-label">Nombre</label>
                                <input 
                                    type="text"
                                    class="form-control"
                                    :class="[errorNameRequired ? 'is-invalid' : '']"
                                    placeholder="Ingresá el Nombre"
                                    maxlength="100"
                                    v-model="categorySelected.name">
                                <small v-if="errorNameRequired">Es un campo requerido</small>
                            </div>

                            <div class="col-sm-6">
                                <label id="productName" class="control-label">Padre</label>
                                <input 
                                    type="text"
                                    class="form-control"
                                    :class="[errorParentRequired ? 'is-invalid' : '']"
                                    placeholder="Ingresá el Nombre"
                                    maxlength="100"
                                    v-model="categorySelected.hierarchicalName">
                                <small v-if="errorNameRequired">Es un campo requerido</small>
                        </div>
                        </div>
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
        </b-overlay>
    </div>
</template>

<script>
import ResultsNotFounded from '@/components/Warnings/ResultsNotFounded.vue'
import "@/assets/style.css"

export default {
    components: {
        ResultsNotFounded
    },
    delimiters: ['${', '}'],
    data() {
        return {
            categories: [],
            categoriesChildren: [],
            categorySelected: {},
            isBusy: false,
            showOverlay: false,

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
                label: "c.name"
            },
            searchByFilters: [
                {
                    id: 1,
                    description: "Nombre",
                    label: "c.name"
                },
            ],
            inputFilter: "",
            textPlaceholder: "Ingresá la Descripción",

            // Tags
            appliedFilter: "Nombre",

            // Table
            fields: [
                { key: 'id', label: 'Id' },
                { key: 'name', label: 'Descripción' },
                { key: 'hierarchicalName', label: 'Descripción Jerárquica' },
                { key: 'isActive', label: 'Activo' },
                { key: 'operations', label: '' },
            ],
            currentPage: 1,
            totalRowsFiltered: 0,
            totalRows: 0,
            pageSize: 15,
            inputFilter: "",
            errorInputFilterRequired: false,
            noResultsFounded: false,

            // Delete Modal
            deleteModal: {
                id: 'delete-modal',
                title: 'Eliminar Producto',
                content: '¿Estás seguro que deseas eliminar este elemento?'
            },

            // Category Detail Modal
            categoryDetailModal: {
                id: 'category-detail-modal',
                title: 'Detalle de Categoría',
                content: 'Contenido'
            },
            errorNameRequired: false,
            errorParentRequired: false,
            errorStatusRequired: false,

            statusCode: null,
        }
    },

    async mounted() {
        await this.getAllCategories();
        this.getAllChildrenCategories();
    },

    created() {
    },

    methods: {
        // Delete Modal
        showModal(item, index, button) {
            this.$root.$emit('bv::show::modal', this.deleteModal.id, button);
            this.categorySelected = item?.id;
        },

        // Category Detail Modal
        showCategoryDetail(item, index, button) {
            this.$root.$emit('bv::show::modal', this.categoryDetailModal.id, button);
            console.log(item);
            this.categorySelected = item;
            //this.categoryDetailModal.content = "Categoría Padre: " + item.name;
        },

        closeTag() {},

        async getCategoriesFiltered() {
            if (this.validateFields()) {
                this.showOverlay = true;
                this.isBusy = true;

                let resource = "/categories";

                let params = {
                    searchBy: this.searchByFilterSelected.label,
                    query: this.inputFilter,
                    status: this.statusSelected,
                }

                await this.axios.get(resource, { params })
                .then(res => {
                    this.categories = res?.data;
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

        async getAllCategories() {
            this.showOverlay = true;
            this.isBusy = true;

            let resource = "/categories";

            await this.axios.get(resource)
            .then(res => {
                this.categories = res.data;
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

        getAllChildrenCategories() {
            let categoriesWithChildren = this.categories.filter(c => c.hasChildren);
            let filteredIds = categoriesWithChildren.map(category => category.id);
            this.categoriesChildren = this.categories.filter(category => filteredIds.includes(category.id));
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
            let index  = this.categories.findIndex(i => i.id === this.categorySelected);
            
            if (index !== -1) {
                this.categories.splice(index, 1);
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