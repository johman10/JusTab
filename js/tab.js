import Vue from 'vue';
import Vuex from 'vuex';
import vTab from 'components/v-tab.vue';
import VueLazyload from 'vue-lazyload';
import store from 'store/index';
import { mapState, mapGetters, mapActions } from 'vuex';

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
    chrome.runtime.onMessage.addListener((message) => {
      if (message.name === 'finishRefresh') {
        this.reloadService({ serviceId: message.serviceId });
      }
    });
  },
  methods: {
    ...mapActions(['reloadService'])
  },
  computed: {
    ...mapState(['chromePort'])
  },
  render: h => h(vTab)
});
