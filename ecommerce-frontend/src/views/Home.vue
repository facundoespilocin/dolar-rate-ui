<template>
    <div class="home">
      <b-button class="btn-dark" v-b-toggle.sidebar-no-header>Menu</b-button>
        
        <b-sidebar bg-variant="primary" sidebar-class="" border-width="100px" no-header shadow visible>
          <template #default="">
            <div class="p-3">
              <h4 class="menu-title">eCommerce App</h4>
              
              <nav class="mb-3">
                <b-nav vertical>
                  <b-nav-item v-for="itemMenu in itemsMenuList" :key="itemMenu.id">
                        <b-icon-box variant="dark"></b-icon-box>
                        
                        <span class="mx-2 menu-item" v-if="itemMenu.isActive" v-on:click="goSelectedRoute(itemMenu.route)">{{ itemMenu.description }}</span>
                  </b-nav-item>
                </b-nav>
              </nav>
            </div>
          </template>
        </b-sidebar>
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
          id: 4,
          description: "Administración",
          route: "/Administracion",
          isActive: true
        },
      ]
    }
  },

  created() { },

  methods: {
    goSelectedRoute(route) {
      window.location.href = route;
    },
  }
}
</script>