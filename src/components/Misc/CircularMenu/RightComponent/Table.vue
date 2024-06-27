<template>
    <div>
        <b-overlay :show="showOverlay" rounded="sm">
            <!-- <div class="row my-2">
                <label id="searchedEntity" class="control-label">Buscar como</label>

                <div class="col-sm-2 mb-2">
                    <div class="form-group">
                        <select id="selectTypeSearch" class="form-select" v-model="searchByFilterSelected">

                            <option 
                                v-for="(searchByFilter, index) in searchByFilters" :value="searchByFilter" :key="index">
                                    {{ searchByFilter.description }}
                            </option>
                        </select>
                    </div>
                </div>
                
                <div class="col-sm-5 mb-1">
                    <input type="text"
                        :placeholder="textPlaceholder"
                        :class="[errorInputFilterRequired ? 'form-control is-invalid' : 'form-control']"
                        maxlength="100"
                        v-model="inputFilter">

                    <small v-if="errorInputFilterRequired">Es un campo requerido</small>
                </div>

                <div 
                    class="col-sm-5"
                    :class="screenWidth > 768 ? '' : 'pull-right'">
                    <button class="btn-primary mt-1" type="submit" v-on:click="getYearOnYearInflationIndexesFiltered()">Buscar</button>
                </div>
            </div>

            <hr> -->

            <div class="row mt-2">
                <p class="mb-1"><em>Mostrando {{ currentItemsCount }} de {{ totalRows }} registros encontrados</em></p>
            </div>

            <!-- Table -->
            <div v-if="yearOnYearInflationIndexes?.data?.length > 0">
                <b-table 
                    ref="yearOnYearInflationIndexesTable"
                    class="margin-bottom"
                    striped
                    :busy.sync="isBusy"
                    :items="yearOnYearInflationIndexes.data"
                    :fields="fields"
                    :bordered="true"
                    :current-page="currentPage"
                    :per-page="pageSize"
                    responsive="sm">

                    <template #cell(value)="data">
                        {{ data.item.value }}<span>%</span>
                    </template> 
                </b-table>

                <b-pagination
                    pills 
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="pageSize"
                    align="center"
                    size="sm">
                </b-pagination>
            </div>

            <!-- <ResultsNotFounded v-if="noResultsFounded"></ResultsNotFounded> -->
        </b-overlay>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import yearOnYearInflationIndexesMock from "@/assets/mocks/yearOnYearInflationIndexesMock.json";
//import ResultsNotFounded from '@/components/Warnings/ResultsNotFounded.vue'
import "@/assets/style.css"
import API_ROUTES from "@/api/routes";

export default {
    components: {
        //ResultsNotFounded
    },
    delimiters: ['${', '}'],
    data() {
        return {
            screenWidth: window.innerWidth,
            yearOnYearInflationIndexes: [],
            //customerSelected: null,
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
                }
            ],
            inputFilter: "",
            textPlaceholder: "Ingresá la Descripción",

            // Tags
            appliedFilter: "Nombre",

            // Table
            fields: [
                { key: 'date', label: 'Fecha',  },
                { key: 'value', label: 'Índice',  },
                //{ key: 'operations', label: '' },
            ],
            currentPage: 1,
            currentItemsCount: 0,
            totalRowsFiltered: 0,
            totalRows: 0,
            pageSize: 5,
            inputFilter: "",
            errorInputFilterRequired: false,
            noResultsFounded: false,

            statusCode: null,
        }
    },

    async mounted() {
        //await this.getYearOnYearInflationIndexes();
        
        // Mock
        this.yearOnYearInflationIndexes = yearOnYearInflationIndexesMock;
        
        this.yearOnYearInflationIndexes.data.sort((a, b) => {
            // Convertir las fechas a objetos Date para compararlas
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            
            // Comparar las fechas
            if (dateA > dateB) return -1;
            if (dateA < dateB) return 1;
            return 0;
        });

        this.yearOnYearInflationIndexes.data = this.yearOnYearInflationIndexes.data?.filter(item => item.value !== 0);

        this.totalRows = yearOnYearInflationIndexesMock.data.length;

        await this.updateCurrentItemsCount();
    },

    created() {
        this.updateScreenWidth();
        window.addEventListener('resize', this.updateScreenWidth);
    },

    destroyed() {
        window.removeEventListener('resize', this.updateScreenWidth);
    },

    methods: {
        updateScreenWidth() {
            this.screenWidth = window.innerWidth;
        },
        
        async updateCurrentItemsCount(items) {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            this.currentItemsCount = this.yearOnYearInflationIndexes.data.slice(start, end).length;
        },
        
        closeTag() {},

        async getYearOnYearInflationIndexesFiltered() {
            // Filtrar por el texto ingresado en inputFilter y actualizar yearOnYearInflationIndexes filtrado
            const filteredRates = this.yearOnYearInflationIndexes.data.filter(rate => {
                return rate.entity.toLowerCase().includes(this.inputFilter.toLowerCase());
            });

            // Asignar los datos filtrados de nuevo a yearOnYearInflationIndexes
            this.yearOnYearInflationIndexes.data = filteredRates;
        },

        async getYearOnYearInflationIndexes() {
            this.showOverlay = true;
            this.isBusy = true;

            await this.$axios.get(API_ROUTES.GET_INFLATION_INDEXES)
            .then(res => {
                this.yearOnYearInflationIndexes = res.data;
                this.totalRows = res.data.data.length;
                
                if (this.totalRowsFiltered === 0) {
                    this.noResultsFounded = true;
                } else {
                    this.noResultsFounded = false;
                }
            })
            .catch(e => {
                this.showNotification("error", "No fue posible cargar los datos. Error: " + e);
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

        currentPage() {
            this.updateCurrentItemsCount();
        },

        'yearOnYearInflationIndexes.data'() {
            this.updateCurrentItemsCount();
        }
    }
}
</script>