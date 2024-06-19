<template>
    <div>
        <nav class="navbar">
            <!-- Left section -->
            <div class="navbar-brand">
                <!-- <a class="navbar-item" href="/">
                    <b-icon-house-door />
                </a> -->
            </div>

            <!-- Center section -->
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    Panel principal
                </a>

                <a class="navbar-item" href="/Inflation">
                    Inflación
                </a>
            </div>

            <!-- Right section -->
            <div class="navbar-end">
                <!-- <a class="navbar-item" href="/MyProfile">
                    <span class="icon">
                        <b-icon-people />
                    </span>
                </a>

                <a class="navbar-item" href="#">
                    <span class="icon">
                        <b-icon-search />
                    </span>
                </a>

                <a class="navbar-item cart-icon pointer" v-on:click="showSidebar()">
                    <span class="icon">
                        <b-icon-cart></b-icon-cart>

                        <span class="cart-count">
                            {{ orderItems > 0 ? orderItems : 0 }}
                        </span>
                    </span>
                </a> -->
            </div>
        </nav>
    </div>
</template>

<script>
import "@/assets/style.css"

export default {
    name: "Navbar",

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