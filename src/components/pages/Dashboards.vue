<template>
  <div class="pa-2 stats-card__container">
    <BannerStatsCards />
    <v-row>
      <v-col cols="12" lg="2" md="2" sm="12">
        <v-row>
          <v-col cols="12">
            <Filters :countries="countries" :devTypes="devTypes"
              :selectedCountries.sync="selectedCountries"
              :selectedDevTypes.sync="selectedDevTypes"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <Legend
              :selectedDevTypes="selectedDevTypes"/>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="10" md="10" sm="12">
        <v-row>
          <v-col cols="12" lg="6" md="12" sm="12">
            <v-card class="filter-section-card" outlined>
              <v-card-text>

                <h3>Education impact over Developer Type</h3>
                <BubbleChart
                  :height="450" :margin="20"
                  y-title="Mean Salary"
                  x-title="Educational Level, From (No Degree) To (Phd Degree)"
                  :selectedCountries="selectedCountries"
                  :selectedDevTypes="selectedDevTypes"/>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" lg="6" md="12" sm="12">
            <v-card class="filter-section-card" outlined>
                <v-card-text>
                <h3>Upward mobility</h3>
                <MultiLineChart style="text-align:center"
                  :height="450"
                  :selectedCountries="selectedCountries" :selectedDevTypes="selectedDevTypes"/>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6" md="12" sm="12">
            <v-card class="filter-section-card" outlined>
              <v-card-text>
                 <h3>Work-life Balance</h3>
                <RadarChart style="text-align:center"
                  :height="450"
                  :selectedCountries="selectedCountries" :selectedDevTypes="selectedDevTypes"/>

              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" lg="6" md="12" sm="12">
            <v-card class="filter-section-card" outlined>
                <v-card-text>
                <h3>Technologies correlation</h3>
                <NetworkGraph :height="450"
                  :selectedCountries="selectedCountries"
                  :selectedDevTypes="selectedDevTypes"/>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BannerStatsCards from '../base/BannerStatsCards.vue';
import Filters from '../base/Filters.vue';
import Legend from '../base/Legend.vue';
import RadarChart from '../diagrams/RadarChart.vue';
import MultiLineChart from '../diagrams/MultiLineChart.vue';
import BubbleChart from '../diagrams/BubbleChart.vue';
import NetworkGraph from '../diagrams/NetworkGraph.vue';

export default {
  components: {
    BannerStatsCards,
    Filters,
    Legend,
    RadarChart,
    MultiLineChart,
    BubbleChart,
    NetworkGraph,
  },
  data() {
    return {
      countries: ['United States', 'India', 'Germany', 'United Kingdom', 'Canada', 'France', 'Brazil', 'Poland', 'Australia', 'China', 'Greece'],
      devTypes: ['Developer, back-end', 'Developer, full-stack', 'Database administrator', 'Academic researcher', 'Data or business analyst', 'Developer, front-end', 'Data scientist & ML', 'DevOps specialist'],
      selectedCountries: [],
      selectedDevTypes: [],
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

.filter-section-card{
  border-radius:0px;
  color:#333;
}

.filter-card-text{
    padding:0.5rem;
}
</style>
