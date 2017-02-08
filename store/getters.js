export const activeServices = (state) => {
  return state.services.filter(service => service.status);
}

export const loadingServices = (state) => {
  return state.services.filter(service => service.loading);
}
