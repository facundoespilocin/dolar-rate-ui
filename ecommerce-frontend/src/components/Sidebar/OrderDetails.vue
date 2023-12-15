<template>
    <div>
        <b-sidebar
            id="sidebar"
            width="25%"
            no-header
            shadow
            bg-variant="light"
            :visible="isCollapsed"
            backdrop-variant="light"
            backdrop
            @hidden="closeSidebar"
            right>
            <template>
                <div class="p-3">
                    <b-overlay :show=showOverlay rounded="sm">
                        <div class="row">
                            <div class="col-sm-11">
                                <h4 id="sidebar-no-header-title" class="">Detalle</h4>
                            </div>

                            <div class="col-sm-1 p-0">
                                <span class="pointer" v-on:click="closeSidebar()">X</span>
                            </div>
                        </div>

                        <hr>

                        <div class="row">
                            <div class="col-sm-5">
                                Producto
                            </div>

                            <div class="col-sm-4 pull-right">
                                Subtotal
                            </div>

                            <div class="col-sm-2 pull-right">
                                Cantidad
                            </div>

                            <div>
                                <hr>
                            </div>
                        </div>

                        <div v-if="products?.length > 0">
                            <div class="row padding-left" v-for="product in products" :key="product.index">
                                <div class="col-sm-2 home-product-card">
                                    <img class="img-container" :src="product.mainImageUrl" width="100%">
                                </div>

                                <div class="col-sm-4 p-0"> 
                                    <a class="pointer m-0 p-0" v-on:click="goProductDetail(product.id)">
                                        {{ ellipsis(product.name) }}
                                    </a>
                                </div>

                                <div class="col-sm-3 text-center p-0">
                                    <p class="m-0 p-0">
                                        ${{ product.price }}
                                    </p>
                                </div>

                                <div class="col-sm-1 pull-right p-0">
                                    <p class="m-0 p-0">
                                        {{ product.quantity }}
                                    </p>
                                </div>

                                <div class="col-sm-1 pull-right p-0">
                                    <b-icon-trash 
                                        class="pointer text-color-red"
                                        v-on:click="deleteOrderItem(product)"></b-icon-trash>
                                </div>
                            </div>

                            <hr>

                            <div class="row">
                                <div class="col-sm-3">
                                    Subtotal:
                                </div>
                                
                                <div class="col-sm-6 pull-right">
                                    <span>
                                        ${{ subTotal }}
                                    </span>
                                </div>

                                <div class="col-sm-2 pull-right">
                                    <span>
                                        {{ totalQuantity }}
                                    </span>
                                </div>
                            </div>

                            <hr>
                            
                            <div class="row">
                                <div>
                                    <div class="row mb-1">
                                        <div class="col-sm-1">
                                            <img class="img-container" src="https://cdn-icons-png.flaticon.com/512/411/411763.png">
                                        </div>

                                        <div class="col-sm-11 p-0">
                                            Envío a domicilio
                                        </div>
                                    </div>

                                    <div class="border-shadow p-1 mb-2">
                                        <div class="row">
                                            <div class="col-sm-9 m-0">
                                                <div class="radio-group">
                                                    <label>
                                                        <input type="radio" value="1" class="margin-left" v-model="deliveryTypeSelected" />
                                                        Correo Argentino
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="col-sm-3 m-0 pull-right">
                                                <span class="block">Gratis</span>
                                                <p class="line-through m-0 p-0">{{ shippingCost }}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mb-1">
                                        <div class="col-sm-1 mb-1">
                                            <img class="img-container" src="https://cdn-icons-png.flaticon.com/512/0/619.png">
                                        </div>

                                        <div class="col-sm-11 p-0">
                                            Retirar
                                        </div>
                                    </div>

                                    <div class="border-shadow p-1">
                                        <div class="row">
                                            <div class="col-sm-9 m-0">
                                                <label>
                                                    <input type="radio" value="2" class="margin-left" v-model="deliveryTypeSelected" /> 
                                                    Correo Argentino - Retiro por sucursal
                                                </label>
                                            </div>

                                            <div class="col-sm-3 m-0 pull-right">
                                                <span class="block">Gratis</span>
                                                <p class="line-through m-0 p-0"> $2139.82</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr>

                            <div class="row">
                                <div class="col-sm-9">
                                    <span>
                                        Total:
                                    </span>
                                </div>

                                <div class="col-sm-3 pull-right">
                                    <span>
                                        ${{ total }}
                                    </span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-12 pull-right">
                                    O hasta 3 cuotas sin interés de 
                                    <span>
                                        ${{ totalInIstallments }}
                                    </span>
                                </div>
                            </div>

                            <hr>

                            <div class="row">
                                <div>
                                    <b-button class="col-sm-12 mb-2" variant="primary" v-on:click="goCheckout()">Comprar</b-button>
                                </div>
                            </div>

                            <div class="row">
                                <div>
                                    <b-button class="col-sm-12" variant="danger" v-on:click="emptyCart()">Vaciar carrito</b-button>
                                </div>
                            </div>
                        </div>

                        <div v-else>
                            <p class="text-center">
                                El carrito de compras está vacío.
                            </p>
                        </div>
                    </b-overlay>
                </div>
            </template>
        </b-sidebar>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import "@/assets/style.css"

