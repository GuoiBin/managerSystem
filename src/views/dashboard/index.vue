<template>
  <div class="dashboard-container">
    <div class="dashboard-text">当前账号：{{ name }}</div>
    <div class="chart-container">
      <line-bar height="100%" width="100%" :option="currentOption" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getChartData } from "@/api/chart";
import LineBar from "../../components/LineBar";

export default {
  name: "Dashboard",
  components: { LineBar },
  data() {
    return {
      currentOption: {}
    };
  },
  computed: {
    ...mapGetters(["name"])
  },
  methods: {
    getData() {
      getChartData().then(res => {
        let list = res.data;
        this.currentOption = {
          series: {
            data: list
          }
        };
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-chart {
    height: 400px;
    background-color: #fff;
  }
}

.chart-container {
  margin-top: 32px;
  width: 100%;
  height: 500px;
}
</style>
