<template>
    <div>
        <b-navbar toggleable="lg" class="">
            <b-navbar-brand href="/" class="margin-left">
                <img src="@/assets/icons/dollar-info-icon.png" width="20%">
                <span class="text-color-white margin-left">Dólar Info</span>
            </b-navbar-brand>

            <b-navbar-toggle class="margin-right" target="nav-collapse">
                <template #default="{ expanded }">
                    <b-icon class="text-color-white" v-if="expanded" icon="chevron-bar-up"></b-icon>
                    <b-icon class="text-color-white" v-else icon="chevron-bar-down"></b-icon>
                </template>
            </b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav class="justify-content-center">
                <b-navbar-nav class="">
                    <b-nav-item class="navbar-item" href="/">
                        <span class="text-color-white margin-left">
                            Panel principal
                        </span>
                    </b-nav-item>

                    <b-nav-item class="navbar-item" href="/Indexes">
                        <span class="text-color-white margin-left">
                            Índices
                        </span>
                    </b-nav-item>

                    <b-nav-item class="navbar-item" href="/FixedTerm">
                        <span class="text-color-white margin-left">
                            Plazo fijo
                        </span>
                    </b-nav-item>

                    <b-nav-item class="navbar-item" href="/Historic">
                        <span class="text-color-white margin-left">
                            Histórico
                        </span>
                    </b-nav-item>

                    <b-nav-item class="navbar-item" href="/Currencies">
                        <span class="text-color-white margin-left">
                            Otras monedas
                        </span>
                    </b-nav-item>

                    <b-nav-item class="navbar-item" href="/Donations">
                        <span class="text-color-white margin-left">
                            Donaciones
                        </span>
                    </b-nav-item>

                    <b-nav-item class="navbar-item" href="/">
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>

            <!-- <ThemeSwitch @theme-change="$emit('theme-change', $event)"/> -->
        </b-navbar>
    </div>
</template>

<script>
import "@/assets/style.css"
import ThemeSwitch from '@/components/Navbar/ThemeSwitch.vue';

export default {
    name: "Navbar",
    components: { ThemeSwitch },

    data() {
        return { 
            isCollapsed: false,
        }
    },

    async created() {
        //await this.$store.dispatch('getOrderDetails', localStorage.getItem("orderId") || 0);

        //console.log("cantidad de items leidos desde el store, llamando desde Navbar: " + this.orderItems);
    },

    methods: {
        showSidebar() {
            this.isCollapsed = !this.isCollapsed;
        },

        updateIsCollapsed(value) {
            this.isCollapsed = value;
        },

        updateProducts(index) {
            this.products = this.products.filter(i => i.index !== index);
        },

        showNotification(type, text) {
            this.$toasted.show(text, {
                duration: 3000,
                type: type,
                theme: "bubble",
                singleton: true,
                action: {
                    text: 'X',
                    onClick: (e, toastObject) => {
                        toastObject.goAway(0);
                    }
                },
            });
        }
    },
    
    watch: {
        // async orderId(newOrderId) {
        //     console.log("llego a orderId");
        //     await this.getOrder();
        // },
    },

    computed: { }
}
</script>