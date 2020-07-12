<template>
    <div class="card-layout">
      <v-card
        width="330"
        max-height="600"
        class="mx-auto"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline card-title">
              {{name}}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-layout
          align-center
          justify-space-around
          wrap
        >
        <v-avatar size="200">
          <v-img
            :src="require('@/assets/images/' + imageName + '')"
            class="img-profile"
          ></v-img>
        </v-avatar>
        </v-layout>
        <v-card-text class="card-desc-text">
          {{description}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon :href="github" :color="color">
            <v-icon>mdi-github</v-icon>
          </v-btn>
          <v-btn icon :href="linkedin" :color="color">
            <v-icon>mdi-linkedin</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
</template>

<script>
export default {
  props: ['name', 'imageName', 'description', 'github', 'linkedin'],
  data() {
    return {
      color: 'blue darken-4',
    };
  },
  mounted() {
  },
  methods: {
  },
};
</script>
<style scoped>
.card-layout{
  margin: 10px;
}

.card-title{
  justify-content: center;
  flex-direction: row;
  text-align: center;
  align-items: center;
  color: #01579B;
}

.card-desc-text{
  overflow-y: auto;
  height: 15vh;
}

</style>
