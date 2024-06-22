<template>
    <Bar
        v-if="chartLoaded"
        id="chart"
        :options="chartOptions"
        :data="chartData"
        :style="styles" />
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
import fixedTermRatesMock from "@/assets/mocks/fixedTermRatesMock.json";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);

export default {
    name: "BarChart",
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
                labels: ["January", "February", "March"],
                datasets: [
                    {
                        label: "TNA p/ Clientes",
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
                },
            },
        };
    },
    async mounted() {

    },
    async created() {
        this.chartLoaded = false;

        this.chartData.labels = fixedTermRatesMock.data.map(
            (item) => item.entity
        );

        this.chartData.datasets[0].data = fixedTermRatesMock.data.map(
            (item) => item.noClientsTna
        );

        this.chartLoaded = true;
    },
};
</script>