<template>
  <div>
      <div class="">
        <h2>Unidad de Valor Adquisitivo</h2>
        <p>
          La Unidad de Valor Adquisitivo (UVA) es una medida utilizada en Argentina, introducida en 2016, con el objetivo de ajustar el valor de activos financieros y créditos hipotecarios según la inflación. 
        </p>
        
        <p>
          Su objetivo es proteger el poder adquisitivo frente a la inflación, ajustándose diariamente al Índice de Precios al Consumidor (IPC).
        </p>
        <p>
          Esto permite que los activos y préstamos ajustados por UVA mantengan su valor real, en busca de mitigar los efectos de la inflación en la economía personal y financiera de los argentinos.
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
import uvaInflationIndexesMock from '@/assets/mocks/uvaInflationIndexesMock.json';
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
  name: "LeftComponent",
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
          chartLoaded: false,
          chartData: {
              labels: [],
              datasets: [
                  {
                      label: "Unidad de Valor Adquisitivo",
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
                              return value + " UVA";
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
                              return tooltipItem.raw + " UVA";
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

      // this.getUvaIndexes();

      this.chartData.labels = uvaInflationIndexesMock.data.map(
          (item) => item.date
      );

      this.chartData.datasets[0].data = uvaInflationIndexesMock.data.map(
          (item) => item.value
      );

      this.setZoomToLastMonth();

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

      async getUvaIndexes() {
          this.showOverlay = true;

          try {
              const response = await this.$axios.get(API_ROUTES.GET_INFLATION_INDEXES, {
                  params: { inflationIndexType: 3 }});
              this.monthlyInflationIndexes = response.data.data;
          } catch (error) {
              console.error('Error retrieving UVA Indexes:', error);
          }

          this.showOverlay = false;
      },

      setZoomToLastMonth() {
          const lastThreeMonthsStartIndex = Math.max(this.chartData.labels.length - 30, 0);

          this.chartOptions.scales.x.min = this.chartData.labels[lastThreeMonthsStartIndex];
          this.chartOptions.scales.x.max = this.chartData.labels[this.chartData.labels.length - 1];
      }
  }
};
</script>