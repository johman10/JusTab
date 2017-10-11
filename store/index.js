import Vue from 'vue';
import Vuex from 'vuex';
import mutations from 'store/mutations';
import * as getters from 'store/getters';
import * as actions from 'store/actions';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

// the root, initial state object
const state = {
  chromeStorage: [],
  services: [],
  // Not used but needed to be able to listen to and send messages
  chromePort: chrome.runtime.connect()
};

// create the Vuex instance by combining the state and mutations objects
// then export the Vuex store for use by our components
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  plugins: [
    process.env.NODE_ENV === 'development' ? createLogger() : function () {}
  ],
  strict: process.env.NODE_ENV === 'development'
});
