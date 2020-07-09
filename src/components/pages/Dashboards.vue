<template>
  <div class="pa-2 stats-card__container">
    <BannerStatsCards />
    <v-row>
      <v-col cols="2">
        <v-row>
          <v-col cols="12">
            <Filters :countries="countries" :devTypes="devTypes" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="10">
        <v-row>
          <v-col cols="6">
            <v-card class="filter-section-card" outlined>
              <v-card-text>
                <h3>Work-life Balance</h3>
                <RadarChart style="text-align:center"
                :filterCountry="{}"
                :filterDeveloperType="{}"/>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card class="filter-section-card" outlined>
                <v-card-text>
                <h3>Upward mobility</h3>
                <MultiLineChart style="text-align:center"
                :filterCountry="{}"
                :filterDeveloperType="{}" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-card class="filter-section-card" outlined>
              <v-card-text>
                <h3>Education impact over Developer Type</h3>
                <GapMinderChart
                  :width="700" :height="450" :margin="20"/>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card class="filter-section-card" outlined>
                <v-card-text>
                <h3>Technologies correlation</h3>
                <NetworkGraph :width="700" :height="450"/>
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
import RadarChart from '../diagrams/RadarChart.vue';
import MultiLineChart from '../diagrams/MultiLineChart.vue';
import GapMinderChart from '../diagrams/GapMinderChart.vue';
import NetworkGraph from '../diagrams/NetworkGraph.vue';

export default {
  components: {
    BannerStatsCards,
    Filters,
    RadarChart,
    MultiLineChart,
    GapMinderChart,
    NetworkGraph,
  },
  data() {
    return {
      countries: ['United States', 'India', 'Germany', 'United Kingdom', 'Canada', 'France', 'Brazil', 'Poland', 'Australia', 'China', 'Greece'],
      devTypes: ['Developer, back-end', 'Developer, full-stack', 'Database administrator', 'Academic researcher', 'Data or business analyst', 'Designers', 'Developer, front-end', 'Data scientist & ML', 'DevOps specialist'],
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
