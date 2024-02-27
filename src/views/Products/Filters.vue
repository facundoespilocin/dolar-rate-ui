<template>
    <div>
        <div class="row">
            <label id="searchedEmail" class="control-label">Fechas de pedidos asignados</label>

            <div class="col-sm-3">
                <div class="col-sm-4">
                    <label id="dateFrom" class="control-label">Desde</label>
                </div>

                <div class="col-sm-8">
                    <datepicker
                        input-class="pointer"
                        v-model="dateFrom"
                        :language="es"
                        :format="dateFormatter"/>
                </div>
            </div>

            <div class="col-sm-3">
                <div class="col-sm-4">
                    <label id="dateTo" class="control-label">Hasta</label>
                </div>

                <div class="col-sm-8">
                    <datepicker
                        v-model="dateTo"
                        :language="es"
                        input-class="pointer"
                        :format="dateFormatter"/>
                </div>
            </div>

            <div class="col-sm-6">
                <label id="cadetState" class="control-label">Estado</label>
                
                <br>
                
                <label class="control-label">Activo</label>
                <input type="radio" class="mx-2" value="true" v-model="stateSelected">
                
                <br>
                
                <label class="control-label">No activo</label>
                <input type="radio" class="mx-2" value="false" v-model="stateSelected">
            </div>
        </div>

        <div class="row my-2">
            <label id="searchedEmail" class="control-label">Buscar como</label>
            <div class="col-2">
                <div class="form-group">
                    <select id="selectTypeSearch"
                        class="form-select"
                        v-model="searchByFilterSelected">
                        <option 
                            v-for="(searchByFilter, index) in searchByFilters"
                            :value="searchByFilter"
                            :key="index">
                                {{ searchByFilter.description }}
                        </option>
                    </select>
                </div>
            </div>
            
            <div class="col-xs-12 col-sm-6">
                <input type="text"
                    :placeholder="textPlaceholder"
                    class="form-control"
                    maxlength="100"
                    v-model="inputFilter">
                    <small v-if="errorInputFilterRequired">Es un campo requerido</small>
            </div>
            <div class="col-xs-12 col-sm-4" style="text-align: left">
                <b-button class="btn-dark" type="submit" v-on:click="getCadets">Buscar</b-button>
            </div>
        </div>

        <div v-if="cadets.length > 0">
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
                :items="cadets"
                :dark="true"
                :fields="fields"
                :bordered="true"
                :hover="true"
                striped
                responsive="sm">
                    <!-- <template #cell(operaciones)="row"> -->
                    <template #cell(operaciones)="data">
                        <b-button size="sm" class="mx-2 btn-warning" v-on:click="editCadet(data.item)">Editar</b-button>
                        <b-button size="sm" class="mr-2 btn-danger">Eliminar</b-button>
                    </template>

                    <!-- A virtual composite column -->
                    <template #cell(cellphone)="data">
                        {{ data.item.cellPhone.areaCod }}{{ data.item.cellPhone.number }}
                    </template>
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
import Datepicker from 'vuejs-datepicker'
import { es } from 'vuejs-datepicker/dist/locale'
import moment from 'moment'

export default {
    components: {
        Datepicker
    },

    data() {
        return {
            // Filters
            // Dates
            dateFrom: new Date(2016, 9, 16),
            dateTo: new Date(2016, 9, 16),

            // States
            stateSelected: true,

            // Search by
            searchByFilterSelected: {
                id: 1,
                description: "Nombre",
                label: "name"
            },
            searchByFilters: [
                {
                    id: 1,
                    description: "Nombre",
                    label: "name"
                },
                {
                    id: 2,
                    description: "Apellido",
                    label: "lastName"
                },
                {
                    id: 3,
                    description: "Email",
                    label: "email"
                },
            ],
            inputFilter: "a@a.com",
            textPlaceholder: "Ingresá el Nombre",

            // Tags
            appliedFilter: "Nombre",
            resultsMessage: "1 de 30 registros encontrados",

            // Table
            fields: [
                { key: 'name', label: 'Nombre' },
                { key: 'lastName', label: 'Apellido' },
                { key: 'email', label: 'Correo electrónico' },
                { key: 'birthday', label: 'Fecha de nacimiento' },
                { key: 'cellphone', label: 'Número de celular' },
                { key: 'active', label: 'Activo' },
                { key: 'operaciones', label: '' },
            ],

            cadets: [],
            cadet: {
                name: "",
                lastName: "",
                email: "",
                birthday: "",
                address: {
                    street: "",
                    number: "",
                    floor: "",
                    department:""
                },
                cellPhone: {
                    areaCode: "",
                    number: "",
                },
                active: true,
            },

            noResultsFounded: false,
            errorInputFilterRequired: false,
            cadetFounded: false,
            isEditing: false,
        }
    },

    created() {
        let date = new Date();
        this.dateFrom = new Date(date.getFullYear(), date.getMonth(), 1);
        this.dateTo = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    },

    methods: {
        closeTag() {
            this.appliedFilter = "";
        },

        dateFormatter(date) {
            return moment(date).format('DD/MM/yyyy');
        },

        validateFields() {
            let result = true;
            this.errorInputFilterRequired = false;

            if (this.inputFilter === "") {
                this.errorInputFilterRequired = true;
                result = false;
            }
            
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

        getCadets() {
            if (this.validateFields()) {
                this.cadets = [];
                this.noResultsFounded = false;
                let resource = "/cadets";
                this.resultsMessage = "";

                let params = {
                    filterSelected: this.searchByFilterSelected.label,
                    filterValue: this.inputFilter,
                    active: this.stateSelected
                };

                this.axios.get(resource, { params })
                .then(res => {
                    if (res.data.length === 0) {
                        this.noResultsFounded = true;
                    } else {
                        this.cadets = res.data;

                        let textS = this.cadets.length > 1 ? 's' : '';
                        this.resultsMessage = (this.cadets.length > 0)
                        ? `${ this.cadets.length } resultado${ textS } encontrado${ textS }` : '';
                    }

                    this.appliedFilter = this.searchByFilterSelected.description;
                })
                .catch(e => {
                    console.log(e);
                    //this.showNotification("error", "No se encontró el Cadete");
                })
            }
        },

        editCadet(cadet) {
            this.setCadet(cadet);
            this.setCadetsOperation("Agregar Cadetes");
        },

        ...mapActions(["setCadetsOperation", "setCadet"]),
    },

    watch: {
        searchByFilterSelected: function(newValue, oldValue) {
            if (newValue !== oldValue) {
                if (this.searchByFilterSelected.id === 1) {
                    this.textPlaceholder = "Ingresá el Nombre";
                }

                if (this.searchByFilterSelected.id === 2) {
                    this.textPlaceholder = "Ingresá el Apellido";
                }

                if (this.searchByFilterSelected.id === 3) {
                    this.textPlaceholder = "Ingresá el Email";
                }
            }
        }    
    }
}
</script>