<template>
  <div id="app">
      <div class="p-2" v-if="!isActive">
        <b-button class="btn-dark" v-b-toggle.sidebar-no-header>Menu</b-button>
        
        <b-sidebar id="sidebar-no-header" bg-variant="dark" sidebar-class="border border-dark" border-width="100px" aria-labelledby="sidebar-no-header-title" no-header shadow visible>
          <template #default="">
            <div class="p-3">
              <h4 id="sidebar-no-header-title" class="menu-title">PedidosApp</h4>
              
              <nav class="mb-3">
                <b-nav vertical>
                  <!-- <b-nav-item v-for="itemMenu in itemsMenuList" v-bind="itemMenu.id">
                    <h6 class="menu-item" v-if="itemMenu.isActive">{{ itemMenu.description }}</h6>
                  </b-nav-item> -->
                  <b-nav-item href="/">
                    <h6 class="menu-item">Home</h6>
                  </b-nav-item>
                  
                  <b-nav-item>
                    <h6 class="menu-item" href="/About">About</h6>
                  </b-nav-item>

                  <b-nav-item href="/Login" v-if="!isActive">
                    <h6 class="menu-item">Log In</h6>
                  </b-nav-item>

                  <b-nav-item href="/Logout" v-if="isActive" v-on:click="logOut()">
                    <h6 class="menu-item">Log Out</h6>
                  </b-nav-item>

                  <b-nav-item href="/Administracion" v-if="isActive">
                    <h6 class="menu-item">Administración</h6>
                  </b-nav-item>
                </b-nav>
              </nav>
            </div>
          </template>
        </b-sidebar>
      </div>

      <!-- Navbar -->
      <!-- <div id="navbar">
        <b-navbar toggleable="lg" type="dark" variant="dark">
          <b-navbar-brand href="#">NavBar</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item href="/">Item 1</b-nav-item>
              <b-nav-item href="/">Item 2</b-nav-item>
              <b-nav-item href="/">Item 3</b-nav-item>
              
              <b-nav-item-dropdown right v-if="isActive"> 
                Using 'button-content' slot
                <template #button-content>
                  <em>User</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item v-on:click="logOut()">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>

            Right aligned nav items
            <b-navbar-nav class="ml-auto">
              
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div> -->
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import "@/assets/style.css"

export default {
  data() {
    return {
      itemsMenuList: [
        {
          id: 0,
          description: "Home",
          route: "/",
          isActive: true
        },
        {
          id: 1,
          description: "About Us",
          route: "/",
          isActive: true
        },
        {
          id: 2,
          description: "Log In",
          route: "/",
          isActive: this.isActive,
        },
        {
          id: 3,
          description: "Log Out",
          route: "/",
          isActive: this.isActive,
        },
        {
          id: 4,
          description: "Administración",
          route: "/Administracion",
          isActive: true
        },
      ]
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