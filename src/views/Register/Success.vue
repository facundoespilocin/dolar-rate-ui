<template>
    <div class="p-5">
        <div class="border-shadow container p-3">
            <h2 style="text-align: center">Éxito</h2>

            <div class="row">
                <div class="col-sm-12" style="text-align: center">
                    <b-icon icon="check-circle" class="icon-size-l icon-green margin-bottom" />

                    <p>Tu cuenta se creó correctamente. Te enviamos un correo electrónico de verificación, por favor revisá tu casilla de correo.</p>
                    <p>El envío del correo electrónico puede demorar horas, si no lo ves en tu bandeja de entrada, verificá el correo no deseado.</p>
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

export default {
    data() {
        return { }
    },

    async created() { },

    methods: {
        goBack() {
            window.location.href = "/";
        }
    }
}
</script>