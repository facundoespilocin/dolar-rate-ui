<template>
    <div class="container">
        <Navbar />
        
        <div class="card">
            <div class="row">
                <div class="col-sm-4 pull-center">
                    <span>Envío gratis en pedidos US$ 99+</span>
                    <br>
                    Dentro de todo el país
                </div>
                <div class="col-sm-4 pull-center">
                    <span>Envíos rápidos</span>
                    <br>
                    Comprá en linea, recibí dentro de las 24 hs
                </div>
                <div class="col-sm-4 pull-center">
                    <span>Soporte en tiempo real</span>
                    <br>
                    Asesoramiento ágil y personalizado
                </div>
            </div>
        </div>

        <!-- Cards section -->
        <Cards/>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import "@/assets/style.css"
import Navbar from '@/components/Navbar/Navbar.vue'
import Cards from '@/components/Cards/HomeCards.vue'

export default {
    components: {
        Navbar,
        Cards
    },

    data() {
        return {
        }
    },

    async created() {
        
    },

    methods: {
        
    },

    computed: {
        
    }
}
</script>