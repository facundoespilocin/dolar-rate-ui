<template>
    <div>
        <nav class="navbar">
            <!-- Left section -->
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    Logo
                </a>
            </div>

            <!-- Center section -->
            <div class="navbar-brand">
                <a class="navbar-item" href="/Shop">
                    Productos
                </a>

                <a class="navbar-item" href="/Administracion">
                    Administración
                </a>
            </div>

            <!-- Right section -->
            <div class="navbar-end">
                <a class="navbar-item" href="#">
                    <span class="icon">
                        <b-icon-people></b-icon-people>
                    </span>
                </a>

                <a class="navbar-item" href="#">
                    <span class="icon">
                        <b-icon-search></b-icon-search>
                    </span>
                </a>

                <a class="navbar-item cart-icon pointer" v-on:click="showSidebar()">
                    <span class="icon">
                        <b-icon-cart></b-icon-cart>

                        <span class="cart-count">
                            {{ orderItems > 0 ? orderItems : 0 }}
                        </span>
                    </span>
                </a>
            </div>
        </nav>

        <OrderDetails 
            v-if="orderId > 0"
            :isCollapsed="isCollapsed"
            @update:isCollapsed="updateIsCollapsed">
        </OrderDetails>
    </div>
</template>

<script>
import "@/assets/style.css"
import { mapGetters, mapActions } from "vuex"
import OrderDetails from '@/components/Sidebar/OrderDetails.vue'

export default {
    name: "Navbar",

    components: {
        OrderDetails
    },

    data() {
        return { 
            isCollapsed: false,
        }
    },

    async created() {
        console.log("orderItems: " + this.orderItems);
        await this.getOrder();
    },

    methods: {
        async getOrder() {
            console.log("orderId from LS: " + this.orderId);

            if (this.orderId != null && this.orderId != undefined) {
                console.log("entro al if");

                let resource = "/orders/" + this.orderId;
                
                await this.axios.get(resource)
                .then(res => {
                    this.order = res.data;

                    console.log("orderId devuelto en el GetOrder: " + this.order.id);
                    console.log("orderData: ");
                    console.log(this.order);

                    //this.products = this.order.products;
                    
                    //this.orderItems = this.order.items;

                    //this.setOrder(this.order);
                })
                .catch(e => {
                    //this.showNotification("error", "No fue posible obtener el detalle del Producto. Error: " + e);
                })
                .finally(e => {
                    this.showButtonOverlay = false;
                })
            }
        },

        showSidebar() {
            this.isCollapsed = !this.isCollapsed;
        },

        updateIsCollapsed(value) {
            this.isCollapsed = value;
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

    computed: {
        ...mapGetters({orderId: 'getOrderId'}),
        ...mapGetters(['getOrderItems']),
        orderItems() {
            return this.getOrderItems;
        },
    }
}
</script>