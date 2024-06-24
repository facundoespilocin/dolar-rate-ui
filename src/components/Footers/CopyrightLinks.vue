<template>
    <div class="copyright-link-row">
        Copyright © 2024 Dolar Info
      <router-link v-for="link in links" :key="link.text" :to="link.path" class="copyright-link-item">
        - {{ link.text }}
      </router-link>
    </div>
  </template>
  
<script>
import "@/assets/style.css"

export default {
    name: "CopyrightLinks",
    props: {
      links: {
        type: Array,
        required: true,
      },
    },
  };
</script>