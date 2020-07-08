/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/pages/Home.vue';
import About from '../components/pages/About.vue';
import Youtube from '../components/pages/Youtube.vue';
import Dashboards from '../components/pages/Dashboards.vue';
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
    meta: {
      title: 'Home Page - Example App',
    },
  },
  {
    path: '/dashboards',
    name: 'Dashboards',
    component: Dashboards,
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
