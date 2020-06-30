developer dashboard


<template>
    <v-container>
      <v-toolbar-title>Developer Dashboard</v-toolbar-title>
      <v-divider/>
    <BarChart
    :data="data"
    :height="height"
    :width="width"
    :margin="margin"
    :yTitle="yTitle"
    :xTitle="xTitle"/>
    <HbarChart
    :data="data"
    :height="height"
    :width="width"
    :margin="margin"
    :hyTitle="yTitle"
    :hxTitle="xTitle"/>
    </v-container>
</template>

<script>
import BarChart from '../diagrams/BarChart.vue';
import HbarChart from '../diagrams/HbarChart.vue';

export default {
  components: {
    BarChart,
    HbarChart,
  },
  data() {
    return {
      data: [
        { x: 'Test1', y: 100 },
        { x: 'Test2', y: 900 },
        { x: 'Test3', y: 500 },
        { x: 'Test4', y: 600 },
        { x: 'Test5', y: 700 },
      ],
      height: 600,
      width: 600,
      margin: 60,
      yTitle: 'Test y-axis',
      xTitle: 'Test x-axis',
      hxTitle: 'Test hx-axis',
      yxTitle: 'Test hx-axis',
    };
  },
  mounted() {
  },
};
</script>