export default {
    name: "OrderDetails",
    props: { 
        isCollapsed: Boolean
    },

    data() {
        return {
            showOverlay: false,
            deliveryTypeSelected: 1
        }
    },

    mounted() {
        
    },
    
    created() { 
    },

    methods: {
        ...mapActions(['setRemoveOrderItem']),
        ...mapActions(['setEmptyCart']),

        ellipsis(name){
            return name.length > 29 ? name.substring(0, 29) + "..." : name
        },

        goProductDetail(productId) {
            window.location.href = "/Products/Details/" + productId;
        },

        goCheckout() {
            window.location.href = "/Checkout/v1/Start/" + this.orderId;
        },

        async deleteOrderItem(product) {
            this.showOverlay = true;

            let orderItems = this.$store.getters.getOrderItems - 1;

            let amount = this.subTotal - (product.price * product.quantity);

            let resource = `/orders/${this.orderId}?organizationId=1&items=${orderItems}&productId=${product.id}&amount=${amount}`;
            
            await this.axios.delete(resource)
            .then(res => {
                this.setRemoveOrderItem(product);
                this.isSuccess = true;
            })
            .catch(e => {
                this.showNotification("error", "No fue posible guardar el Producto. Error: " + e);
            })
            .finally(e => {
                this.showOverlay = false;
            })
        },

        async emptyCart() {
            this.showOverlay = true;

            let resource = `/orders/${this.orderId}?organizationId=1`;
            
            await this.axios.post(resource)
            .then(res => {
                this.setEmptyCart();
                this.isSuccess = true;
            })
            .catch(e => {
                this.showNotification("error", "No fue posible guardar el Producto. Error: " + e);
            })
            .finally(e => {
                this.showOverlay = false;
            })
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
        },

        closeSidebar() {
            this.$emit("update:isCollapsed", false);
        },
    },
    
    computed: { 
        ...mapGetters(['getOrderId']),
        ...mapGetters(['getOrderProducts']),
        ...mapGetters(['getSubtotal']),
        ...mapGetters(['getTotalQuantity']),

        orderId() {
            return this.getOrderId;
        },

        products() {
            return this.getOrderProducts;
        },

        subTotal() {
            return this.getSubtotal;
        },

        totalQuantity() {
            return this.getTotalQuantity;
        },

        total() {
            return this.subTotal + this.shippingCost;
        },

        shippingCost() {
            return 2636.23;
        },

        totalInIstallments() {
            return (this.total / 3).toFixed(2);
        }
    },

    watch: { }
}
</script>