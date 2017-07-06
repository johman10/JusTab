import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import store from 'store/index';
import { mapActions } from 'vuex';

import ripple from 'modules/ripple';

import vOptions from 'options/v-options';
const vOptionsGoogleCalendar = () => import('options/v-options-google-calendar');
const vOptionsGmail = () => import('options/v-options-gmail');
const vOptionsCouchPotato = () => import('options/v-options-couch-potato');
const vOptionsDesignerNews = () => import('options/v-options-designer-news');
const vOptionsHackerNews = () => import('options/v-options-hacker-news');
const vOptionsGithub = () => import('options/v-options-github');
const vOptionsProductHunt = () => import('options/v-options-product-hunt');
const vOptionsDribbble = () => import('options/v-options-dribbble');
const vOptionsReddit = () => import('options/v-options-reddit');
const vOptionsNzbget = () => import('options/v-options-nzbget');
const vOptionsSonarr = () => import('options/v-options-sonarr');
const vOptionsSupport = () => import('options/v-options-support');

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
