<template>
  <v-app>
  <SideBar/>
  </v-app>
</template>

<script>
import SideBar from './components/SideBar.vue';

export default {
  name: 'App',

  components: {
    SideBar,
  },

  data: () => ({
    //
  }),
};
</script>
