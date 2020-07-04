<template>
  <div>
  <v-toolbar-title>Dashboards</v-toolbar-title>
  <v-divider/>
  <NetworkGraph width="900" height="600"/>
  </div>
</template>

<script>
import NetworkGraph from '../diagrams/NetworkGraph.vue';

export default {
  components: {
    NetworkGraph,
  },
  data() {
    return {};
  },
  mounted() {
  },
};
</script>
