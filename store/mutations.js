// define the possible changes that can be applied to our state
import * as types from '~store/mutation-types';

export default {
  [types.LOAD_SERVICES] (state, { services }) {
    state.services = services;
  },

  [types.RELOAD_SERVICE] (state, { service }) {
    const serviceIds = state.services.map((s) => { return s.id; });
    const serviceIndex = serviceIds.indexOf(service.id);
    Object.assign(state.services[serviceIndex], service);
  }
};
