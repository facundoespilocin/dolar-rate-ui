<template>
    <div class="card p-2">        
        <p>
            Quiero agradecerles por usar la plataforma y ser parte de esta comunidad. Sé muy bien que su experiencia es fundamental y siempre estoy buscando formas de mejorar el producto.
        </p>

        <p>
            ¡Tu ayuda es clave! Si encontrás algún bug o problema mientras usas la plataforma, te invito a reportarlo. No sólo vas a ayudarme a mejorar, sino que también vas a contribuir a crear una mejor experiencia para todos.
        </p>
        
        <p>
            Recompensas en el futuro: Quiero reconocer y agradecer tu valiosa contribución. Planeo recompensar a todos aquellos que me ayuden reportando bugs. ¡Atento a las próximas novedades!
        </p>

        <p>
            Para reportar un bug, simplemente llena el formulario en nuestra página o envíanos un correo a dolarinformation@gmail.com. Cada reporte cuenta y nos acerca un paso más hacia la excelencia.
        </p>
        
        <p>
            Gracias por tu apoyo y colaboración!
        </p>

        <label>Facundo Espilocin</label>
        
        <hr>

        <h3 class="mb-2">Ingresá los datos del Bug</h3>

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
                    <label id="emailFrom" class="control-label">Email</label>
                    <div class="d-flex align-items-center">
                        <input type="text"
                            placeholder="Ingresa tu correo electrónico"
                            class="form-control"
                            :class="[errorEmailFromRequired ? 'is-invalid' : '']"
                            maxlength="100"
                            v-model="bugReport.emailFrom">
                        <b-icon id="infoIcon" class="color-yellow margin-left" icon="exclamation-circle"/>
                    </div>
                    <small v-if="errorEmailFromRequired" class="text-danger">Es un campo requerido</small>
                </div>
            </div>

            <div class="row my-2">
                <div class="">
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
                <button class="btn-primary" type="submit" v-on:click="postSendBugReport()">Enviar</button>
            </div>

            <b-tooltip 
                target="infoIcon"
                triggers="hover">
                Por favor, es importante que ingreses un correo electrónico valido
            </b-tooltip>
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
            errorEmailFromRequired: false,

            bugReport: {
                name: "",
                description: "",
                emailFrom: ""
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
            
            if (this.bugReport.name === null || this.bugReport.name == '') {
                this.errorNameRequired = true;
                result = false;
            } else {
                this.errorNameRequired = false;
            }

            if (this.bugReport.emailFrom === null || this.bugReport.emailFrom == '') {
                this.errorEmailFromRequired = true;
                result = false;
            } else {
                this.errorEmailFromRequired = false;
            }

            if (this.bugReport.description === null || this.bugReport.description == '') {
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