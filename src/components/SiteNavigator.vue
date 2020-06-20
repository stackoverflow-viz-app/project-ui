<template>
 <v-app id="inspire">
    <div>
      <v-app-bar
        :color="color" dense dark>

        <v-app-bar-nav-icon @click.stop="toggleNavigation"></v-app-bar-nav-icon>
        <v-toolbar-title>Stack Overflow Insights</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
    </div>
    <v-navigation-drawer
          v-model="drawer" :color="color" temporary dark>

    <v-list
        dense nav class="py-0">

        <v-list-item :class="miniVariant && 'px-0'">
            <v-list-item-content>
            <v-list-item-title>Menu</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
            v-for="item in items"
            :key="item.title"
            link>

            <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
    </v-navigation-drawer>
    </v-app>
</template>

<script>

export default {
  name: 'SideBar',

  components: {
  },

  data() {
    return {
      items: [
        { title: 'Home', icon: 'mdi-home' },
        { title: 'Dashboards', icon: 'mdi-view-dashboard' },
        { title: 'About Team', icon: 'mdi-account' },
        { title: 'Youtube channel', icon: 'mdi-youtube' },
      ],
      color: 'blue darken-4',
      drawer: false,
    };
  },
  methods: {
    toggleNavigation() {
      this.drawer = !this.drawer;
    },
  },
};
</script>

<style>
</style>
