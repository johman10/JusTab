export const activeServices = (state, getters) => {
  return getters.sortedServices.filter(service => service.active);
};

export const sortedServices = (state) => {
  if (!state.services.length) return [];
  var order = localStorage.getItem('serviceOrder').split(',');
  var serviceIds = state.services.map(service => service.id);
  var sortedServices = [];
  order.forEach((id) => {
    id = parseInt(id);
    sortedServices.push(state.services[serviceIds.indexOf(id)]);
  });
  return sortedServices;
};
