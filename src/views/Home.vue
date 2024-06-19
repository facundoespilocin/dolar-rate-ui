<template>
    <div id="app">
        <div class="main-content container">
            <Navbar />

            <div class="card">
                <div class="row">
                    <div class="col-sm-4 pull-center">
                        <span>Sincronización automática</span>
                        <br>
                        Los datos se actualizan cada 5 minutos.
                    </div>
                    <div class="col-sm-4 pull-center">
                        <span>Tasas, índices y cotizaciones</span>
                        <br>
                        Información histórica y actualizada.
                    </div>
                    <div class="col-sm-4 pull-center">
                        <span>Soporte ágil y personalizado</span>
                        <br>
                        Si encontrás algun bug, <a href="/BugReport">reportalo</a>.
                    </div>
                </div>
            </div>

            <!-- Cards section -->
            <Cards />
        </div>

        <!-- Footer section -->
         <Footer class="footer"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import "@/assets/style.css"
import Navbar from '@/components/Navbar/Navbar.vue'
import Cards from '@/components/Cards/HomeCards.vue'
import Footer from '@/components/Footers/HomeFooter.vue'

export default {
    components: {
        Navbar,
        Cards,
        Footer
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
