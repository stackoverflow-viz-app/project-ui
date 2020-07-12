<template>
     <v-container>
      <v-toolbar-title>Youtube Video</v-toolbar-title>
      <v-divider/>
       <v-layout
         align-center
         justify-space-around
         wrap pt-10
       >
         <youtube :video-id="videoId"
                  :player-vars="playerVars"
                  @playing="playing"/>
       </v-layout>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      videoId: 'wSOmzuOE2eA',
      playerVars: {
        autoplay: 0,
      },
    };
  },
  mounted() {
  },
  methods: {
    playing() {
    },
  },
};
</script>
