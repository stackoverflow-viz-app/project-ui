<template>
  <div>
    <v-row>
      <v-col cols="12" lg="3" md="6" sm="6" v-for="section in items" v-bind:key="section.title">
        <StatsCard
          :color="section.color"
          :icon="section.icon"
          :title="section.title"
          :value="section.value"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import StatsCard from './StatsCard.vue';

export default {
  components: {
    StatsCard,
  },
  data() {
    return {
      items: [
        {
          color: 'info',
          icon: 'mdi-calendar',
          title: 'Reference Period',
          value: '2019-2020',
        },
        {
          color: 'primary',
          icon: 'mdi-account-group',
          title: 'Respondents',
          value: '~90.000',
        },
        {
          color: 'success',
          icon: 'mdi-earth',
          title: 'Countries Involved',
          value: '200',
        },
        {
          color: 'warning',
          icon: 'mdi-poll',
          title: "Professionals' Rate",
          value: '75%',
        },
      ],
    };
  },
};
</script>
<style scoped>
</style>
