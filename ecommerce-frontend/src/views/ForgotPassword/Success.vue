<template>
    <div class="p-5">
        <div class="border-shadow container p-3">
            <h2 style="text-align: center">Éxito</h2>

            <div class="row">
                <div class="col-sm-12" style="text-align: center">
                    <b-icon icon="check-circle" class="icon-size-l icon-green margin-bottom" />

                    <p>{{ successText }}</p>
                    <div v-if="resetPasswordState === 'sended'">
                        aaa si se muestra
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12 pull-right">
                    <b-button class="btn-dark" type="submit" v-on:click="goBack()"><strong>Inicio</strong></b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState } from "vuex"

export default {
    data() {
        return {
            successText: "",
        }
    },

    async created() {
        console.log(this.resetPasswordState);
        if (this.resetPasswordState == "sended") {
            this.successText = "Te enviamos un correo electrónico para continuar con el proceso de reinicio de password , por favor revisá tu casilla de correo. El envío del correo electrónico puede demorar horas, si no lo ves en tu bandeja de entrada, verificá el correo no deseado."
        } else if (this.resetPasswordState == "success") {
            this.successText = "El envío del correo electrónico puede demorar horas, si no lo ves en tu bandeja de entrada, verificá el correo no deseado."
        } else {
            this.successText = "Por favor, contactá con nuestro equipo de soporte."
        }
    },

    methods: {
        goBack() {
            window.location.href = "/";
        }
    },

    computed: {
        ...mapState(["resetPasswordState"])
    }
}
</script>