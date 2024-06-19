<template>
    <div>
        <div class="border-shadow">
            <h3>Ordenes en progreso</h3>

            <div class="my-profile-card" v-for="order in orders" :key="order.index">
                <div class="row m-1 background-primary">
                    <div class="col-sm-9">
                        <h4 class="mt-1">Orden #{{ order.id }}</h4>
                    </div>
                    
                    <div class="pull-right col-sm-3">
                        <b-icon-eye class="margin-top-half pointer" font-scale="1.5" v-on:click="goToOrderDetail(order.id)"/>
                    </div>
                </div>
                
                <img :src="order.products[0].mainImageUrl">

                <b-card-text>
                    <div>
                        Pago: Pagado
                    </div>
                    
                    <div>
                        Envío: En proceso
                    </div>
                    
                    Total: $<strong>{{ order.amount }}</strong>
                </b-card-text>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import "@/assets/style.css"

export default {
    name: "MyOrders",
    props: { 
        customerId: Number
    },

    data() {
        return {
            orders : null,
        }
    },

    async created() { 
        // await this.$store.dispatch('getOrderDetails', localStorage.getItem("orderId") || 0);
        //await this.$store.dispatch('getUserData', localStorage.getItem("token") || null);
        
        await this.getOrdersByCustomer();
    },

    methods: {
        ellipsis(name) {
            return name.length > 29 ? name.substring(0, 29) + "..." : name
        },

        getOrderId(orderId) {
            return "Orden #" + orderId;
        },

        async getOrdersByCustomer() {
            let resource = "/orders/customer/" + this.customer.id;
            
            await this.axios.get(resource)
            .then(res => {
                console.log("res.data del getOrdersByCustomer(): ");
                console.log(res.data);

                this.orders = res.data;
            })
            .catch(e => {
                console.log("Error en getUserData del Store:  " + e);
                this.showNotification("error", "No fue posible obtener el detalle del Cliente. Error: " + e);
            })
            .finally(e => { })
        },

        goToOrderDetail(orderId) {
            window.location.href = "MyProfile/Orders/" + orderId;
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

    computed: { 
        ...mapGetters(['getCustomerData']),

        customer() {
            return this.getCustomerData;
        },
    },

    watch: { 
        // dueDate(newVal) {
        //     if (newVal.length === 2 && newVal.charAt(1) !== '/') {
        //         this.dueDate = newVal + '/';
        //     }
        // }
    }
}
</script>