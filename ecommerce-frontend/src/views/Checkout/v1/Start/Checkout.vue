<template>
    <div>
        <nav class="navbar">
            <!-- Left section -->
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    <b-icon-house-door />
                </a>
            </div>
        </nav>

        <div class="container border-shadow margin-top">
            <SectionInfo :text="sectionInfoText"/>
            
            <div class="row">
                <div class="col-sm-8" v-if="customer && !showPayment">
                    <div class="margin-bottom-double">
                        <div class="border-shadow p-2">
                            <h3>Datos de contacto</h3>

                            <label id="documentNumber" class="control-label">Email</label>
                            <div class="col-sm-6">
                                <input type="text"
                                    placeholder="Ingresa tu correo electrónico"
                                    class="form-control"
                                    maxlength="100"
                                    v-model="customer.email"
                                    :disabled="email != null">
                            </div>
                        </div>
                    </div>

                    <div class="margin-bottom-double">                
                        <div class="border-shadow p-2">
                            <h3>Dirección de entrega</h3>

                            <div class="row">
                                <div class="">
                                    <!-- <b-icon class="margin-right" icon="exclamation-circle"/> -->
                                    <b-icon-pin-map class="margin-right" />
                                    {{ customer.address }}
                                </div>
                            </div>

                            <div class="row">
                                <div class="margin-left-triple">
                                    CP 1424 - Caballito
                                </div>
                            </div>

                            <div class="row">
                                <div class="margin-left-triple">
                                    {{ customer.city }} - {{ customer.phone }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="margin-bottom-double">                
                        <div class="border-shadow p-2">
                            <h3>Entrega</h3>

                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="radio-group">
                                        <label>
                                            <input type="radio" value="1" class="margin-left" v-model="deliveryTypeSelected" />
                                            <span> $1495.11</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="margin-left-triple">
                                    Correo Argentino
                                </div>
                            </div>

                            <div class="row">
                                <div class="margin-left-triple">
                                    Llega entre el viernes 15/12 y jueves 21/12
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="margin-bottom">
                        <div class="border-shadow p-2">
                            <div class="row">
                                <div class="col-sm-10">
                                    <h3>Datos de facturación</h3>
                                </div>

                                <div class="col-sm-2 pull-right">
                                    <b-icon id="documentNumber-tooltip" icon="info-circle" class="icon-size-s icon-blue" />
                                
                                    <b-tooltip target="documentNumber-tooltip" title="Online!">Este número de documento será utilizado para emitir la factura</b-tooltip>
                                </div>
                            </div>

                            <label id="documentNumber" class="control-label">DNI o CUIT</label>
                            <div class="col-sm-3">
                                <input 
                                    type="text"
                                    class="form-control"
                                    :class="[errorDocumentRequired ? 'is-invalid' : '']"
                                    placeholder="Ingresá el Documento"
                                    maxlength="15"
                                    v-model="customer.documentNumber">
                            </div>

                            <div class="margin-bottom-double mt-1" v-if="customer.documentNumber.length === 0">
                                <small>Es un campo requerido</small>
                            </div>
                        </div>
                    </div>

                    <div class="row margin-bottom">
                        <div class="pull-right">
                            <b-button 
                                class="col-sm-3"
                                variant="primary"
                                type="submit"
                                v-on:click="goToPayment()">
                                    Continuar al pago
                            </b-button>
                        </div>
                    </div>
                </div>

                <!-- PaymentSection -->
                <div class="col-sm-8" v-if="showPayment">
                    <div class="margin-bottom">
                        <div class="border-shadow p-2">
                            <h3>Medios de pago</h3>

                            <div class="accordion " role="tablist">
                                <b-card no-body class="mb-1">
                                    <b-card-header header-tag="header" class="p-1" role="tab">
                                        <b-icon-arrow-left v-b-toggle.accordion-1 class="pointer margin-right margin-left" /> Tarjeta de crédito y débito
                                    </b-card-header>
                                    
                                    <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                                        <b-card-body>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <label id="cardNumber" class="control-label">Número de tarjeta</label>
                                                </div>
                                            
                                                <div class="col-sm-6">
                                                    <label id="cardHolder" class="control-label">Titular de la tarjeta</label>
                                                </div>
                                            </div>

                                            <div class="row margin-bottom">
                                                <div class="col-sm-6">
                                                    <input type="text"
                                                        placeholder="Ingresa tu Número de tarjeta"
                                                        class="form-control"
                                                        maxlength="20">
                                                </div>

                                                <div class="col-sm-6">
                                                    <input type="text"
                                                        placeholder="Ingresa Titular de la tarjeta"
                                                        class="form-control"
                                                        maxlength="20">
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-sm-2">
                                                    <label id="dueDate" class="control-label">Vencimiento</label>
                                                </div>
                                            
                                                <div class="col-sm-1">
                                                    <label id="cardSecurityCode" class="control-label">CVV</label>
                                                </div>
                                            </div>

                                            <div class="row margin-bottom">
                                                <div class="col-sm-2">
                                                    <input type="text"
                                                        placeholder="MM/AA"
                                                        class="form-control"
                                                        maxlength="5"
                                                        v-model="dueDate">
                                                </div>

                                                <div class="col-sm-2">
                                                    <input type="text"
                                                        placeholder="CVV"
                                                        class="form-control"
                                                        maxlength="5">
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div>
                                                    <label id="document" class="control-label">Documento</label>
                                                </div>
                                            </div>

                                            <div class="row margin-bottom">
                                                <div class="form-group">
                                                    <select id="documentTypeSelect" class="form-select" v-model="documentTypeSelected">
                                                        <option 
                                                            v-for="(documentType, index) in documentTypes" :value="documentType" :key="index">
                                                                {{ documentType.description }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div>
                                                    <label id="installments" class="control-label">Cuotas</label>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="form-group">
                                                    <select id="installmentsQuantity" class="form-select" v-model="installmentsQuantitySelected">
                                                        <option 
                                                            v-for="(item, index) in installmentsAvailable" :value="item" :key="index">
                                                                {{ item.installments }} {{ " x " }} {{ total / item.installments }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </b-card-body>
                                    </b-collapse>
                                </b-card>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="pull-right margin-bottom">
                            <b-button 
                                class="col-sm-3"
                                variant="primary"
                                type="submit"
                                v-on:click="postOrder()">
                                    Realizar pedido
                            </b-button>
                        </div>
                    </div>
                </div>

                <!-- Product details -->
                <div class="col-sm-4">
                    <div class="border-shadow p-2">
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
                        </div>

                        <hr class="my-2">

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
                        
                        <div class="row">
                            <div class="col-sm-5">
                                Costo de envío
                            </div>

                            <div class="col-sm-4 pull-right">
                                <span>
                                    $1495.11
                                </span>
                            </div>
                        </div>

                        <hr class="my-2">

                        <div class="row">
                            <div class="col-sm-6">
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

                        <div class="row pull-center" v-if="false">
                            <div class="" v-if="!showDiscountInput">
                                <b-button 
                                    class=""
                                    variant="primary"
                                    type="submit"
                                    v-on:click="showDiscount()">
                                        Agregar cupón de descuento
                                </b-button>
                            </div>

                            <div v-else>
                                <b-input-group>
                                    <b-form-input type="text"
                                    placeholder="Ingresa tu cupón de descuento"
                                    class="form-control"
                                    maxlength="50"
                                    v-model="couponDiscount"
                                    :disabled="isValidCouponDiscount" />
                                    
                                    <b-input-group-text class="pointer" v-on:click="applyDiscount()">
                                        <b-icon-arrow-right-circle />
                                    </b-input-group-text>
                                </b-input-group>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import "@/assets/style.css"
import SectionInfo from '@/components/Warnings/SectionInfo.vue'

export default {
    components: {
        SectionInfo
    },

    data() {
        return {
            sectionInfoText: "Los tiempos de entrega varian según la región de 2 a 6 dias habiles, aproximadamente.",
            email: "facu.espilocin@hotmail.com",
            deliveryTypeSelected: 1,
            documentNumber: 38202776,
            errorDocumentRequired: false,
            showDiscountInput: false,
            couponDiscount: null,
            isValidCouponDiscount: false,
            showPayment: false,

            // Payment section
            dueDate: null,

            documentTypes: [
                {
                    id: 1,
                    description: "DNI"
                },
                {
                    id: 2,
                    description: "Cédula"
                },
                {
                    id: 3,
                    description: "L.C."
                },
                {
                    id: 4,
                    description: "L.E."
                },
            ],

            documentTypeSelected: {
                id: 1,
                description: "DNI"
            },

            installmentsQuantitySelected: {
                id: 1,
                description: "1 x "
            },

            installmentsAvailable: [
                {
                    id: 1,
                    installments: 1,
                },
                {
                    id: 3,
                    installments: 3
                },
                {
                    id: 2,
                    installments: 6
                }
            ]
        }
    },

    async created() { 
        await this.$store.dispatch('getOrderDetails', localStorage.getItem("orderId") || 0);

        await this.$store.dispatch('getUserData', localStorage.getItem("token") || null);
    },

    methods: {
        ellipsis(name){
            return name.length > 29 ? name.substring(0, 29) + "..." : name
        },

        goProductDetail(productId) {
            window.location.href = "/Products/Details/" + productId;
        },

        showDiscount() {
            this.showDiscountInput = !this.showDiscountInput;
        },

        applyDiscount() {
            //this.total = this.total - 1000;
            // this.setOrderCouponDiscount();
            this.showDiscount();
        },

        validateFields() {
            let result = true;
            
            if (this.documentNumber === null || this.documentNumber === '') {
                this.errorDocumentRequired = true;
                result = false;
            } else {
                this.errorDocumentRequired = false;
            }
            
            return result
        },

        goToPayment() {
            this.showPayment = !this.showPayment;
        },

        postOrder() {
            console.log("postOrder");
        },
    },

    computed: { 
        ...mapGetters(['getOrderId']),
        ...mapGetters(['getOrderProducts']),
        ...mapGetters(['getSubtotal']),
        ...mapGetters(['getTotalQuantity']),
        ...mapGetters(['getCustomerData']),

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
        },

        customer() {
            return this.getCustomerData;
        },
    },

    watch: { 
        dueDate(newVal) {
            if (newVal.length === 2 && newVal.charAt(1) !== '/') {
                this.dueDate = newVal + '/';
            }
        }
    }
}
</script>