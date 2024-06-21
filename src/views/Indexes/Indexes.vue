<template>
    <div class="rates mt-5">
        <CircularMenu />
    </div>
</template>
  
<script>
import CircularMenu from "@/components/Misc/CircularMenu.vue";

export default {
    name: "Rates",
    components: {
        CircularMenu,
    },
};
</script>
  
<style scoped>
.rates {
    display: flex;
    justify-content: center;
    height: 100vh;
}
</style>
  