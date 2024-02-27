<template>
    <div>
        <div class="row mb-3">
            <h5 class="text-center">
                Productos relacionados
            </h5>
            
            <div class="col-sm-3 m-0 home-product-card"
                v-for="image in product.imagesUrl"
                :key="image.index">

                <img class="img-container" :src="image">
            </div>

            <div class="col-sm-3 m-0 home-product-card"
                v-for="image in product.imagesUrl"
                :key="image.index">

                <img class="img-container" :src="image">
            </div>
        </div>
        
        <div class="row">
            <div class="col-sm-1">
                <img class="img-container" src="https://cdn-icons-png.flaticon.com/512/411/411763.png">
            </div>
            
            <div class="col-sm-3 m-0">
                <div class="text-center">
                    <span class="block">Envios a todo el pais.</span>

                    <p class="block">Entregas seguras con seguimiento</p>
                </div>
            </div>

            <div class="col-sm-1 m-0 vertical-line">
                <img class="img-container" src="https://cdn-icons-png.flaticon.com/512/5280/5280226.png">
            </div>

            <div class="col-sm-3 m-0">
                <div class="text-center">
                    <span class="block">Todos los medios de pago</span>

                    <p class="block">Efectivo (en puntos de pago), Tarjetas de Crédito y Débito</p>
                </div>
            </div>

            <div class="col-sm-1 vertical-line m-0">
                <img class="img-container" src="https://cdn-icons-png.flaticon.com/512/2111/2111832.png">
            </div>

            <div class="col-sm-3 m-0">
                <div class="text-center text-color-primary pointer">
                    <span class="block">Contactanos por WhatsApp</span>
                    
                    <p class="block">Soporte rápido y eficaz</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "@/assets/style.css"
import { mapGetters, mapActions } from "vuex"

export default {
    name: "ProductDetailsFooter",
    props: { 
        product: Object,
    },

    data() {
        return { }
    },

    async created() {
    },

    methods: {
    },

    computed: {
    }
}
</script>