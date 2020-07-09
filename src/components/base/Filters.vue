<template>
  <div>
    <v-card class="filter-section-card" outlined>
      <v-card-text class="filter-card-text">
        <h3>Data Filters</h3>
        <br />
        <span>Segment the Dashboard, using the filters available below.</span>
        <v-col cols="12" class="px-0">
          <v-divider />
        </v-col>
        <h4>Country</h4>
        <br />
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
        />
        <v-col cols="12" class="px-0">
          <v-divider />
        </v-col>
        <h4>Developer Type</h4>
        <br />
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
          class="filter-section-card"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['countries', 'devTypes'],
  data() {
    return {
    };
  },
};
</script>
<style scoped>
</style>
