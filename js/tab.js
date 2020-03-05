import Vue from 'vue';
import Vuex from 'vuex';
import VTab from 'components/v-tab';
import VueLazyload from 'vue-lazyload';
import store from 'store/index';
import { mapActions } from 'vuex';
import posterFallback from 'img/poster_fallback.png';

import ripple from 'modules/ripple';

Vue.mixin(ripple);
Vue.use(VueLazyload, {
  error: posterFallback,
  loading: posterFallback,
  attempt: 1
});
Vue.use(Vuex);

new Vue({
  el: '.tab',
  store,
  beforeCreate () {
    this.$store.dispatch('loadServices');
  },
  mounted () {
    chrome.runtime.onMessage.addListener(this.handleMessage);
  },
  methods: {
    ...mapActions(['reloadService', 'loadServices']),
    handleMessage (message) {
      if (message.name === 'finishRefresh' || message.name === 'reloadService' || message.name === 'afterUpdateServiceSettings') {
        this.reloadService({ serviceId: message.serviceId });
      } else if (message.name === 'loadServices') {
        this.loadServices();
      }
    }
  },
  render: h => h(VTab)
});
