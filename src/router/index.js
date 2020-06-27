import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/pages/Home.vue';
import About from '../components/pages/About.vue';
import Youtube from '../components/pages/Youtube.vue';
import Dashboards from '../components/pages/Dashboards.vue';
import DeveloperDashboard from '../components/pages/DeveloperDashboard.vue';

import NotFound from '../components/pages/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboards',
    name: 'Dashboards',
    component: Dashboards,
  },
  {
    path: '/developers',
    name: 'DeveloperDashboard',
    component: DeveloperDashboard,
  },
  {
    path: '/youtube',
    name: 'Youtube',
    component: Youtube,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
