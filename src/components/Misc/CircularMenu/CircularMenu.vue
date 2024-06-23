<template>
  <div class="circular-menu">
    <div class="circular-menu-item circular-menu-top" @click="selectMenuItem('TopComponent')">
      <span class="text-color-white">Mensual</span>
    </div>
    
    <div class="circular-menu-item circular-menu-right" @click="selectMenuItem('RightComponent')">
      <span class="text-color-white">Interanual</span>
    </div>
    
    <div class="circular-menu-item circular-menu-left" @click="selectMenuItem('LeftComponent')">
      <span class="text-color-white">UVA</span>
    </div>
  </div>
</template>

<script>
import "@/assets/style.css"

export default {
  name: 'CircularMenu',
  methods: {
    selectMenuItem(menuItem) {
      this.$emit('menu-selected', menuItem);
    }
  }
};
</script>