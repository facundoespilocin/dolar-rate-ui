<template>
  <div class="card-border-primary p-2">
    <h2>TNA de Plazos fijos</h2>

    <p>
      Los porcentajes presentados se corresponden con la Tasa Nominal Anual para colocaciones mediante canales electrónicos a partir de $100.000 en un plazo de 30 días.
    </p>

    <p>La tasa puede cambiar para montos y plazos superiores.</p>

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