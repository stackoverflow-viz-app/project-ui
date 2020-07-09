<template>
    <div class="pa-2">
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
            value="~90000"
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
      <v-row
        align="center">
      <v-col cols="6">
          <v-autocomplete
            v-model="values"
            :items="countries"
            dense
            chips
            small-chips
            label="Countries"
            multiple
            filled
            solo
          ></v-autocomplete>
      </v-col>
      <v-col cols="6">
          <v-autocomplete
            v-model="values"
            :items="devTypes"
            dense
            chips
            small-chips
            label="Developer Type"
            multiple
            filled
            solo
          ></v-autocomplete>
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
    return {
      countries: ['United States', 'India', 'Germany', 'United Kingdom', 'Canada', 'France', 'Brazil', 'Poland', 'Australia', 'China', 'Greece'],
      devTypes: ['Developer, back-end', 'Developer, full-stack', 'Database administrator', 'Academic researcher', 'Data or business analyst', 'Designers', 'Developer, front-end', 'Data scientist or machine learning specialist', 'DevOps specialist'],
    };
  },
  mounted() {
  },
};
</script>
<style scoped>
.stats-card__container{
  padding-top: 20px;
}
</style>
