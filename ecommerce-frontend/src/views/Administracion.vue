<template>
    <div>
        <h1 class="my-2">Panel de Administración</h1>
        
        <Sidebar/>
    </div>
</template>

<script>
import "@/assets/style.css"
import Sidebar from "../components/Sidebar/Sidebar.vue"

export default {
    components: {
        Sidebar
    },

    data() {
        return {
        
        }
    },

    created() { },

    methods: {
        
    },

    computed: { },

    watch: { }
}
</script>