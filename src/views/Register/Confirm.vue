<template>
    <div id="" class="p-5">
        <div class="border-shadow container p-3">
            <h2 style="text-align: center">Confirmación exitosa</h2>

            <div class="row">
                <div class="col-sm-12" style="text-align: center">
                    <b-icon icon="check-circle" class="icon-size-l icon-green margin-bottom" />

                    <p>Tu cuenta se confirmó con éxito. Ya podes <strong><a href="/Login">iniciar sesión</a></strong> y empezar a vender en todo el país.</p>
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

    async created() {
        await this.confirmEmail(new URLSearchParams(window.location.search).get('token'));
    },

    methods: {
        async confirmEmail(token) {
            console.log(token);

            this.axios.post(`/users/confirm-account/${token}`, token)
                .then(res => {
                    console.log(res);
                })
                .catch(e => {
                    //this.showNotification("error", e.response.data.metadata.message);
                })
        }
    }
}
</script>