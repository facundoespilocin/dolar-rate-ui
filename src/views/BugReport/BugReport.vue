<template>
    <div>
        <h3 class="my-3">Ingresá los datos del Bug</h3>

        <form v-on:submit.prevent="">
            <div class="row my-2">
                <div class="col-sm-6">
                    <label id="userName" class="control-label">Nombre</label>
                    <input 
                        type="text"
                        class="form-control"
                        :class="[errorNameRequired ? 'is-invalid' : '']"
                        placeholder="Ingresá tu Nombre"
                        maxlength="100"
                        v-model="bugReport.name">
                    <small v-if="errorNameRequired">Es un campo requerido</small>
                </div>
            </div>

            <div class="row my-2">
                <div class="col-sm-6">
                    <label id="bugDescription" class="control-label">Descripción</label>
                    <b-form-textarea
                        id="bugDescription"
                        :class="[errorDescriptionRequired ? 'is-invalid' : '']"
                        placeholder="Ingresá la Descripción"
                        v-model="bugReport.description"
                        rows="8">
                    </b-form-textarea>
                    <small v-if="errorDescriptionRequired">Es un campo requerido</small>
                </div>
            </div>

            <div class="pull-right">
                <b-button variant="primary" type="submit" v-on:click="postSendBugReport()">Guardar</b-button>
            </div>
        </form>
    </div>
</template>

<script>
import "@/assets/style.css"
import API_ROUTES from '@/api/routes';

export default {
    data() {
        return {
            errorNameRequired: false,
            errorDescriptionRequired: false,

            bugReport: {
                name: "Usuario 001",
                description: "Esta es la Descripcion larga de un bug.",
            },
        }
    },

    async created() { 
    },

    methods: {
        async postSendBugReport() {
            let validateForm = this.validateFields();
                
            if (validateForm) {
                let body = {
                    bugReport: this.bugReport
                }
                
                await this.$axios.post(API_ROUTES.POST_BUG_REPORT, body)
                .then(res => {
                    this.showNotification("success", "Se envió correctamente el Bug. Muchas gracias por tu colaboración.");
                })
                .catch(e => {                    
                    // if (e.response.data.error.errors.name.message) {
                    //     this.message.text = e.response.data.error.errors.name.message;
                    // } else {
                    //     this.message.text = "No se ingresó la Nota"
                    // }
                })
                .finally(e => { })
            }
        },

        validateFields() {
            let result = true;
            
            if (this.bugReport.name === null) {
                this.errorNameRequired = true;
                result = false;
            } else {
                this.errorNameRequired = false;
            }

            if (this.bugReport.description === null) {
                this.errorDescriptionRequired = true;
                result = false;
            } else {
                this.errorDescriptionRequired = false;
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
    },
    
    watch: { },
    computed: { }
}
</script>