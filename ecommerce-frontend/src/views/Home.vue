<template>
    <div class="home">
        <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
        <SearchBar msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from '@/components/SearchBar.vue'

export default {
  name: 'Home',
  components: {
    SearchBar
  },
  data()
  {
    return {

    }
  },

  created(){
    this.callTest();
  },

  methods: {
    callTest() {
      let id = 1;
      
      this.axios.get(`/user/${id}`)
      .then(res => {
        console.log(res.data.name);
      })
      .catch(e => {
        console.log(e);
      })
    }
  }
}
</script>