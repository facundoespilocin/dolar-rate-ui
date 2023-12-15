<template>
    <div class="p-5">
        <div class="border-shadow p-3 container col-sm-5">
            <h2 style="text-align: center">Iniciar sesión</h2>
            
            <hr>

            <div class="row">
                <div class="col-sm-3"></div>

                <div class="col-sm-6">
                    <label>Email</label>
                    <input type="email" placeholder="Ingresá el Email" class="form-control my-2" v-model="user.userName">
                </div>
            </div>

            <div class="row margin-bottom">
                <div class="col-sm-3"></div>

                <div class="col-sm-6">
                    <label>Password</label>
                    <input type="password" placeholder="Ingresá la Contraseña" class="form-control my-2" v-model="user.password">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-6 pull-left my-2">
                    <a href="/ForgotPassword"><strong>Olvidaste tu contraseña?</strong></a>
                </div>
                
                <div class="col-sm-6 pull-right">
                    <b-button class="btn-dark mx-2" href="/Register"><strong>Registrar</strong></b-button>
                    <b-button class="btn-dark" type="submit" v-on:click="login"><strong>Iniciar sesión</strong></b-button>
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
            user: { userName: "facu.espilocin@hotmail.com", password: "123456" },
            message: "",
        }
    },

    created() { 
    },

    methods: {
        ...mapActions(["setJWTToken", "setUserData", "setResetPasswordState"]),

        async login() {
            this.axios.post("/auth/authenticate/", this.user)
            .then(res => {
                console.log(res.data);
                this.setJWTToken(res.data.token);
                //this.setUserData(res.data.userData);
                // window.location.href = "/";
            })
            .catch(e => {
                console.log(e);
                //this.message = e.response.data.message;
            })
        }
    }
}
</script>