<template>
  <div id="LineBarArea" :style="`height:${height};width:${width}`"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    gridTop: {
      type: String,
      default: "54px",
    },
    gridBttom: {
      type: String,
      default: "48px",
    },
    gridLeft: {
      type: String,
      default: "48px",
    },
    gridRight: {
      type: String,
      default: "48px",
    },
    title: {
      type: String,
      default: "",
    },
    option: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById("LineBarArea"));
      this.chart.setOption({
        title: {
          text: this.title,
          x: "center",
          y: "10px",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: this.gridLeft,
          right: this.gridRight,
          top: this.gridTop,
          bottom: this.gridBttom,
        },
        xAxis: {
          type: "time",
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "line",
            data: [5, 20, 36, 10, 10, 20, 10],
          },
        ],
      });
    },
  },
  watch: {
    option: {
      handler(val) {
        this.chart.setOption(val);
      },
      deep: true,
    },
  },
  mounted() {
    this.initChart();
  },
};
</script>

<style>
</style>