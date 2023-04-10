<template>
    <div id="" class="p-5">
        <div id="">
            <div class="border-shadow p-3 container">
                <h1>Register</h1>
                <div class="row">
                    <div class="col-sm-6">
                        <h3><strong>Crea tu cuenta gratis</strong></h3>
                        <p>Empezá a vender tus productos en todo el país y gestioná tu negocio de manera online</p>

                        <ul>
                            <li>Aumentar el número de tus ventas</li>
                            <li>Conocer el ciclo de vida de tus métricas</li>
                            <li>Extender y conocer el alcance de tu marca</li>
                            <li>Descubrir desde dónde te están comprando</li>
                            <li>Conocer el comportamiento de tu público</li>
                        </ul>
                    </div>
                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-sm-6">
                                <label>Nombre</label>
                                <input type="text" placeholder="Ingresá el Nombre" class="form-control my-2 " v-model="user.name">
                            </div>
                            
                            <div class="col-sm-6">
                                <label>Apellido</label>
                                <input type="email" placeholder="Ingresá el Apellido" class="form-control my-2 " v-model="user.lastName">
                            </div>
                        </div>

                        <div class="col-sm-12">
                            <label>Número de celular</label>
                            <input type="text" placeholder="+549" class="form-control my-2 " v-model="user.cellphone">
                        </div>

                        <div class="col-sm-12">
                            <label>Fecha de nacimiento</label>
                            <input type="date" placeholder="Ingresá la Fecha de nacimiento" class="form-control my-2 " v-model="user.birthDate">
                        </div>

                        <div class="col-sm-12">
                            <label>País</label>
                            <input type="text" placeholder="Ingresá el País" class="form-control my-2 " v-model="user.country">
                        </div>

                        <div class="col-sm-12">
                            <label>Ciudad</label>
                            <input type="selector" placeholder="Ingresá la Ciudad" class="form-control my-2 " v-model="user.city">
                        </div>

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
                                <a class="mx-3"><strong>Tengo una cuenta</strong></a>

                                <b-button class="btn-dark" type="submit" v-on:click="register"><strong>Registrar</strong></b-button>
                            </div>
                        </div>
                    </div>
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
            user: {
                name: "Facundo",
                lastName: "Espilocin", 
                cellPhone: "", 
                birthDate: "01/06/1994",
                country: "Argentina", 
                city: "Buenos Aires",
                userName: "facu.espilocin@hotmail.com", 
                password: "123456"
            },
        }
    },

    created() { },

    methods: {
        ...mapActions(["setUser"]),

        async register() {
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