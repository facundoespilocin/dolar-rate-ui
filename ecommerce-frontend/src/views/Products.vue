<template>
    <div class="container">
        <h1 class="my-2">Productos</h1>
        
        <div class="border-shadow p-4">
            <div v-if="productsOperation === 'Consultar Productos'">
                <ReadProducts />
            </div>

            <div v-if="productsOperation === 'Agregar Productos'">
                <NewProduct />
            </div>

            <div v-if="productsOperation === 'Cargar Productos'">
                <LoadProducts />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import "@/assets/style.css"
import ReadProducts from '@/views/Products/ReadProducts.vue'
import NewProduct from '@/views/Products/NewProduct.vue'
import LoadProducts from '@/views/Products/LoadProducts.vue'

export default {
    components: {
        ReadProducts,
        NewProduct,
        LoadProducts,
    },

    data() {
        return {
        }
    },

    created() {
        console.log(this.productsOperation);
    },

    methods: { },

    computed: {
        ...mapGetters({productsOperation: 'getProductsOperation'})
    }
}
</script>