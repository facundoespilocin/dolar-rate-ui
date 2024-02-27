<template>
    <div>
        <h3>Buscá el Cadete</h3>
        
        <div class="row">
            <div>
                <label id="searchedEmail" class="control-label">Email</label>
            </div>
        
            <div class="col-xs-12 col-sm-6">
                <input type="email" placeholder="Ingresá el Email" class="form-control" v-model="searchedEmail">
            </div>
            <div class="col-xs-12 col-sm-6" style="text-align: left">
                <b-button class="btn-dark" type="submit" v-on:click="getCadet">Buscar</b-button>
            </div>
        </div>

        <hr>

        <h3 class="my-3">Ingresá los datos del Cadete</h3>

        <h4>Datos personales</h4>

        <form v-on:submit.prevent="addCadet()" v-if="!isEditing">
            <div class="row my-2">
                <div class="col-sm-6">
                    <label id="cadetName" class="control-label">Nombre</label>
                    <input 
                        type="text"
                        class="form-control"
                        :class="[errorNameRequired && cadet.name === '' ? 'is-invalid' : '']"
                        placeholder="Ingresá el Nombre"
                        maxlength="100"
                        :disabled="cadetFounded"
                        v-model="cadet.name">
                    <small v-if="errorNameRequired && cadet.name === ''">Es un campo requerido</small>
                </div>

                <div class="col-sm-6">
                    <label id="cadetLastName" class="control-label">Apellido</label>
                    <input 
                        type="text"
                        class="form-control"
                        :class="[errorLastNameRequired && cadet.lastName === '' ? 'is-invalid' : '']"
                        placeholder="Ingresá el Apellido"
                        maxlength="100"
                        :disabled="cadetFounded"
                        v-model="cadet.lastName">
                    <small v-if="errorLastNameRequired && cadet.lastName === ''">Es un campo requerido</small>
                </div>
            </div>

            <div class="row my-3">
                <div class="col-sm-6">
                    <label id="cadetEmail" class="control-label">Email</label>
                    <input 
                        type="email"
                        placeholder="Ingresá el Email"
                        class="form-control"
                        :class="[errorEmailRequired && cadet.email === '' ? 'is-invalid' : '']"
                        maxlength="100"
                        :disabled="cadetFounded"
                        v-model="cadet.email">
                    <small v-if="errorEmailRequired && cadet.email === ''">Es un campo requerido</small>
                </div>

                <div class="col-sm-6">
                    <label id="cadetBirthday" class="control-label">Fecha de Nacimiento</label>
                    <input
                        type="text"
                        placeholder="Ingresá la Fecha de Nacimiento"
                        class="form-control"
                        :disabled="cadetFounded"
                        v-model="cadet.birthday">
                </div>
            </div>

            <hr>

            <div class="row">
                <h4>Dirección</h4>
                
                <div class="col-sm-4">
                    <label id="cadetAddress" class="control-label">Calle</label>
                    <input
                        type="text"
                        placeholder="Ingresá la Calle"
                        class="form-control"
                        maxlength="100"
                        :disabled="cadetFounded"
                        v-model="cadet.address.street">
                </div>

                <div class="col-sm-2">
                    <label id="cadetAddress" class="control-label">Número</label>
                    <input
                        type="text"
                        placeholder="Ingresá el Número"
                        class="form-control"
                        maxlength="100"
                        :disabled="cadetFounded"
                        v-model="cadet.address.number">
                </div>

                <div class="col-sm-2">
                    <label id="cadetAddress" class="control-label">Piso</label>
                    <input
                        type="text"
                        placeholder="Ingresá el Piso"
                        class="form-control"
                        maxlength="100"
                        :disabled="cadetFounded"
                        v-model="cadet.address.floor">
                </div>

                <div class="col-sm-2">
                    <label id="cadetAddress" class="control-label">Departamento</label>
                    <input
                        type="text"
                        placeholder="Ingresá el Depto."
                        class="form-control"
                        maxlength="100"
                        :disabled="cadetFounded"
                        v-model="cadet.address.department">
                </div>
            </div>

            <hr>

            <div class="row my-2">
                <h4>Número de Celular</h4>

                <div class="col-sm-2">
                    <label id="cadetAreaCode" class="control-label">Código de Área</label>
                    <input
                        type="text"
                        placeholder="11"
                        class="form-control"
                        :class="[errorCellPhoneRequired && cadet.cellPhone.areaCode === '' ? 'is-invalid' : '']"
                        maxlength="100"
                        :disabled="cadetFounded"
                        v-model="cadet.cellPhone.areaCode">
                    <small class="my-2" v-if="errorCellPhoneRequired && cadet.cellPhone.areaCode === ''">Es un campo requerido</small>
                </div>

                <div class="col-sm-4">
                    <label id="cadetNumberCellPhone" class="control-label">Número de Celular</label>
                    <div class="input-group">
                        <div class="col-xs-1 mx-2 my-2">15</div>
                        <div class="col-xs-2">
                            <input
                                type="text"
                                placeholder="Ingresá el Nro. de Celular"
                                class="form-control"
                                :class="[errorCellPhoneRequired && cadet.cellPhone.number === '' ? 'is-invalid' : '']"
                                maxlength="100"
                                :disabled="cadetFounded"
                                v-model="cadet.cellPhone.number">
                            <small class="my-2" v-if="errorCellPhoneRequired && cadet.cellPhone.number === ''">Es un campo requerido</small>
                        </div>
                    </div>
                </div>
            </div>

            <div class="pull-right">
                <b-button class="btn-dark" type="submit">Agregar</b-button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState } from "vuex"
