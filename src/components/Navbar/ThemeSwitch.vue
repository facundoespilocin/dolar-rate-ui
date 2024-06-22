<template>
    <div class="margin-right">
      <label class="switch">
        <input type="checkbox" v-model="isDarkMode" v-on:click="toggleTheme">
        <span class="slider"></span>
        <span class="switch-icon" v-if="isDarkMode">🌙</span>
        <span class="switch-icon" v-else>☀️</span>
      </label>
    </div>
</template>
  
<script>
export default {
    name: 'ThemeSwitch',
    data() {
      return {
        isDarkMode: false,
      };
    },
    created() {
      this.isDarkMode = localStorage.getItem('theme') === 'dark';
      this.applyTheme();
    },
    methods: {
      toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        
        localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
        
        this.applyTheme();

        this.$emit('theme-change', this.isDarkMode);
      },
      applyTheme() {
        document.body.className = this.isDarkMode ? 'dark-theme' : 'light-theme';
      },
    },
  };
</script>  