<template>
    <div class="p-5">
        <h2 style="text-align: center">Recuperá tu contraseña</h2>
        
        <hr>

        <div class="border-shadow p-3 container col-sm-5">
            <div>
                <div class="row">
                    <div class="col-sm-3"></div>
                    
                    <div class="col-sm-6 margin-bottom">
                        <label>Nueva contraseña</label>
                        
                        <input type="password"
                               :class="[errorNewPasswordRequired ? 'is-invalid' : '', 'form-control']"
                               maxlength="16"
                               placeholder="Ingresá la Contraseña"
                               v-model="user.newPassword">

                        <small class="margin-bottom" v-if="errorNewPasswordRequired">Es un campo requerido</small>
                    </div>
                </div>
                
                <div class="row margin-bottom">
                    <div class="col-sm-3"></div>

                    <div class="col-sm-6">
                        <label>Confirmar nueva contraseña</label>
                        
                        <input type="password"
                               :class="[errorConfirmPasswordRequired ? 'is-invalid' : '', 'form-control']"
                               maxlength="16"
                               placeholder="Ingresá la Contraseña"
                               v-model="user.confirmNewPassword">

                        <small class="margin-bottom" v-if="errorConfirmPasswordRequired">Es un campo requerido</small>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-3"></div>

                    <div class="col-sm-6">
                        <small class="margin-bottom" v-if="errorPasswordMissmatch">Los campos no coinciden</small>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12 pull-right">
                        <b-button class="btn-dark" v-on:click="goBack()"><strong>Volver</strong></b-button>
                        <b-button class="btn-dark mx-2" v-on:click="postNewPassword()"><strong>Enviar</strong></b-button>
                    </div>
                </div>
            </div>            
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            user: { 
                email: "facu.espilocin@hotmail.com",
                token: "",
                newPassword: "",
                confirmNewPassword: "",
            },
            errorNewPasswordRequired: false,
            errorConfirmPasswordRequired: false,
            errorPasswordMissmatch: false,
        }
    },

    async created() {
        await this.validateToken(new URLSearchParams(window.location.search).get('token'));
    },

    methods: {
        async validateToken(token) {
            console.log(token);

            if (token != null & token != "") {
                this.user.token = token;
            }
        },

        async postNewPassword() {
            let isValid = this.validateFields();

            console.log(this.user);

            if (isValid)
            {
                let request = { token : this.user.token, newPassword: this.user.newPassword };
                this.axios.post("/users/reset-password/", request)
                // this.axios.post(`/users/confirm-account/${token}`, token)
                .then(res => {
                    console.log(res);
                    this.setResetPasswordState("success");
                    window.location.href = "/ForgotPassword/Success";
                })
                .catch(e => {
                    //this.showNotification("error", e.response.data.metadata.message);
                })
            }
        },

        validateFields() {
            let result = true;
            
            if (this.user.confirmNewPassword === "") {
                this.errorConfirmPasswordRequired = true;
                return result = false;
            }
            
            if (this.user.newPassword !== this.user.confirmNewPassword) {
                this.errorPasswordMissmatch = true;
                return result = false;
            }

            return result;
        },

        goBack() {
            window.location.href = "/ForgotPassword";
        }
    },

    watch: {
        "user.newPassword": function()
        {
            if (this.user.newPassword === "") {
                this.errorNewPasswordRequired = true;
                this.errorPasswordMissmatch = false;
            } else {
                this.errorNewPasswordRequired = false
            }
        },

        "user.confirmNewPassword": function()
        {
            if (this.user.confirmNewPassword === "") {
                this.errorConfirmPasswordRequired = true;
                this.errorPasswordMissmatch = false;
            } else {
                this.errorConfirmPasswordRequired = false
            }
        },
    }
}
</script>