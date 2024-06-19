<template>
    <div class="not-found border-shadow container p-2">
        <b-icon-exclamation-triangle class="icon-size-l text-color-custom-yellow"/>
        
        <h1>Página en construcción</h1>
        
        <p>Estamos trabajando. Próximamente vas a poder visualizar el contenido de esta página.</p>
        
        <router-link to="/">Volver</router-link>
    </div>
</template>

<script>
import "@/assets/style.css"

export default {
    name: "InConstruction",

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