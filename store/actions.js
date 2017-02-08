import * as types from 'store/mutation-types'
import * as serviceData from 'modules/serviceData';

// Loads all services into the state
export const loadServices = ({ commit }) => {
  var promises = serviceData.default.map((f) => { return f() });
  Promise.all(promises).then((services) => {
    commit(types.LOAD_SERVICES, { services });
  });
}

// Reload the whole service
export const reloadService = ({ state, commit }, payload) => {
  const service = state.services.find((s) => { return s.id === payload.serviceId });
  serviceData[service.functionName]().then((service) => {
    commit(types.RELOAD_SERVICE, { service: service })
  })
}

