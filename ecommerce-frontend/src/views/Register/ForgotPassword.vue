<template>
    <div id="contenedorPadre" class="p-5">
        <div id="contenedorHijo">
            <div class="border-shadow p-3">
                <h1>Forgot Password</h1>
                
                <div class="col-sm-12">
                    <label>Email</label>
                    <input type="email" placeholder="Ingresá el Email" class="form-control my-2 " v-model="user.email">
                </div>

                <div class="row">
                    <div class="col-sm-12 pull-right">
                        <b-button class="btn-dark" type="submit" v-on:click="login"><strong>Send</strong></b-button>
                    </div>
                </div>
                
                <div v-if="message !== ''">
                    <p>{{ message }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
    data() {
        return {
            user: { email: "facu.espilocin@hotmail.com" },
            message: "",
        }
    },

    created() { },

    methods: {
        ...mapActions(["setUser"]),

        async login() {
            this.axios.post("/user/forgot-password/", this.user)
            .then(res => {
                //console.log(res.data);
                //const token = res.data.token;
                //this.setUser(token);
                //window.location.href = "/Administracion";
            })
            .catch(e => {
                console.log(e);
                //this.message = e.response.data.message;
            })
        }
    }
}
</script>