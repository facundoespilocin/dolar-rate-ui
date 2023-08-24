<template>
    <div class="container">
        <h1 class="my-2">Clientes</h1>
        
        <div class="border-shadow p-4">
            <div v-if="customersOperation === 'Consultar Clientes'">
                <ReadCustomers />
            </div>

            <div v-if="customersOperation === 'Agregar Clientes'">
            </div>

            <div v-if="customersOperation === 'Cargar Clientes'">
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import "@/assets/style.css"
import ReadCustomers from '@/views/Customers/ReadCustomers.vue'
import Sidebar from "../components/Sidebar/Sidebar.vue"

export default {
    components: {
        ReadCustomers,
        Sidebar
    },

    data() {
        return {
        }
    },

    created() {
        console.log(this.customersOperation);
    },

    methods: { },

    computed: {
        ...mapGetters({customersOperation: 'getCustomersOperation'})
    }
}
</script>