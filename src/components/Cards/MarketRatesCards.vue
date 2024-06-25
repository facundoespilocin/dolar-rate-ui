<template>
    <div>
            <div
                class="card-border-primary"
                :class="[screenWidth < 768 ? 'pull-center' : '']" 
                v-if="marketRates.length > 0">
                <div v-for="(marketRate, index) in marketRates" :key="index" class="home-product-card pull-center card-border-shadow">
                    <div class="row">
                        <div class="d-flex align-items-center text-color-primary">
                            <h5 class="flex-grow-1">
                                <span class="text-shadow">{{ ellipsis(marketRate.name) }}</span>
                            </h5>

                            <b-icon-clipboard-check
                                :id="'target-copy-paste-' + index" 
                                class="icon-zoom" 
                                v-on:click="copyToClipboard(marketRate)"/>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-6">
                            <b-badge pill variant="dark" class="badge-primary">Compra</b-badge>
                            <br>
                            <span>${{ marketRate.purchasePrice }}</span>
                        </div>

                        <div class="col-6">
                            <b-badge pill class="badge-secondary"><span class="text-color-black">Venta</span></b-badge>
                            <br>
                            <span>${{ marketRate.salePrice }}</span>
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
        <b-overlay :show="showOverlay" rounded="sm" class="mt-5"></b-overlay>
    </div>
</template>

<script>
import "@/assets/style.css"
import marketRatesMock from '@/assets/mocks/marketRatesMock.json';
import API_ROUTES from '@/api/routes';

export default {
    name: "MarketRatesCards",

    data() {
        return {
            showButtonOverlay: false,
            isSuccess: false,
            errorQuantityRequired: false,
            sizeSelected: "",
            deliveryTypeSelected: 1,
            marketRates: [],
            clipboardText: "El {0} cotiza a ${1} para la compra y ${2} para la venta.\n\n" +
                //"La variación para el dia de hoy {3} es de {4}%.\n\n" +
                "Fuente: https://dolarinfo.ar",
            screenWidth: window.innerWidth,
            intervalId: null,
            showOverlay: false,
        }
    },

    async created() {
        //await this.$store.dispatch('getAllProducts');
        //await this.getMarketRates();
        this.marketRates = marketRatesMock.data;
        
        this.updateScreenWidth();
        window.addEventListener('resize', this.updateScreenWidth);
        
        //this.intervalId = setInterval(this.getMarketRates, 5 * 60 * 1000);
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
        
        async getMarketRates() {
            this.showOverlay = true;

            try {
                const response = await  this.$axios.get(API_ROUTES.GET_MARKET_RATES);
                this.marketRates = response.data.data;
            } catch (error) {
                console.error('Error retrieving Market Rates:', error);
            }

            this.showOverlay = false;
        },

        async copyToClipboard(marketRate) {
            const template = this.clipboardText;
            //const values = [marketRate.name, marketRate.purchasePrice, marketRate.salePrice, await this.getCurrentDate(), marketRate.exchangeRateIndex];
            const values = [marketRate.name, marketRate.purchasePrice, marketRate.salePrice, await this.getCurrentDate()];

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
    },

    computed: { }
}
</script>