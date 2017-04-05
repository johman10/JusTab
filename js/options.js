import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import store from 'store/index';
import { mapActions } from 'vuex';

import ripple from 'modules/ripple';

import vOptions from 'options/v-options';
import vOptionsGoogleCalendar from 'options/v-options-google-calendar';
import vOptionsGmail from 'options/v-options-gmail';
import vOptionsCouchPotato from 'options/v-options-couch-potato';
import vOptionsDesignerNews from 'options/v-options-designer-news';
import vOptionsHackerNews from 'options/v-options-hacker-news';
import vOptionsGithub from 'options/v-options-github';
import vOptionsProductHunt from 'options/v-options-product-hunt';
import vOptionsDribbble from 'options/v-options-dribbble';
import vOptionsReddit from 'options/v-options-reddit';
import vOptionsNzbget from 'options/v-options-nzbget';
import vOptionsSonarr from 'options/v-options-sonarr';
import vOptionsSupport from 'options/v-options-support';

Vue.use(Vuex);
Vue.mixin(ripple);
Vue.mixin({
  methods: {
    ...mapActions([
      'updateServiceSettings',
      'reloadService'
    ]),
    saveData (serviceId, key, value) {
      let changes = {};
      changes[key] = value;
      this.updateServiceSettings({ serviceId, changes });
      this.reloadService({ serviceId });
    }
  }
});
Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/googlecalendar' },
  { path: '/googlecalendar', component: vOptionsGoogleCalendar },
  { path: '/gmail', component: vOptionsGmail },
  { path: '/couchpotato', component: vOptionsCouchPotato },
  { path: '/designernews', component: vOptionsDesignerNews },
  { path: '/hackernews', component: vOptionsHackerNews },
  { path: '/github', component: vOptionsGithub },
  { path: '/producthunt', component: vOptionsProductHunt },
  { path: '/dribbble', component: vOptionsDribbble },
  { path: '/reddit', component: vOptionsReddit },
  { path: '/nzbget', component: vOptionsNzbget },
  { path: '/sonarr', component: vOptionsSonarr },
  { path: '/support', component: vOptionsSupport }
];

const router = new VueRouter({
  routes
});

new Vue({
  el: '.options',
  store,
  router,
  beforeCreate () {
    this.$store.dispatch('loadServices');
  },
  render: h => h(vOptions)
});
