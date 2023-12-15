<template>
    <div id="" class="p-5">
        <div id="">
            <div class="border-shadow p-3 container">
                <h2 style="text-align: center">Registración</h2>

                <hr>

                <div class="row">
                    <div class="col-sm-6">
                        <h3><strong>Crea tu cuenta gratis</strong></h3>

                        <p>Empezá a vender tus productos en todo el país y gestioná tu negocio de manera online</p>

                        <ul>
                            <li>Aumentar el número de tus ventas</li>
                            <li>Conocer el ciclo de vida de tus métricas</li>
                            <li>Extender y conocer el alcance de tu marca</li>
                            <li>Descubrir desde dónde te están comprando</li>
                            <li>Conocer el comportamiento de tu público</li>
                        </ul>
                    </div>
                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-sm-6">
                                <label>Nombre</label>

                                <input type="text"
                                       :class="[errorNameRequired ? 'is-invalid' : '', 'form-control input-border-shadow']"
                                       minlength="6"
                                       maxlength="30"
                                       placeholder="Ingresá el Nombre"
                                       v-model="user.name">

                                <small class="margin-bottom" v-if="errorNameRequired">Es un campo requerido</small>
                            </div>
                            
                            <div class="col-sm-6">
                                <label>Apellido</label>

                                <input type="text"
                                       :class="[errorLastNameRequired ? 'is-invalid' : '', 'form-control input-border-shadow']"
                                       maxlength="30"
                                       placeholder="Ingresá el Apellido"
                                       v-model="user.lastName">
                                       
                                <small class="margin-bottom" v-if="errorLastNameRequired">Es un campo requerido</small>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <label>Número de celular</label>

                                <input type="text"
                                       :class="[errorCellPhoneRequired ? 'is-invalid' : '', 'form-control input-border-shadow']"
                                       maxlength="15" 
                                       placeholder="+549"
                                       v-model="user.cellPhone">

                                <small class="margin-bottom" v-if="errorCellPhoneRequired">Es un campo requerido</small>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <label>Fecha de nacimiento</label>
                            </div>
                            <div class="col-sm-12">
                                <input type="date"
                                       :class="[errorBirthDateRequired ? 'is-invalid' : '', 'col-sm-6 input-border-shadow']"
                                       placeholder="Ingresá la Fecha de nacimiento" 
                                       v-model="user.birthDate">

                                <!-- <small class="margin-bottom" v-if="errorCellPhoneRequired">Es un campo requerido</small> -->
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <label>País</label>
                            </div>

                            <div class="col-sm-12">
                                <select v-model="countrySelected" :class="[errorCountryIdRequired ? 'is-invalid' : '', 'col-sm-6 p-1 input-border-shadow']">
                                    <option v-for="country in countries" :value="country.id" :key="country.id">
                                        {{ country.name }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <label>Industria</label>
                            </div>

                            <div class="col-sm-12">
                                <select v-model="industrySelected" :class="[errorIndustryIdRequired ? 'is-invalid' : '', 'col-sm-6 p-1 input-border-shadow']">
                                    <option v-for="industry in industries" :value="industry.id" :key="industry.id">
                                        {{ industry.name }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <label>Email</label>
                            </div>

                            <div class="col-sm-11">
                                <input type="email"
                                       :class="[errorEmailRequired ? 'is-invalid' : '', 'form-control input-border-shadow']"
                                       maxlength="30"
                                       placeholder="Ingresá el Email"
                                       v-model="user.email"
                                       title="Online!">
                                
                                <small class="margin-bottom" v-if="errorEmailRequired">Es un campo requerido</small>
                            </div>
                            
                            <div class="col-sm-1 py-2">
                                <b-icon id="email-tooltip" icon="info-circle" class="icon-size-s icon-blue margin-bottom" />
                            </div>
                            
                            <b-tooltip target="email-tooltip" title="Online!">Ingresá un correo electrónico válido debido a que te va a llegar un correo de verificación</b-tooltip>
                        </div>

                        <div class="row margin-bottom">
                            <div class="col-sm-12">
                                <label>Contraseña</label>

                                <input type="password"
                                       :class="[errorPasswordRequired ? 'is-invalid' : '', 'form-control input-border-shadow']"
                                       maxlength="16"
                                       placeholder="Ingresá la Contraseña"
                                       v-model="user.password">

                                <small class="margin-bottom" v-if="errorPasswordRequired">Es un campo requerido</small>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-sm-12 pull-right">
                                <a class="mx-3" href="/Login"><strong>Tengo una cuenta</strong></a>

                                <b-button class="btn-dark" type="submit" v-on:click="register"><strong>Registrar</strong></b-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex"
import Datepicker from 'vuejs-datepicker'
import { es } from 'vuejs-datepicker/dist/locale'
import moment from 'moment'

export default {
    components: {
        Datepicker
    },

    data() {
        return {
            es: es,
            user: {
                name: "Facundo",
                lastName: "Espilocin", 
                cellPhone: "+541124644402", 
                birthDate: new Date(1994, 5, 15),
                countryId: 0, 
                industryId: 0,
                email: "facu.espilocin@hotmail.com", 
                password: "123456"
            },
            // user: {
            //     name: "",
            //     lastName: "", 
            //     cellPhone: "", 
            //     birthDate: new Date(2023, 3, 11),
            //     countryId: 0, 
            //     industryId: 0,
            //     email: "", 
            //     password: ""
            // },
            countries: [],
            industries: [],
            countrySelected: {},
            industrySelected: {},
            errorNameRequired: false,
            errorLastNameRequired: false,
            errorCellPhoneRequired: false,
            errorBirthDateRequired: false,
            errorCountryIdRequired: false,
            errorIndustryIdRequired: false,
            errorEmailRequired: false,
            errorPasswordRequired: false,
        }
    },

    async created() { 
        await this.getCountries();
        await this.getIndustries();
    },

    methods: {
        ...mapActions(["setUser"]),

        async register() {
            //console.log(this.user);
            let isValid = this.validateFields();

            if (isValid) {
                this.axios.post("/users", this.user)
                .then(res => {
                    //console.log(res.data);
                    window.location.href = "/Register/Success";
                })
                .catch(e => {
                    this.showNotification("error", e.response.data.metadata.message);
                })
            }
        },

        async getCountries() {
            this.axios.get("/misc/countries")
            .then(res => {
                this.countries = res.data;
                this.countrySelected = this.countries[0].id;
            })
            .catch(e => {
                console.log(e);
            })
        },

        async getIndustries() {
            this.axios.get("/misc/industries")
            .then(res => {
                this.industries = res.data;
                this.industrySelected = this.industries[0].id;
            })
            .catch(e => {
                console.log(e);
            })
        },

        dateFormatter(date) {
            return moment(date).format('DD/MM/yyyy');
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

        validateFields() {
            let result = true;
            
            if (this.user.name === "") {
                this.errorNameRequired = true;
                result = false;
            }
            
            if (this.user.lastName === "") {
                this.errorLastNameRequired = true;
                result = false;
            }
            
            if (this.user.email === "") {
                this.errorEmailRequired = true;
                result = false;
            }
            
            if (this.user.cellPhone === "") {
                this.errorCellPhoneRequired = true;
                result = false;
            }

            if (this.user.birthDate === "") {
                this.errorBirthDateRequired = true;
                result = false;
            }

            if (this.user.countryId === 0) {
                this.errorCountryIdRequired = true;
                result = false;
            }

            if (this.user.email === "") {
                this.errorEmailRequired = true;
                result = false;
            }

            if (this.user.password === "") {
                this.errorPasswordRequired = true;
                result = false;
            }
            
            return result
        },
    },

    watch: {
        "countrySelected": function(newValue)
        {
            this.user.countryId = newValue;
            //console.log(newValue + ' asd');
        },

        "industrySelected": function(newValue)
        {
            this.user.industryId = newValue;
        },

        "user.name": function() {
            this.user.name === "" ? this.errorNameRequired = true : this.errorNameRequired = false;
            console.log(this.user.name);
        },

        "user.lastName": function() {
            this.user.lastName === "" ? this.errorLastNameRequired = true : this.errorLastNameRequired = false;
            console.log(this.user.lastName);
        },

        "user.cellPhone": function() {
            this.user.cellPhone === "" ? this.errorCellPhoneRequired = true : this.errorCellPhoneRequired = false;
        },

        "user.birthDate": function() {
            this.user.birthDate === "" ? this.errorBirthDateRequired = true : this.errorBirthDateRequired = false;
        },

        "user.countryId": function() {
            this.user.countryId === "" ? this.errorCountryIdRequired = true : this.errorCountryIdRequired = false;
        },

        "user.industryId": function() {
            this.user.industryId === "" ? this.errorIndustryIdRequired = true : this.errorIndustryIdRequired = false;
        },

        "user.email": function() {
            this.user.email === "" ? this.errorEmailRequired = true : this.errorEmailRequired = false;
        },

        "user.password": function() {
            this.user.password === "" ? this.errorPasswordRequired = true : this.errorPasswordRequired = false;
        }
    },
}
</script>