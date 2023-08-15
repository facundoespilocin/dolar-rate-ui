<template>
    <div class="container">
        <h1 class="my-2">Categorías</h1>
        
        <div class="border-shadow p-4">
            <div v-if="categoriesOperation === 'Consultar Categorias'">
                <ReadCategories />
            </div>

            <div v-if="categoriesOperation === 'Agregar Categorias'">
            </div>

            <div v-if="categoriesOperation === 'Cargar Categorias'">
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import "@/assets/style.css"
import ReadCategories from '@/views/Categories/ReadCategories.vue'

export default {
    components: {
        ReadCategories,
    },

    data() {
        return {
        }
    },

    created() {
        console.log(this.categoriesOperation);
    },

    methods: { },

    computed: {
        ...mapGetters({categoriesOperation: 'getCategoriesOperation'})
    }
}
</script>