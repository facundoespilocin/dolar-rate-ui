<template>
    <div class="search-container col-sm-4">
        <div class="search-input-container">
            <b-input-group>
                <input
                    type="text"
                    v-model="searchQuery"
                    @input="handleInput"
                    @keydown.esc="clearResults"
                    placeholder="Ingresá el Nombre"
                    class="search-input form-control"
                    :disabled="selectedResult">
            </b-input-group>
        </div>

        <div v-if="searchResults.length > 0" class="search-dropdown">
            <div v-for="(result, index) in searchResults" :key="result.id" class="dropdown-item p-1" @click="selectResult(result)">
                <span>{{ result.name }}</span>
                
                <button v-if="index === 0" class="close-results" @click="closeResults"></button>
            </div>
        </div>

        <div v-else-if="options.length <= 0" class="no-results">
            No se encontraron resultados.
        </div>
    </div>
</template>

<script>
export default {
    name: 'Autocomplete',
    props: {
        options: Array
    },
  data() {
    return {
        searchQuery: '',
        searchResults: [],
        selectedResult: false
    };
  },
  methods: {
    async handleInput() {
        this.searchResults = this.options.filter(result =>
            result.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    },
    
    search() {
        
    },

    clearResults() {
        this.searchResults = [];
    },

    selectResult(result) {
        this.selectedResult = true;
        this.searchQuery = result.name; // Rellena la búsqueda con el resultado seleccionado
        this.searchResults = []; // Cierra el dropdown
        this.$emit('result-selected', result);
    },

    closeResults() {
        this.selectedResult = false;
    }
  },
  computed: { }
};
</script>