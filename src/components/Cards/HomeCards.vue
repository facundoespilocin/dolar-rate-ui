<template>
    <div>
        <div class="product-section">
            <div v-for="product in products" :key="product.index" class="home-product-card">
                <div v-on:click="goProductDetail(product.id)">
                    <img class="pointer" :src="product.mainImageUrl">
                    
                    <h5 class="pull-center product-title pointer">{{ product.name.length >= 24 ? product.name.substring(0,24) + "..." : product.name }}</h5>
                    
                    <p class="pull-center">Price: <span>$</span>{{ product.price }}</p>
                </div>

                <div class="pull-center">
                    <b-overlay :show=showButtonOverlay rounded="sm">
                        <b-button variant="primary" v-on:click="addToCart(product)">Agregar al carrito</b-button>
                    </b-overlay>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "@/assets/style.css"
import { mapGetters, mapActions } from "vuex"

export default {
    name: "HomeCards",

    data() {
        return {
            showOverlay: true,
            showButtonOverlay: false,
            isSuccess: false,
            errorQuantityRequired: false,
            sizeSelected: "",
            deliveryTypeSelected: 1,
        }
    },

    async created() {
        await this.$store.dispatch('getAllProducts');
    },

    methods: {
        ...mapActions(['setAddOrderItem']),
        ...mapActions(["setOrderId"]),

        async addToCart(product) {
            this.showButtonOverlay = true;

            product.imagesUrl = [""];

            // Obtener CustomerProductId y persistirlo en cada producto al añadir
            // un item al carrito
            
            console.log("la orden con Id: " + this.orderId + " contiene la cantidad de: " + this.orderItems);
            
            if (this.orderId > 0) {
                await this.putOrder(product);
            } else {
                await this.postOrder(product);
            }
        },

        async postOrder(product) {
            console.log("ingreso al postOrder...");

            product.quantity = 1;

            let resource = "/orders";
            
            let body = { 
                organizationId: 1,
                customerId: 1,
                product: product,
                paymentMethodId: 1,
                amount: product.price,
                discount: 0,
                items: 1,
                installments: product.installments,
                deliveryType: 1,
            };
            
            await this.axios.post(resource, body)
            .then(res => {
                this.result = res.data;

                console.log(this.result);

                this.setOrderId(this.result.data.id)

                this.setAddOrderItem(product);

                this.isSuccess = true;
            })
            .catch(e => {
                this.showNotification("error", "No fue posible guardar el Producto. Error: " + e);
            })
            .finally(e => {
                this.showButtonOverlay = false;
            })
        },

        async putOrder(product) {
            console.log("ingreso al putOrder...");
            
            product.quantity = 1;
            let amount = this.getSubtotal + product.price;
            let resource = "/orders";

            let body = { 
                id: this.orderId,
                organizationId: 1,
                customerId: 1,
                product: product,
                paymentMethodId: 1,
                amount: amount,
                discount: 0,
                items: this.orderItems + 1,
                installments: product.installments,
                deliveryType: 1,
            };
            
            await this.axios.put(resource, body)
            .then(res => {
                this.result = res.data;
                
                this.setAddOrderItem(product);

                this.isSuccess = true;
            })
            .catch(e => {
                this.showNotification("error", "No fue posible guardar el Producto. Error: " + e);
            })
            .finally(e => {
                this.showButtonOverlay = false;
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

        async goProductDetail(productId) {
            window.location.href = "/Products/Details/" + productId;
        }
    },

    computed: {
        ...mapGetters(['getOrderId']),
        ...mapGetters(['getOrderItems']),
        ...mapGetters(['getSubtotal']),

        orderItems() {
            return this.getOrderItems;
        },

        orderId() {
            return this.getOrderId;
        },

        products() {
            return this.$store.getters.getProducts;
        },

        subTotal() {
            return this.getSubtotal;
        },
    }
}
</script>