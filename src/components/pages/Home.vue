<template>
  <v-container>
    <div class="title">
      <h2>Data analysis and Visualization</h2>
      <v-divider/>
    </div>
    <blockquote class="blockquote paragraph">
      The motivation behind this analysis is to gain more insights about
      Developer preferences and roles based on StackOverflow annual survey.
      In addition, one of the project's aims is to address
      the characteristics by survey's categories and visualize the derived key results.
    </blockquote>
    <v-layout justify-center>
      <v-card-actions>
        <v-btn to="dashboards" primary>
          <span>Go to Dashboards</span>
        </v-btn>
      </v-card-actions>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  mounted() {
  },
};
</script>
<style scoped>
.title > h2{
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  font-weight: 300;
  line-height: 1.5em;
  text-align: justify;
}

.paragraph {
   text-align: justify;
   padding-right: 24px;
}

</style>
