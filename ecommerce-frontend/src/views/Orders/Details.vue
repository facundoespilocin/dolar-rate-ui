<template>
    <div class="container">
        <Navbar :orderItems=orderItems></Navbar>

        <h1 class="my-2">Detalle de </h1>

        <div class="border-shadow p-4">
            <b-overlay :show=showOverlay rounded="sm">
                <div class="row">
                    <!-- ImagesCarrousel -->
                    <div class="col-sm-2 p-2">
                        <img 
                            v-for="image in product.imagesUrl"
                            class="img-container m-1 home-product-card" 
                            :src="image"
                            :key="image.index">
                    </div>

                    <!-- MainImage -->
                    <div class="col-sm-5 p-2 image-zoom" @mousemove="handleMouseMove">
                        <img class="img-container" :src="product.mainImageUrl" width="100%" ref="zoomImage">
                    </div>

                    <!-- ProductDetail -->
                    <div class="col-sm-5 p-2">
                        <div class="row">
                            <div class="">
                                <h3>
                                    {{ product.name }}
                                </h3>
                            </div>
                        </div>

                        <div class="row">
                            <div class="">
                                <h3>
                                    <strong>${{ product.price }}</strong>
                                </h3>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-11 border-shadow p-2 mb-2 margin-left">
                                <h5 class="mb-0">
                                    3 cuotas sin interés de <strong>${{ product.priceInInstallments }}</strong>
                                </h5>
                            </div>
                        </div>

                        <div class="row">
                            <div
                                class="col-sm-1 p-0 margin-left"
                                v-for="paymentMethod in paymentMethods"
                                :key="paymentMethod.name">
                                    <img width="65%" class="img-container" :src="paymentMethod.url">
                            </div>
                        </div>

                        <div class="row">
                            <div class="">
                                <h5>
                                    <strong>10% de Descuento</strong> pagando por transferencia o depósito bancario
                                </h5>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="">
                                <span class="text-color-primary pointer" v-on:click="showPaymentMethods()">
                                    Ver medios de pago
                                </span>
                            </div>
                        </div>
                        
                        <hr>
                        
                        <div v-if="product.hasSizes">
                            <div class="row">
                                <div class="mb-1">
                                    Talle: {{ sizeSelected }}
                                </div>
                            </div>

                            <div class="row mb-2">
                                <div
                                    class="col-sm-1 p-1 margin-left pointer"
                                    :class="[sizeSelected == size ? 'border-primary' : 'border-shadow']"
                                    v-for="size in product.sizes"
                                    :key="size.id"
                                    v-on:click="selectSize(size)">
                                        <p class="p-0 m-0 text-center">{{ size }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-2 mb-2">
                            <label id="quantity" class="control-label">Cantidad</label>
                            <input 
                                type="number"
                                class="form-control"
                                :class="[errorQuantityRequired ? 'is-invalid' : '']"
                                maxlength="3"
                                v-model="product.quantity">
                        </div>

                        <div class="row mb-2">
                            <b-overlay :show=showButtonOverlay rounded="sm">
                                <div class="col-sm-12">
                                    <b-button 
                                        class="col-sm-12"
                                        variant="primary"
                                        type="submit"
                                        v-on:click="addToCart()"
                                        v-if="!isSuccess">
                                        <b-icon-save class="margin-right"></b-icon-save>
                                            Agregar al carrito
                                    </b-button>

                                    <b-button 
                                        class="col-sm-12"
                                        variant="success"
                                        v-if="isSuccess">
                                        <b-icon-save class="margin-right"></b-icon-save>
                                            Producto agregado con exito
                                    </b-button>
                                </div>
                            </b-overlay>
                        </div>

                        <p>
                            El tiempo de entrega varía de acuerdo a la región. La demora habitual es de 2 a 6 dias habiles, aproximadamente.
                        </p>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col-sm-7 text-center">
                        {{ product.description }}
                    </div>

                    <div class="col-sm-5">
                        <p class="text-center p-0 m-0">
                            Opciones rapidas de envio
                        </p>
                        
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
                                            <input type="radio" value="1" class="margin-left" v-model="deliveryTypeSelected" /> Correo Argentino
                                        </label>
                                    </div>
                                </div>

                                <div class="col-sm-3 m-0 pull-right">
                                    <span class="block">Gratis</span>
                                    <p class="line-through m-0 p-0">{{ product.shippingCost }}</p>
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
                                        <input type="radio" value="2" class="margin-left" v-model="deliveryTypeSelected" /> Correo Argentino - Retiro por sucursal
                                    </label>

                                </div>

                                <div class="col-sm-3 m-0 pull-right">
                                    <span class="block">Gratis</span>
                                    <p class="line-through m-0 p-0">{{ product.withdrawalCost }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ProductDetailsFooter :product=product></ProductDetailsFooter>
            </b-overlay>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import "@/assets/style.css"
import Navbar from '@/components/Navbar/Navbar.vue'
import ProductDetailsFooter from '@/components/Footers/ProductDetails.vue'
import { PAYMENTMETHODS } from '@/enums/enums';

export default {
    components: {
        Navbar,
        ProductDetailsFooter
    },

    data() {
        return {
            showOverlay: true,
            showButtonOverlay: false,
            isSuccess: false,

            product: {
                id: 1,
                name: "Chocolate Aguila 60% Cacao",
                description: "Deliciosa golosina con un sabor único, ideal para satisfacer tu antojo de dulce. Un placer en cada bocado que te cautivará con su dulzura singular.",
                price: 350.0,
                installments: 3,
                priceInInstallments: 116.66,
                quantity: 4,
                shippingCost: 2736.26,
                withdrawalCost: 2181.86,
                hasSizes: true,
                sizes: ["38", "40", "42"]
            },

            errorQuantityRequired: false,
            sizeSelected: "",
            deliveryTypeSelected: 1,
            orderItems: 0,

            paymentMethods: PAYMENTMETHODS
        }
    },

    async created() {
        var productId = this.$route.params.productId;

        await this.getProductDetails(productId);
    },

    methods: {
        ...mapActions(['updateOrderItems']),
        
        async getProductDetails(productId) {
            this.showOverlay = true;

            let resource = "/products/" + productId;
            
            await this.axios.get(resource)
            .then(res => {
                this.product = res.data;
                
                if (this.product.hasSizes) {
                    if (this.product.sizes.length > 0) {
                        this.sizeSelected = this.product.sizes[0];
                    }
                }

                //console.log(this.product);
            })
            .catch(e => {
                this.showNotification("error", "No fue posible obtener el detalle del Producto. Error: " + e);
            })
            .finally(e => {
                this.showOverlay = false;
            })
        },

        async showPaymentMethods() {
            console.log("show Payment Methods")
        },

        async selectSize(size) {
            this.sizeSelected = size;
        },

        async addToCart() {
            //  this.product.reduce((total, product) => total + product.price, 0),
            this.showButtonOverlay = true;
            
            if (this.order !== null && this.order !== undefined) {
                console.log("la orden con Id: " + this.order.id + " contiene la cantidad de: " + this.order.items);

                await this.putOrder(this.order);
            } else {
                await this.postOrder();
            }
        },
        
        async postOrder() {
            console.log("ingreso al postOrder...");

            let resource = "/orders";
            
            let products = [this.product];
            
            let body = { 
                organizationId: 1,
                customerId: 1,
                products: products,
                paymentMethodId: 1,
                amount: this.product.price,
                discount: 0,
                items: 1,
                installments: this.product.installments,
                deliveryType: this.deliveryTypeSelected,
            };
            
            await this.axios.post(resource, body)
            .then(res => {
                this.result = res.data;

                //console.log(this.result.data.orderId);
                console.log(this.result);

                localStorage.setItem("orderId",  this.result.data.id);

                //this.updateOrderItems(this.orderItems + 1);
                this.updateOrderItems(this.$store.getters.getOrderItems + 1);

                // this.orderItems = this.order.items + 1;

                this.isSuccess = true;
            })
            .catch(e => {
                this.showNotification("error", "No fue posible guardar el Producto. Error: " + e);
            })
            .finally(e => {
                this.showButtonOverlay = false;
            })
        },

        async putOrder() {
            console.log("ingreso al putOrder...");
            
            let resource = "/orders";
            
            let products = [this.product];
            
            let body = { 
                id: this.order.id,
                organizationId: 1,
                items: this.order.items + 1,
            };
            
            await this.axios.put(resource, body)
            .then(res => {
                this.result = res.data;

                console.log(this.result.data.orderId);
                console.log(this.result);

                //this.updateOrderItems(this.orderItems + 1);
                this.updateOrderItems(this.$store.getters.getOrderItems + 1);

                // this.orderItems = this.order.items + 1;

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

        handleMouseMove(event) {
            const image = this.$refs.zoomImage;
            const container = event.target;
            const offsetX = event.offsetX / container.offsetWidth * 100;
            const offsetY = event.offsetY / container.offsetHeight * 100;

            image.style.transformOrigin = `${offsetX}% ${offsetY}%`;
        },
    },

    watch: {
        // 'product.price': function() {
        //     // Eliminar caracteres que no sean números ni puntos decimales
        //     this.product.price = this.product.price.replace(/[^0-9.]/g, '');
        //     // Eliminar ceros a la izquierda
        //     this.product.price = this.product.price.replace(/^0+/, '');

        //     // Limitar a dos cifras decimales
        //     const portions = this.product.price.split('.');

        //     if (portions.length === 2) {
        //         portions[1] = portions[1].slice(0, 2);
        //         this.product.price = portions.join('.');
        //     } else if (portions.length > 2) {
        //         this.product.price = portions[0] + '.' + portions[1].slice(0, 2);
        //     }
        // },

        'product.quantity': function() {
            // Eliminar ceros a la izquierda
            //this.product.quantity = this.product.quantity.replace(/[^0-9.]/g, "").replace(/^0+/, "");
        },
    },

    computed: {
        //...mapGetters({order: 'getOrder'})
    }
}
</script>