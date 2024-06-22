<template>
    <div id="app" :class="[ isDarkTheme ? 'dark' : '' ]">
        <div class="main-content container">           
            <Navbar @theme-change="toggleTheme"/>

            <div :class="[isDarkTheme ? 'card-dark' : 'card']">
                <div class="row">
                    <div class="col-sm-4 pull-center">
                        <span>Sincronización automática</span>
                        <br />
                        Los datos se actualizan cada 5 minutos 🔃
                    </div>
                    <div class="col-sm-4 pull-center">
                        <span>Tasas, índices y cotizaciones</span>
                        <br />
                        Información histórica y actualizada 📊
                    </div>
                    <div class="col-sm-4 pull-center">
                        <span>Soporte ágil y personalizado</span>
                        <br />
                        Si encontrás algún bug,
                        <a href="/BugReport">reportalo</a> 🐞
                    </div>
                </div>
            </div>
            
            <router-view :class="[isDarkTheme ? 'card-dark' : '']"/>
        </div>

        <!-- Footer section -->
        <div class="container">
            <Footer 
                class="footer p-3"
                :class="[isDarkTheme ? 'card-dark' : 'card']"/>
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import Footer from '@/components/Footers/Footer.vue'
import "@/assets/style.css";

export default {
    name: 'App',
    components: {
        Navbar,
        Footer
    },

    data() {
        return {
            isDarkTheme: false,
        };
    },

    mounted() {
        this.isDarkTheme = localStorage.getItem('theme') === 'dark';
    },

    created() {
        
    },

    methods: {
        toggleTheme(isDark) {
            this.isDarkTheme = isDark;
        }
    },

    computed: {},
};
</script>