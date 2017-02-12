export const activeServices = (state) => {
  return state.services.filter(service => service.active);
}

export const loadingServices = (state) => {
  return state.services.filter(service => service.loading);
}
