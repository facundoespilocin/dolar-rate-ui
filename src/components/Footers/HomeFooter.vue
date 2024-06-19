<template>
    <div>        
        <div class="row">
            <div class="col-sm-1 m-0 d-flex align-items-center justify-content-center">
                <b-icon-currency-dollar class="icon-size-l text-color-primary text-shadow" />
            </div>
            
            <div class="col-sm-3 m-0">
                <div class="text-center">
                    <span class="block">Objetivo</span>

                    <p class="block">Este proyecto, fundado el 19 de junio de 2024, tiene como misión principal ofrecer información detallada sobre todos los tipos de cambio vigentes en Argentina. Además, proporcionamos datos actualizados sobre índices de inflación mensual e interanual, así como otros indicadores económicos relevantes del país.</p>
                </div>
            </div>

            <div 
                class="col-sm-1 m-0 d-flex align-items-center justify-content-center"
                :class="[screenWidth > 768 ? 'vertical-line' : ' top-line']">
                    <b-icon-suit-heart class="icon-size-l text-color-primary margin-top text-shadow" />
            </div>

            <div class="col-sm-3 m-0">
                <div class="text-center">
                    <span class="block">Donaciones</span>

                    <p class="block">
                        ¡Tu apoyo es fundamental para mantener nuestra plataforma actualizada y accesible para todos! Con tu donación podés ayudarnos a seguir proporcionando información confiable sobre tipos de cambio, índices de inflación y otros indicadores económicos clave de Argentina. ¡Cada contribución cuenta!
                        <a href='https://cafecito.app/facuespilocin' rel='noopener' target='_blank'>
                            <img srcset='https://cdn.cafecito.app/imgs/buttons/button_3.png 1x, https://cdn.cafecito.app/imgs/buttons/button_3_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_3_3.75x.png 3.75x' src='https://cdn.cafecito.app/imgs/buttons/button_3.png' alt='Invitame un café en cafecito.app' />
                        </a>
                    </p>
                </div>
            </div>

            <div 
                class="col-sm-1 m-0 d-flex align-items-center justify-content-center"
                :class="[screenWidth > 768 ? 'vertical-line' : 'top-line'] ">
                <b-icon-envelope class="icon-size-l text-color-primary margin-top text-shadow" />
            </div>

            <div class="col-sm-3 m-0">
                <div class="text-center">
                    <span class="block">Contacto</span>
                    
                    <p class="block">
                        Por cualquier consulta y sugerencia, están habilitados los siguientes canales de comunicación
                        dolarinformation@gmail.com
                    </p>
                    
                    <a href="https://www.instagram.com/facuespilocin/" target="_blank"><b-icon-instagram class="icon-size-s text-color-primary pointer" /></a>
                    <a href="https://twitter.com/facuespilocin_" target="_blank"><b-icon-twitter class="icon-size-s margin-left text-color-skyblue pointer" /></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "@/assets/style.css"
import { mapGetters, mapActions } from "vuex"

export default {
    name: "HomeFooter",
    props: { 
        product: Object,
    },

    data() {
        return { 
            screenWidth: window.innerWidth
        }
    },

    async created() {
        this.updateScreenWidth();
        window.addEventListener('resize', this.updateScreenWidth);
    },

    destroyed() {
        window.removeEventListener('resize', this.updateScreenWidth);
    },

    methods: {
        updateScreenWidth() {
            this.screenWidth = window.innerWidth;
        },
    },

    computed: {
    }
}
</script>