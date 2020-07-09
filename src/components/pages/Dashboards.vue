<template>
  <div class="pa-2 stats-card__container">
    <InfoCards />
    <v-row>
      <v-col cols="2">
        <v-row>
          <v-col cols="12">
          <v-card  class="filter-section-card" outlined>
            <v-card-text class="filter-card-text">
              <h3>Data Filters</h3>
              <br/>
              <span>Segment the Dashboard, using the filters available below.</span>
               <v-col
                  cols="12"
                  class="px-0"
                >
                <v-divider />
                </v-col>
                <h4>Country</h4>
                <br/>
                <v-autocomplete
                  :items="countries"
                  dense
                  chips
                  small-chips
                  label="(All)"
                  multiple
                  filled
                  solo
                  outlined
                  class="filter-section-card"
                ></v-autocomplete>
               <v-col
                cols="12"
                class="px-0"
              >
                <v-divider />
              </v-col>
              <h4>Developer Type</h4>
              <br/>
              <v-autocomplete
                    :items="devTypes"
                    dense
                    chips
                    small-chips
                    label="(All)"
                    multiple
                    filled
                    solo
                    outlined
                    class="filter-section-card">
              </v-autocomplete>
            </v-card-text>
          </v-card>
           </v-col> 
           </v-row>
        </v-col>
        <v-col cols="10">
          <v-row>
          <v-col  cols="6">
            <v-card  class="filter-section-card" outlined>
              <v-card-text>
                <h3>Work-life Balance</h3>
                <RadarChart style="text-align:center" :filterCountry="{}" :filterDeveloperType="{}"/>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col  cols="6">
            <v-card  class="filter-section-card" outlined>
                <v-card-text>
                <h3>Upward mobility</h3>
                <MultiLineChart style="text-align:center" :filterCountry="{}" :filterDeveloperType="{}"/>
              </v-card-text>
            </v-card>
          </v-col>
          </v-row>
          <v-col  cols="6">
            <v-card  class="filter-section-card" outlined>
            </v-card>
          </v-col>
          <v-col  cols="6">
            <v-card  class="filter-section-card" outlined>
            </v-card>
          </v-col>
          <v-row>
          </v-row>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import InfoCards from '../base/InfoCards.vue';
import RadarChart from '../diagrams/RadarChart.vue';
import MultiLineChart from '../diagrams/MultiLineChart.vue';

export default {
  components: {
    InfoCards,
    RadarChart,
    MultiLineChart,
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

.filter-section-card{
  border-radius:0px;
  color:#333;
}

.filter-card-text{
    padding:0.5rem;
}
</style>
