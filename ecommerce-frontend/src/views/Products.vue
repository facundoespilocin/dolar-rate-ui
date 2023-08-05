<template>
    <div class="container">
        <h1 class="my-2">Productos</h1>
        
        <div class="border-shadow p-4">
            <div v-if="productsOperation === 'Consultar Productos'">
                <Filters />
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
import { mapState } from "vuex"
import "@/assets/style.css"
import Filters from '@/views/Products/Filters.vue'
import NewProduct from '@/views/Products/NewProduct.vue'
import LoadProducts from '@/views/Products/LoadProducts.vue'

export default {
    components: {
        Filters,
        NewProduct,
        LoadProducts,
    },

    data() {
        return { }
    },

    created() { },

    methods: { },

    computed: {
        ...mapState(["productsOperation"])
    }
}
</script>