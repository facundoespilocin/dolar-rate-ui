<template>
    <div class="circular-menu">
      <div class="menu-item top" @click="selectedMenuItem = 'TopComponent'">
        <span>Mensual</span>
      </div>
      <div class="menu-item right" @click="selectedMenuItem = 'RightComponent'">
        <span>Interanual</span>
      </div>
      <!-- <div class="menu-item bottom" @click="selectedMenuItem = 'BottomComponent'">
        <span>UVA</span>
      </div> -->
      <div class="menu-item left" @click="selectedMenuItem = 'LeftComponent'">
        <span>UVA</span>
      </div>
  
      <component :is="selectedMenuItem" v-if="selectedMenuItem" />
    </div>
  </template>
  
  <script>
  import TopComponent from './TopComponent.vue';
  import RightComponent from './RightComponent.vue';
  import BottomComponent from './BottomComponent.vue';
  import LeftComponent from './LeftComponent.vue';
  
  export default {
    name: 'CircularMenu',
    components: {
      TopComponent,
      RightComponent,
      BottomComponent,
      LeftComponent,
    },
    data() {
      return {
        selectedMenuItem: null,
      };
    },
  };
  </script>
  
  <style scoped>
  .circular-menu {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    /*transform: rotate(45deg);  Rotates the menu items */
  }
  
  .menu-item {
    position: absolute;
    width: 90px;
    height: 90px;
    background-color: #8C08B9;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  }
  
  .menu-item:hover {
    transform: scale(1.1); /* Scale up on hover */
  }
  
  .top {
    top: -40px;
    left: 60px;
  }
  
  .right {
    top: 60px;
    left: 160px;
  }
  
  .bottom {
    top: 160px;
    left: 60px;
  }
  
  .left {
    top: 60px;
    left: -40px;
  }
  
  span {
    color: white;
    font-weight: bold;
  }
  </style>
  