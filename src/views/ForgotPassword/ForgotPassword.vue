<template>
    <div class="p-5">
        <h2 style="text-align: center">Recuperá tu contraseña</h2>
        
        <hr>

        <div class="border-shadow p-3 container col-sm-5">
            <div v-if="steps.step1.isActive">
                <div class="row margin-bottom">
                    <div class="col-sm-3"></div>
                    
                    <div class="col-sm-6">
                        <label>Email</label>
                        
                        <input type="email"
                               :class="[errorEmailRequired ? 'is-invalid' : '', 'form-control my-2']"
                               placeholder="Ingresá el Email"
                               class=""
                               v-model="user.email">
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12 pull-right">
                        <a class="mx-3" href="/Login"><strong>Tengo una cuenta</strong></a>
                        <b-button class="btn-dark mx-2" v-on:click="resetPassword()"><strong>Enviar</strong></b-button>
                    </div>
                </div>
            </div>

            <div v-if="steps.step2.isActive">
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
                        <b-button class="btn-dark" v-on:click="setStep(false)"><strong>Volver</strong></b-button>
                        <b-button class="btn-dark mx-2" v-on:click="postNewPassword()"><strong>Enviar</strong></b-button>
                    </div>
                </div>
            </div>

            <div v-if="steps.step3.isActive">
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
    </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
    data() {
        return {
            user: { 
                email: "facu.espilocin@hotmail.com",
                token: "",
                newPassword: "",
                confirmNewPassword: "",
            },
            steps: 
            {
                currentStep: 0,
                step1: { isActive: true},
                step2: { isActive: false},
                step3: { isActive: false}
            },
            errorEmailRequired: false,
            errorNewPasswordRequired: false,
            errorConfirmPasswordRequired: false,
            errorPasswordMissmatch: false,
        }
    },

    created() { },

    methods: {
        ...mapActions(["setResetPasswordState"]),

        async resetPassword() {
            let isValid = this.validateEmail();

            console.log("isValid: " + isValid);

            if (isValid) {
                console.log(this.user.email);
                this.axios.post("/users/forgot-password/", this.user)
                .then(res => {
                    console.log(res.data);
                    window.location.href = "/ForgotPassword/Success";
                    //const token = res.data.token;
                    this.setResetPasswordState("sended");
                    //window.location.href = "/Administracion";
                })
                .catch(e => {
                    console.log(e);
                    //this.message = e.response.data.message;
                })
            }
        },

        setStep(isNext)
        {
            if (this.steps.currentStep == 0 && isNext) {
                this.steps.step1.isActive = false;
                this.steps.step2.isActive = true;
                this.steps.step3.isActive = false;
            }

            if (this.steps.currentStep == 1 && isNext) {
                this.steps.step1.isActive = false;
                this.steps.step2.isActive = false;
                this.steps.step3.isActive = true;
            } else if (this.steps.currentStep == 1 && !isNext) {
                this.steps.step1.isActive = true;
                this.steps.step2.isActive = false;
                this.steps.step3.isActive = false;
            }

            if (this.steps.currentStep == 2 && !isNext) {
                this.steps.step1.isActive = false;
                this.steps.step2.isActive = true;
                this.steps.step3.isActive = false;
            }

            isNext ? this.steps.currentStep = this.steps.currentStep + 1 : this.steps.currentStep = this.steps.currentStep - 1;
        },

        validateEmail() {
            let result = true;

            if (this.user.email === "") {
                this.errorEmailRequired = true;
                return result = false;
            }

            return result;
        },        

        goBack() {
            window.location.href = "/Login";
        },
    },

    watch: {
        "user.email": function()
        {
            if (this.user.email === "") {
                this.errorEmailRequired = false;
            } else {
                this.errorEmailRequired = false
            }
        },

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