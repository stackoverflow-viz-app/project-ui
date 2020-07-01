<template>
    <div class="pa-2">
    <v-toolbar-title>Dashboards</v-toolbar-title>
    <v-divider/>
    <div class="stats-card__container">
      <v-row>
        <v-col
          cols="12"
          lg="3"
        >
          <StatsCard
            color="info"
            icon="mdi-account"
            title="Respondents"
            value="90000"
          />
        </v-col>

        <v-col
          cols="12"
          lg="3"
        >
          <StatsCard
            color="primary"
            icon="mdi-poll"
            title="Something"
            value="value"
          />
        </v-col>

        <v-col
          cols="12"
          lg="3"
        >
          <StatsCard
            color="success"
            icon="mdi-earth"
            title="Countries"
            value="200"
          />
        </v-col>
         <v-col
          cols="12"
          lg="3"
        >
          <StatsCard
            color="warning"
            icon="mdi-poll"
            title="Something"
            value="value"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import StatsCard from '../base/StatsCard.vue';

export default {
  components: {
    StatsCard,
  },
  data() {
    return {};
  },
  mounted() {
  },
};
</script>
<style scoped>
.stats-card__container{
  padding-top: 20px;
  /* display: flex;
  justify-content: center;
  flex-direction: row; */
}
</style>
