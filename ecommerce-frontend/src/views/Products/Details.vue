<template>
    <div class="container">
        <Navbar></Navbar>

        <h1 class="my-2">Detalle de Producto</h1>
        <div class="border-shadow p-4">
            <div class="row">
                <!-- ImagesCarrousel -->
                <div class="col-sm-2 p-2">
                    Carrousel de Imagenes
                </div>

                <!-- MainImage -->
                <div class="col-sm-4 p-2">
                    Imagen principal
                </div>

                <!-- ProductDetail -->
                <div class="col-sm-6 p-2">
                    <div class="">
                        <h3>
                            {{ product.name }}
                        </h3>
                    </div>

                    <div class="">
                        <h3>
                            <strong>${{ product.price }}</strong>
                        </h3>
                    </div>

                    <div class="col-sm-11 border-shadow p-2 mb-2">
                        <h5>
                            3 cuotas sin interes de <strong>${{ product.priceInInstallments }}</strong>
                        </h5>
                    </div>

                    <div class="">
                        <h5>
                            Lista de Logos de medios de pagos
                        </h5>
                    </div>

                    <div class="">
                        <h5>
                            <strong>10% de Descuento</strong> pagando por transferencia o depósito bancario
                        </h5>
                    </div>

                    <div class="">
                        <a v-on:click="showPaymentMethods()">
                            Ver medios de pago
                        </a>
                    </div>
                    
                    <hr>
                    
                    <div>
                        Talle: [38]
                    </div>

                    <div class="mb-2">
                        Lista de Talles
                        <div class="col-sm-1 border-shadow p-1">
                            38
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

                    <div>
                        <b-button 
                            class="col-sm-12"
                            variant="primary"
                            type="submit"
                            v-on:click="addToCart(product.id)">
                            <b-icon-save class="margin-right"></b-icon-save>
                                Agregar al carrito
                        </b-button>
                    </div>
                    <p>
                        El tiempo de entrega varía de acuerdo a la región. La demora habitual es de 2 a 6 dias habiles, aproximadamente.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import "@/assets/style.css"
import Navbar from '@/components/Navbar/Navbar.vue'

export default {
    components: {
        Navbar
    },

    data() {
        return {
            product: {
                id: 1,
                name: "Chocolate Aguila 60% Cacao",
                price: 350.0,
                installments: 3,
                priceInInstallments: 116.66,
                quantity: 4
            },

            errorQuantityRequired: false
        }
    },

    async created() {
        //Get_ProductId
        // console.log("valor: " + this.$route.params.productId);

        var productId = this.$route.params.productId;

        //await this.getProductDetails(productId);
    },

    methods: {
        async getProductDetails(productId) {
            //this.showOverlay = true;

            let resource = "/products/" + productId;
            console.log("entro al GET");
            // let params = {
            //         productId: productId
            // };

            //await this.axios.get(resource, { params })
            await this.axios.get(resource)
            .then(res => {
                this.product = res.data;
                console.log(this.product);
            })
            .catch(e => {
                this.showNotification("error", "No fue posible obtener el detalle del Producto. Error: " + e);
            })
            .finally(e => {
                this.showOverlay = false;
            })
        },

        showPaymentMethods() {
            console.log("show Payment Methods")
        },

        async addToCart(productId) {
            console.log(productId);
        }
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
            this.product.quantity = this.product.quantity.replace(/[^0-9.]/g, "").replace(/^0+/, "");
        },
    },

    computed: {
        //...mapGetters({customersOperation: 'getCustomersOperation'})
    }
}
</script>