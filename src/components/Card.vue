<template>
    <v-card
      max-width="344"
      class="mx-auto"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline title-center"> {{name}} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-layout
        align-center
        justify-space-around
        wrap
      >
      <v-avatar size="200">
        <v-img
          :src="require('@/assets/' + imageName + '')"
          class="img-profile"
        ></v-img>
      </v-avatar>
      </v-layout>
      <v-card-text>
        {{description}}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon :href="github">
          <v-icon>mdi-github</v-icon>
        </v-btn>
        <v-btn icon :href="linkedin">
          <v-icon>mdi-linkedin</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
export default {
  props: ['name', 'imageName', 'description', 'github', 'linkedin'],
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
  },
};
</script>
<style scoped>
.title-center{
    justify-content: center;
    flex-direction: row;
    text-align: center;
    align-items: center;
}
</style>
