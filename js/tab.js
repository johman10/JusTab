import Vue from 'vue';
import Vuex from 'vuex';
import vTab from 'components/v-tab.vue';
import VueLazyload from 'vue-lazyload';
import store from 'store/index';
import { mapActions } from 'vuex';

import ripple from 'modules/ripple';

Vue.mixin(ripple);
Vue.use(VueLazyload, {
  error: require('img/poster_fallback.png'),
  loading: require('img/poster_fallback.png'),
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
      if (message.name === 'finishRefresh' || message.name === 'reloadService') {
        this.reloadService({ serviceId: message.serviceId });
      } else if (message.name === 'loadServices') {
        this.loadServices();
      }
    }
  },
  render: h => h(vTab)
});

