<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import "@/assets/style.css"

export default {
  data() {
    return {
      
    }
  },

  created() {
    this.getToken();
  },

  methods: {
    ...mapActions(["logOut", "getToken"])
  },

  computed: {
    ...mapGetters(["isActive"])
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat');
</style>

<!-- <style>
#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style> -->