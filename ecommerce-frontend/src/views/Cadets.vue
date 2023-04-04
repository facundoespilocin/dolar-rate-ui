<template>
    <div class="container">
        <h1 class="my-2">Cadetes</h1>
        
        <div class="border-shadow p-4">
            <div v-if="cadetsOperation === 'Consultar Cadetes'">
                <Filters />
            </div>

            <div v-if="cadetsOperation === 'Agregar Cadetes'">
                <NewCadet />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import "@/assets/style.css"
import Filters from '@/views/Cadets/Filters.vue'
import NewCadet from '@/views/Cadets/NewCadet.vue'

export default {
    components: {
        Filters,
        NewCadet,
    },

    data() {
        return { }
    },

    created() { },

    methods: { },
    computed: {
        ...mapState(["cadetsOperation"])
    }
}
</script>