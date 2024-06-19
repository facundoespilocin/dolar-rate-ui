<template>
    <div>
        <div class="border-shadow">
            <h3>Mis direcciones</h3>
            
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import "@/assets/style.css"

export default {
    name: "MyAddresses",

    data() {
        return {
            orders : null,
        }
    },

    async created() { 
    },

    methods: {
        ellipsis(name) {
            return name.length > 29 ? name.substring(0, 29) + "..." : name
        },

        getOrderId(orderId) {
            return "Orden #" + orderId;
        },

        async getAddressesByCustomer() {
        //   let resource = "/orders/customer/" + this.customer.id;
          
        //   await this.axios.get(resource)
        //   .then(res => {
        //       console.log("res.data del getOrdersByCustomer(): ");
        //       console.log(res.data);

        //       this.orders = res.data;
        //   })
        //   .catch(e => {
        //       console.log("Error en getUserData del Store:  " + e);
        //       this.showNotification("error", "No fue posible obtener el detalle del Cliente. Error: " + e);
        //   })
        //   .finally(e => { })
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