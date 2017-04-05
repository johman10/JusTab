import * as types from 'store/mutation-types';
import * as serviceData from 'modules/serviceData';

// Loads all services into the state
export const loadServices = ({ commit }) => {
  var promises = serviceData.default.map((f) => { return f(); });
  Promise.all(promises).then((services) => {
    commit(types.LOAD_SERVICES, { services });
  });
};

// Refreshes that data on a service
export const reloadService = ({ state, commit }, { serviceId }) => {
  const service = state.services.find((s) => { return s.id === serviceId; });
  return serviceData[service.functionName]().then((service) => {
    commit(types.RELOAD_SERVICE, { service: service });
  });
};

// Save the changes to chrome storage
export const updateServiceSettings = ({ state, dispatch }, { serviceId, changes }) => {
  chrome.storage.sync.set(changes, () => {
    chrome.runtime.sendMessage({ name: 'afterUpdateServiceSettings', serviceId });
  });
};

