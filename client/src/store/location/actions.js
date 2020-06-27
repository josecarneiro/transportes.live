import loadLocation from '@/services/load-location';

export const locate = async ({ commit }) => {
  const position = await loadLocation();
  commit('change', position);
};
