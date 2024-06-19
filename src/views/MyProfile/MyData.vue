<template>
    <div>
        <div class="border-shadow">
            <form v-on:submit.prevent="" :class="{ 'disabled-form': !isEditingPersonnelData }">
                <div class="row my-2">
                    <!-- Personnel data section -->
                    <h3>Datos personales
                        <b-icon-pencil class="pointer text-color-primary custom-pencil-icon margin-bottom-half" v-on:click="handlePersonnelDataForm()" v-if="!isEditingPersonnelData"/>
                        <b-icon-x-lg class="pointer text-color-primary custom-pencil-icon margin-bottom-half" v-on:click="handlePersonnelDataForm()" v-if="isEditingPersonnelData"/>
                    </h3>

                    <div class="col-sm-4">
                        <label id="name" class="control-label">Nombre</label>

                        <input 
                            type="text"
                            class="form-control"
                            :class="[nameRequired ? 'is-invalid' : '']"
                            placeholder="Ingresá el Nombre"
                            maxlength="100"
                            v-model="customer.name">
                        <small v-if="nameRequired">Es un campo requerido</small>
                    </div>

                    <div class="col-sm-4">
                        <label id="lastName" class="control-label">Apellido</label>

                        <input 
                            type="text"
                            class="form-control"
                            :class="[lastNameRequired ? 'is-invalid' : '']"
                            placeholder="Ingresá el Apellido"
                            v-model="customer.lastName">
                        <small v-if="lastNameRequired">Es un campo requerido</small>
                    </div>

                    <div class="col-sm-4">
                        <label id="gender" class="control-label">Sexo</label>

                        <b-form-select v-model="genderSelected" class="form-control">
                            <b-form-select-option :value="null" disabled>Seleccioná una opción</b-form-select-option>
                            <b-form-select-option v-for="gender in genders" :key="gender.id" :value=gender.id>
                                {{ gender.description }}
                            </b-form-select-option>
                        </b-form-select>
                    </div>
                </div>

                <div class="row my-2">
                    <div class="col-sm-3">
                        <label id="documentType" class="control-label">Tipo de Documento</label>

                        <b-form-select v-model="documentTypeSelected" class="form-control">
                            <b-form-select-option :value="null" disabled>Seleccioná una opción</b-form-select-option>
                            <b-form-select-option v-for="documentType in documentTypes" :key="documentType.id" :value=documentType.id>
                                {{ documentType.description }}
                            </b-form-select-option>
                        </b-form-select>
                    </div>

                    <div class="col-sm-4">
                        <label id="documentNumber" class="control-label">Número de Documento</label>

                        <input 
                            type="text"
                            class="form-control"
                            :class="[documentRequired ? 'is-invalid' : '']"
                            placeholder="Ingresá el Nro. de Documento"
                            maxlength="15"
                            v-model="customer.documentNumber">
                        <small v-if="documentRequired">Es un campo requerido</small>
                    </div>
                </div>
            </form>

            <form v-on:submit.prevent="" :class="{ 'disabled-form': !isEditingContactData }">
                <!-- Contact data section -->
                <div class="row my-2 mt-2">
                    <h3>Datos de contacto
                        <b-icon-pencil class="pointer text-color-primary custom-pencil-icon margin-bottom-half" v-on:click="handleContactDataForm()" v-if="!isEditingContactData"/>
                        <b-icon-x-lg class="pointer text-color-primary custom-pencil-icon margin-bottom-half" v-on:click="handleContactDataForm()" v-if="isEditingContactData"/>
                    </h3>

                    <div class="col-sm-6">
                        <label id="documentNumber" class="control-label">Email</label>

                        <input 
                            type="text"
                            class="form-control"
                            :class="{
                                'is-invalid': emailRequired,
                                'input-with-icon-valid': isEmailValid,
                                'input-with-icon-invalid': !isEmailValid && !emailRequired
                            }"
                            placeholder="Ingresá el Email"
                            maxlength="30"
                            v-model="customer.email">
                        <small v-if="emailRequired">Es un campo requerido</small>
                    </div>

                    <div class="col-sm-6">
                        <label id="documentNumber" class="control-label">Celular</label>

                        <input 
                            type="text"
                            class="form-control"
                            :class="[phoneRequired ? 'is-invalid' : '']"
                            placeholder="Ingresá el Nro. de Celular"
                            maxlength="30"
                            v-model="customer.phone">
                        <small v-if="phoneRequired">Es un campo requerido</small>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import "@/assets/style.css"
import { mapGetters, mapActions } from "vuex"
import { DOCUMENT_TYPES, GENDER_TYPES } from '@/enums/enums';

export default {
    name: "MyData",

    data() {
        return {
            isEditingPersonnelData: false,
            isEditingContactData: false,
            isEmailValid: false,

            orders : null,
            genders: GENDER_TYPES,
            genderSelected: null,
            documentTypes: DOCUMENT_TYPES,
            documentTypeSelected: null,

            nameRequired: false,
            lastNameRequired: false,
            documentRequired: false,
            emailRequired: false,
            phoneRequired: false,
        }
    },

    async created() { 
        this.documentTypeSelected = this.customer.documentTypeId;
        this.genderSelected = this.customer.genderId;
        this.isEmailValid = true;
    },

    methods: {
        ellipsis(name) {
            return name.length > 29 ? name.substring(0, 29) + "..." : name
        },

        handlePersonnelDataForm() {
            this.isEditingPersonnelData = !this.isEditingPersonnelData;
        },

        handleContactDataForm() {
            this.isEditingContactData = !this.isEditingContactData;
        },

        async getGender(genderId) {
            return "Masculino";
        },

        getOrderId(orderId) {
            return "Orden #" + orderId;
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

    computed: { 
        ...mapGetters(['getCustomerData']),

        customer() {
            return this.getCustomerData;
        },
    },

    watch: { 
        // dueDate(newVal) {
        //     if (newVal.length === 2 && newVal.charAt(1) !== '/') {
        //         this.dueDate = newVal + '/';
        //     }
        // }
    }
}
</script>