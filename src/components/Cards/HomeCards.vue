<template>
    <div>
        <b-overlay :show="showOverlay" rounded="sm">
            <div
                class="product-section"
                :class="[screenWidth < 768 ? 'pull-center' : '']" 
                v-if="exchangeRates.length > 0">
                <div v-for="(exchangeRate, index) in exchangeRates" :key="index" class="home-product-card pull-center">
                    <div class="row">
                        <div class="d-flex align-items-center text-color-primary">
                            <h5 class="flex-grow-1">
                                <span class="text-shadow">{{ ellipsis(exchangeRate.name) }}</span>
                            </h5>

                            <b-icon-clipboard-check
                                :id="'target-copy-paste-' + index" 
                                class="icon-zoom" 
                                v-on:click="copyToClipboard(exchangeRate)"/>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-6">
                            Compra
                            <br>
                            <span>${{ exchangeRate.purchasePrice }}</span>
                        </div>

                        <div class="col-6">
                            Venta
                            <br>
                            <span>${{ exchangeRate.salePrice }}</span>
                        </div>
                    </div>

                    <!-- <div class="row pull-center">
                        <div class="pull-center" v-if="exchangeRate.exchangeRateIndex > 0">
                            <b-icon-caret-down-fill class="text-color-red"/>
                            {{ exchangeRate.exchangeRateIndex }}
                        </div>
                        
                        <div class="pull-center" v-else>
                            <b-icon-caret-up-fill class="icon-green"/>
                            {{ exchangeRate.exchangeRateIndex }}
                        </div>
                    </div> -->

                    <b-tooltip 
                        :target="'target-copy-paste-' + index"
                        triggers="hover">
                            Copiá toda la información del contenedor
                    </b-tooltip>
                </div>
            </div>
        </b-overlay>
    </div>
</template>

<script>
import "@/assets/style.css"
import dollarRatesMocks from '@/assets/mocks/dollarRatesMock.json';
import API_ROUTES from '@/api/routes';

export default {
    name: "HomeCards",

    data() {
        return {
            showButtonOverlay: false,
            isSuccess: false,
            errorQuantityRequired: false,
            sizeSelected: "",
            deliveryTypeSelected: 1,
            exchangeRates: [],
            clipboardText: "El dólar {0} cotiza a ${1} para la compra y ${2} para la venta.\n\n" +
                //"La variación para el dia de hoy {3} es de {4}%.\n\n" +
                "Fuente: https://dolarinfo.com.ar",
            screenWidth: window.innerWidth,
            intervalId: null,
            showOverlay: false,
        }
    },

    async created() {
        //await this.$store.dispatch('getAllProducts');
        //await this.getExchangeRates();
        this.exchangeRates = dollarRatesMocks.data;
        
        this.updateScreenWidth();
        window.addEventListener('resize', this.updateScreenWidth);
        
        //this.intervalId = setInterval(this.getExchangeRates, 5 * 60 * 1000);
    },

    destroyed() {
        window.removeEventListener('resize', this.updateScreenWidth);

        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    },

    methods: {
        updateScreenWidth() {
            this.screenWidth = window.innerWidth;
        },

        ellipsis(name) {
            return name.length > 29 ? name.substring(0, 29) + "..." : name
        },
        
        async getExchangeRates() {
            this.showOverlay = true;

            try {
                const response = await this.axios.get(API_ROUTES.GET_EXCHANGE_RATES);
                this.exchangeRates = response.data.data;
            } catch (error) {
                console.error('Error retrieving Exchange Rates:', error);
            }

            this.showOverlay = false;
        },

        async copyToClipboard(exchangeRate) {
            const template = this.clipboardText;
            //const values = [exchangeRate.name, exchangeRate.purchasePrice, exchangeRate.salePrice, await this.getCurrentDate(), exchangeRate.exchangeRateIndex];
            const values = [exchangeRate.name, exchangeRate.purchasePrice, exchangeRate.salePrice, await this.getCurrentDate()];

            // Replace placeholders {0}, {1}, {2}, {3} y {4} with the correct values
            const formattedString = template.replace(/\{(\d+)\}/g, (match, index) => values[index]);

            const tempInput = document.createElement('textarea');
            tempInput.value = formattedString;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);

            this.showNotification('success', 'Texto copiado al portapapeles');
            this.$root.$emit('bv::hide::tooltip')
        },

        async getCurrentDate() {
            const date = new Date();
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();

            return `${day}/${month}/${year}`;
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

        // async goProductDetail(productId) {
        //     window.location.href = "/Products/Details/" + productId;
        // }
    },

    computed: {
        // orderItems() {
        //     return this.getOrderItems;
        // },

        // orderId() {
        //     return this.getOrderId;
        // },

        // products() {
        //     return this.$store.getters.getProducts;
        // },

        // subTotal() {
        //     return this.getSubtotal;
        // },
    }
}
</script>