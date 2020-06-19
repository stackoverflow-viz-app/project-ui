<template>
 <v-app>
    <v-navigation-drawer
          v-model="drawer"
          :color="color"
          :expand-on-hover="expandOnHover"
          :mini-variant="miniVariant"
          :right="right"
          :permanent="permanent"
          :src="bg"
          absolute
          dark
    >

    <v-list
        dense
        nav
        class="py-0"
        >

        <v-list-item two-line :class="miniVariant && 'px-0'">
            <v-list-item-content>
            <v-list-item-title>Stack Overflow Insights</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
        >
            <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
    </v-navigation-drawer>
    <!-- Add footer -->
    </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },
  data() {
    return {
      drawer: true,
      items: [
        { title: 'Dashboards', icon: 'mdi-view-dashboard' },
        { title: 'About Team', icon: 'mdi-account' },
        { title: 'Youtube channel', icon: 'mdi-youtube' },
      ],
      color: 'primary',
      colors: [
        'primary',
        'blue',
        'success',
        'red',
        'teal',
      ],
      right: false,
      permanent: true,
      miniVariant: false,
      expandOnHover: false,
      background: false,
    };
  },
};
</script>

<style>
</style>