import "@/assets/style.css"

export default {
    data() {
        return {
            errorNameRequired: false,
            errorLastNameRequired: false,
            errorEmailRequired: false,
            errorCellPhoneRequired: false,
            isReadCadets: false,
            searchedEmail: "a@a.com",

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

            cadetFounded: false,
            selectedNote: {},
            isEditing: false,
        }
    },

    created() { 
        if (this.editableCadet !== "") {
            this.searchedEmail = this.editableCadet.email;
            this.getCadet();
        }
    },

    methods: {
        addCadet() {
            // let config = {
            //     headers: {
            //         Authorization: this.token
            //     }
            // }

            //this.axios.post("/cadets", this.cadet, config)

            let validateForm = this.validateFields();
            
            if (validateForm) {
                this.axios.post("/cadets", this.cadet)
                .then(res => {
                    this.cadet = {
                        name: "",
                        lastName: "",
                        email: "",
                        birthday: "",
                        address: {
                            street: "",
                            number: "",
                            floor: "",
                            department: ""
                        },
                        cellPhone: {
                            areaCode: "",
                            number: ""
                        },
                        active: true,
                    }
                    
                    this.showNotification("success", "Se ingresó correctamente el Cadete");
                })
                .catch(e => {                    
                    this.cadet = {
                        name: "",
                        lastName: "",
                        email: "",
                        birthday: "",
                        address: {
                            street: "",
                            number: "",
                            floor: "",
                            department: ""
                        },
                        cellPhone: {
                            areaCode: "",
                            number: ""
                        },
                        active: true,
                    }

                    // if (e.response.data.error.errors.name.message) {
                    //     this.message.text = e.response.data.error.errors.name.message;
                    // } else {
                    //     this.message.text = "No se ingresó la Nota"
                    // }
                })
            }
        },

        validateFields() {
            let result = true;
            
            if (this.cadet.name === "") {
                this.errorNameRequired = true;
                result = false;
            }

            if (this.cadet.lastName === "") {
                this.errorLastNameRequired = true;
                result = false;
            }
            
            if (this.cadet.email === "") {
                this.errorEmailRequired = true;
                result = false;
            }
            
            if (this.cadet.cellPhone.areaCode === "" || this.cadet.cellPhone.number === "") {
                this.errorCellPhoneRequired = true;
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

        getCadet() {
            this.cadetFounded = false;
            let resource = "/cadets";

            let params = {
                    filterSelected: "email",
                    filterValue: this.searchedEmail,
                };

            this.axios.get(resource, { params })
            .then(res => {
                this.cadet = res.data;
                this.cadetFounded = true;
            })
            .catch(e => {
                console.log("error: " + e);
                this.cadet = {
                    name: "",
                    lastName: "",
                    email: "",
                    birthday: "",
                    address: {
                        street: "",
                        number: "",
                        floor: "",
                        department: ""
                    },
                    cellPhone: {
                        areaCode: "",
                        number: ""
                    },
                    active: true,
                }

                this.showNotification("error", "No se encontró el Cadete");
            })
        },
    },
    computed: {
        ...mapState(["editableCadet"])
    }
}
</script>