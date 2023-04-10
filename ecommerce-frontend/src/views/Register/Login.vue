<template>
    <div id="contenedorPadre" class="p-5">
        <div id="contenedorHijo">
            <div class="border-shadow p-3">
                <h1>Login</h1>
                
                <div class="col-sm-12">
                    <label>Email</label>
                    <input type="email" placeholder="Ingresá el Email" class="form-control my-2 " v-model="user.userName">
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <label>Password</label>
                        <input type="password" placeholder="Ingresá la Contraseña" class="form-control my-2" v-model="user.password">
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-sm-12 pull-right">
                        <a class="mx-3" href="/ForgotPassword"><strong>Forgot password?</strong></a>
                        
                        <b-button class="btn-dark mx-3" href="/Register"><strong>Register</strong></b-button>
                        <b-button class="btn-dark" type="submit" v-on:click="login"><strong>Sign In</strong></b-button>
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
            user: { userName: "facu.espilocin@hotmail.com", password: "123456" },
            message: "",
        }
    },

    created() { },

    methods: {
        ...mapActions(["setUser"]),

        async login() {
            this.axios.post("/user/authenticate/", this.user)
            .then(res => {
                console.log(res.data);
                const token = res.data.token;
                this.setUser(token);
                window.location.href = "/Administracion";
            })
            .catch(e => {
                console.log(e);
                //this.message = e.response.data.message;
            })
        }
    }
}
</script>