<template>
    <div>
        <div class="">
            <h2>Índice de Inflación Mensual</h2> 

            <p>
                El índice de inflación mensual es una medida económica que calcula el cambio en el nivel de precios de bienes y servicios de un mes al siguiente.
                Este índice permite evaluar la velocidad a la que los precios están subiendo en una economía durante un período de un mes.
            </p>

            <p>
                Los datos se recopilan y analizan para proporcionar una estimación del aumento de los precios al consumidor, reflejando así el poder adquisitivo de la moneda y la evolución de la inflación en el corto plazo. 
            </p>

            <p>Este índice se calcula el último dia del mes anterior y se publica los primeros días del mes en curso.</p>
        </div>

        <div v-if="screenWidth > 768">
            <Bar
            id="barChart"
            ref="barChart"
            v-if="chartLoaded"
            :options="chartOptions"
            :data="chartData"
            :style="styles" />
        </div>
        <div v-else>
            <Table />
        </div>
    </div>
</template>

<script>
import "@/assets/style.css"
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
import Table from '@/components/Misc/CircularMenu/TopComponent/Table.vue';
import monthlyInflationIndexesMock from '@/assets/mocks/monthlyInflationIndexesMock.json';
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
    name: "TopComponent",
    components: { Bar, Table },
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
            screenWidth: window.innerWidth,
            chartLoaded: false,
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: "Índice de Inflación Mensual",
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

        this.chartData.labels = monthlyInflationIndexesMock.data.map(
            (item) => item.date
        );

        this.chartData.datasets[0].data = monthlyInflationIndexesMock.data.map(
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

        async getMonthlyIndexes() {
            this.showOverlay = true;

            try {
                const response = await this.$axios.get(API_ROUTES.GET_INFLATION_INDEXES, {
                    params: { inflationIndexType: 1 }});
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