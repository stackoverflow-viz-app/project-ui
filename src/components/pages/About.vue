<template>
    <v-container>
    <v-header>About our Team</v-header>
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
        name: 'Nikolas Bompetsis',
        imageName: 'nbob.jpeg',
        description: 'Super nerd who loves Vim, Linux/OS X, new per nerd who loves Vim, Linux/OS X, new tper nerd who loves Vim, Linux/OS X, new tper nerd who loves Vim, Linux/OS X, new tper nerd who loves Vim, Linux/OS X, new tper nerd who loves Vim, Linux/OS X, new tper nerd who loves Vim, Linux/OS X, new tper nerd who loves Vim, Linux/OS X, new tper nerd who loves Vim, Linux/OS X, new tper nerd who loves Vim, Linux/OS X, new ttechnologies and to be involved in Open-Source projects.',
        github: 'https://github.com/nbompetsis',
        linkedin: 'https://linkedin.com/in/nikolas-bompetsis-b883b869',
      }, {
        name: 'Nikolas Bompetsis',
        imageName: 'nbob.jpeg',
        description: 'Super nerd who loves Vim, Linux/OS X, new technologies and to be involved ',
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
