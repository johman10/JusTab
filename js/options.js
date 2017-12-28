import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import store from 'store/index';
import { mapActions } from 'vuex';

import ripple from 'modules/ripple';
import dynamicImportComponent from 'modules/dynamic-import-component';

const vOptions = dynamicImportComponent('options/v-options');
const vOptionsGoogleCalendar = dynamicImportComponent('options/v-options-google-calendar');
const vOptionsGmail = dynamicImportComponent('options/v-options-gmail');
const vOptionsCouchPotato = dynamicImportComponent('options/v-options-couch-potato');
const vOptionsDesignerNews = dynamicImportComponent('options/v-options-designer-news');
const vOptionsHackerNews = dynamicImportComponent('options/v-options-hacker-news');
const vOptionsGithub = dynamicImportComponent('options/v-options-github');
const vOptionsProductHunt = dynamicImportComponent('options/v-options-product-hunt');
const vOptionsDribbble = dynamicImportComponent('options/v-options-dribbble');
const vOptionsReddit = dynamicImportComponent('options/v-options-reddit');
const vOptionsNzbget = dynamicImportComponent('options/v-options-nzbget');
const vOptionsSonarr = dynamicImportComponent('options/v-options-sonarr');
const vOptionsTransmission = dynamicImportComponent('options/v-options-transmission');
const vOptionsBookmarks = dynamicImportComponent('options/v-options-bookmarks');
const vOptionsSupport = dynamicImportComponent('options/v-options-support');

Vue.use(Vuex);
Vue.mixin(ripple);
Vue.mixin({
  methods: {
    ...mapActions([
      'updateServiceSettings',
      'reloadService'
    ]),
    saveData (serviceId, key, value) {
      this.updateServiceSettings({
        serviceId,
        changes: {
          [key]: value
        }
      });
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
  { path: '/transmission', component: vOptionsTransmission },
  { path: '/bookmarks', component: vOptionsBookmarks },
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
