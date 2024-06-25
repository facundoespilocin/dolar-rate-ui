<template>
  <div>
      <div class="component-container">
          <h2>Índice de Inflación Interanual</h2> 

          <p>
            El Índice de Inflación Interanual es una medida económica que calcula el cambio porcentual en el nivel de precios de bienes y servicios durante un período de un año completo en comparación con el mismo período del año anterior.
          </p>

          <p>
            Este índice proporciona una visión de la tasa de inflación a largo plazo en una economía, mostrando cómo los precios han variado en un año calendario. 
          </p>
      </div>

      <Bar
          id="barChart"
          ref="barChart"
          v-if="chartLoaded"
          :options="chartOptions"
          :data="chartData"
          :style="styles" />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import yearOnYearInflationIndexesMock from '@/assets/mocks/yearOnYearInflationIndexesMock.json';
import API_ROUTES from '@/api/routes';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  zoomPlugin 
);

export default {
  name: "RightComponent",
  components: { Bar },
  computed: {
      styles() {
          return {
              color: "#8C08B9",
              position: "relative",
          };
      },
  },
  data() {
      return {
          showOverlay: false,
          chartLoaded: false,
          chartData: {
              labels: [],
              datasets: [
                  {
                      label: "Índice de Inflación Interanual",
                      data: [],
                      backgroundColor: ["#8C08B9"],
                  },
              ],
          },
          chartOptions: {
              responsive: true,
              scales: {
                  x: {
                      ticks: {
                          color: "black",
                          font: {
                              weight: "bold",
                              size: "14",
                          },
                      },
                  },
                  y: {
                      ticks: {
                          color: "#8C08B9",
                          font: {
                              weight: "bold",
                              size: "14",
                          },
                          callback: function (value) {
                              return value + "%";
                          },
                      },
                      beginAtZero: true,
                  },
              },
              plugins: {
                  legend: {
                      labels: {
                          color: "black",
                          font: {
                              weight: "bold",
                              size: "14",
                          }
                      },
                  },
                  tooltip: {
                      callbacks: {
                          label: function (tooltipItem) {
                              return tooltipItem.raw + "%";
                          },
                      },
                  },
                  zoom: {
                      pan: {
                          enabled: true,
                          mode: 'x',
                      },
                      zoom: {
                          wheel: {
                              enabled: true,
                          },
                          pinch: {
                              enabled: true
                          },
                          mode: 'x',
                          rangeMin: {
                              x: 0
                          },
                          rangeMax: {
                              x: 0
                          }
                      }
                  }
              },
          },
      };
  },
  async mounted() {
      this.updateScreenWidth();
      window.addEventListener('resize', this.updateScreenWidth);
      
      this.chartLoaded = false;

      // this.getYearOnYearIndexes();

      this.chartData.labels = yearOnYearInflationIndexesMock.data.map(
          (item) => item.date
      );

      this.chartData.datasets[0].data = yearOnYearInflationIndexesMock.data.map(
          (item) => item.value
      );

      // Establecer el zoom inicial a los últimos 3 meses
      this.setZoomToLastThreeMonths();

      this.chartLoaded = true;
  },
  async created() {
      
  },
  
  destroyed() {
      window.removeEventListener('resize', this.updateScreenWidth);
  },

  methods: {
      updateScreenWidth() {
          this.screenWidth = window.innerWidth;
      },

      async getYearOnYearIndexes() {
          this.showOverlay = true;

          try {
              const response = await this.$axios.get(API_ROUTES.GET_INFLATION_INDEXES, {
                  params: { inflationIndexType: 2 }});
              this.monthlyInflationIndexes = response.data.data;
          } catch (error) {
              console.error('Error retrieving Monthly Inflation Indexes:', error);
          }

          this.showOverlay = false;
      },

      setZoomToLastThreeMonths() {
          const lastThreeMonthsStartIndex = Math.max(this.chartData.labels.length - 3, 0);

          this.chartOptions.scales.x.min = this.chartData.labels[lastThreeMonthsStartIndex];
          this.chartOptions.scales.x.max = this.chartData.labels[this.chartData.labels.length - 1];
      }
  }
};
</script>