import Vue from 'vue';
import VueYoutube from 'vue-youtube';
import vuetify from './plugins/vuetify';
import router from './router';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(VueYoutube);

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
