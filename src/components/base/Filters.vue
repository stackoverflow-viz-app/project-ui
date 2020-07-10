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
          v-model="syncCountries"
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
          v-model="syncDevTypes"
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
  props: ['countries', 'devTypes', 'selectedCountries', 'selectedDevTypes'],
  computed:{
    syncCountries: {
      get() {
        return this.selectedCountries;
      },
      set(value) {
        this.$emit('update:selectedCountries', value);
      },
    },
    syncDevTypes: {
      get() {
        return this.selectedDevTypes;
      },
      set(value) {
        this.$emit('update:selectedDevTypes', value);
      },
    },
  },
  data() {
    return {
    };
  },
};
</script>
<style scoped>
</style>
