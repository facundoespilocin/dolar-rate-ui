<template>
    <div class="container">
        <h1> Login </h1>

        <form v-on:submit.prevent="login">
            <input type="email" placeholder="Ingresá el Email" class="form-control my-2" v-model="user.email">
            <input type="text" placeholder="Ingresá la Contraseña" class="form-control my-2" v-model="user.password">
            <b-button type="submit"> Log In </b-button>
        </form>

        <div v-if="message !== ''">
            <p>{{ message }}</p>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
    data() {
        return {
            user: { email: "a.b@a.com", password: "abc" },
            message: "",
        }
    },

    created() { },

    methods: {
        ...mapActions(["setUser"]),

        login() {
            this.axios.post("/login", this.user)
            .then(res => {
                const token = res.data.token;
                this.setUser(token);
            })
            .catch(e => {
                console.log(e);
                //this.message = e.response.data.message;
            })
        }
    }
}
</script>