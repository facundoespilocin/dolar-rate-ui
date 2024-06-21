<template>
  <div>
    <div v-if="screenWidth > 768">
      <BarChart />
    </div>
    <div v-else>
      
    </div>
  </div>
</template>

<script>
import fixedTermRatesMock from "@/assets/mocks/fixedTermRatesMock.json";
import BarChart from "@/components/Bar/Bar.vue";
import API_ROUTES from "@/api/routes";

export default {
    name: "FixedTerm",
    components: { BarChart },

    data() {
        return {
          screenWidth: window.innerWidth,
        };
    },

    async created() {
        this.updateScreenWidth();
        window.addEventListener('resize', this.updateScreenWidth);
    },

    destroyed() {
        window.removeEventListener('resize', this.updateScreenWidth);
    },

    methods: {
      updateScreenWidth() {
            this.screenWidth = window.innerWidth;
        },
    }
};
</script>