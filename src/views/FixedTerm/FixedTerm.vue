<template>
  <div>
    <div class="mb-3" v-if="screenWidth > 768">
      <BarChart />
    </div>
    <div v-else>
      <Table />
    </div>
  </div>
</template>

<script>
import BarChart from "@/views/FixedTerm/BarChart.vue";
import Table from "@/views/FixedTerm/Table.vue";

export default {
    name: "FixedTerm",
    components: { BarChart, Table },

    data() {
        return {
          screenWidth: window.innerWidth,
        };
    },

    created() {
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