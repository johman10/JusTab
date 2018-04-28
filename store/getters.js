export const activeServices = (state, getters) => {
  return getters.sortedServices.filter(service => service && service.active);
};

export const sortedServices = (state) => {
  if (!state.services.length) return [];
  const serviceOrder = localStorage.getItem('serviceOrder');
  if (!serviceOrder) return state.services;
  let sortedIds = serviceOrder.split(',').map(id => parseInt(id));
  if (sortedIds.length < state.services.length) {
    const servicesIds = state.services.map(service => service.id);
    const missingIds = servicesIds.filter(i => sortedIds.indexOf(i) < 0);
    sortedIds = sortedIds.concat(missingIds);
  }
  const sortedServices = sortedIds.map((id) => {
    return state.services.find(service => service.id === parseInt(id));
  });

  return sortedServices.filter(service => !!service);
};
