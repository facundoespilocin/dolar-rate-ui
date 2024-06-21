<template>
    <div id="app">
        <div class="main-content container">
            <Navbar />
            
            <div class="card">
                <div class="row">
                    <div class="col-sm-4 pull-center">
                        <span>Sincronización automática</span>
                        <br />
                        Los datos se actualizan cada 5 minutos.
                    </div>
                    <div class="col-sm-4 pull-center">
                        <span>Tasas, índices y cotizaciones</span>
                        <br />
                        Información histórica y actualizada.
                    </div>
                    <div class="col-sm-4 pull-center">
                        <span>Soporte ágil y personalizado</span>
                        <br />
                        Si encontrás algún bug,
                        <a href="/BugReport">reportalo</a>.
                    </div>
                </div>
            </div>
            
            <router-view />
        </div>

        <!-- Footer section -->
        <Footer class="footer container"/>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import Footer from '@/components/Footers/HomeFooter.vue'
import "@/assets/style.css";

export default {
    components: {
        Navbar,
        Footer
    },

    data() {
        return {};
    },

    created() {},

    methods: {},

    computed: {},
};
</script>