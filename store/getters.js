export const activeServices = (state, getters) => {
  return getters.sortedServices.filter(service => service.active);
};

export const sortedServices = (state) => {
  if (!state.services.length) return [];
  var serviceOrder = localStorage.getItem('serviceOrder');
  if (!serviceOrder) return state.services;
  var serviceIds = state.services.map(service => service.id);
  var sortedServices = [];
  var order = localStorage.getItem('serviceOrder').split(',');
  order.forEach((id) => {
    id = parseInt(id);
    sortedServices.push(state.services[serviceIds.indexOf(id)]);
  });
  return sortedServices;
};
