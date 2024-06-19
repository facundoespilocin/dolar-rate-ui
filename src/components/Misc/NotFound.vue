<template>
    <div class="not-found">
        <h1>404 - Página No Encontrada</h1>
        <p>Lo sentimos, pero la página que buscas no existe.</p>
        <router-link to="/">Volver</router-link>
    </div>
</template>

<script>
import "@/assets/style.css"

export default {
    name: "NotFound",

    data() {
        return { 
            isCollapsed: false,
        }
    },

    async created() {
    },

    methods: { },
    
    watch: { },

    computed: { }
}
</script>