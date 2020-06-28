<template>
    <v-container>
    <v-toolbar-title>Our Team</v-toolbar-title>
    <v-divider/>

    <div class="card-container">
      <Card v-for="item in items"
                :key="item.title"
                :name="item.name"
                :imageName="item.imageName"
                :description="item.description"
                :github="item.github"
                :linkedin="item.linkedin" />
    </div>
    </v-container>
</template>

<script>
import Card from '../base/Card.vue';

export default {
  components: {
    Card,
  },
  data() {
    return {
      items: [{
        name: 'Nikolas Bompetsis',
        imageName: 'nbob.jpeg',
        description: 'Super nerd who loves Vim, Linux/OS X, new technologies and to be involved in Open-Source projects.',
        github: 'https://github.com/nbompetsis',
        linkedin: 'https://linkedin.com/in/nikolas-bompetsis-b883b869',
      }, {
        name: 'Arianna Triantafyllou',
        imageName: 'ariannatr.jpg',
        description: "Software engineer with a Bachelor's degree focused in Computer Science, currently doing my master in Data, Information and Knowledge Management. Excited by solving problems, learning new things and facing challenges.",
        github: 'https://github.com/ariannatr',
        linkedin: 'https://gr.linkedin.com/in/arianna-triantafyllou',
      }, {
        name: 'Omiros Tsintilas',
        imageName: 'nbob.jpeg',
        description: 'Description here',
        github: 'https://github.com/nbompetsis',
        linkedin: 'https://linkedin.com/in/nikolas-bompetsis-b883b869',
      },
      ],
    };
  },
  mounted() {
  },
};
</script>
<style scoped>
.card-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-flow: center;
  justify-content: center;
  margin: 10px;
  padding: 5px;
}
</style>
