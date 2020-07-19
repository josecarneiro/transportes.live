// import loadLocation from '@/services/load-location';
import { load as loadData, save } from '@/services/local-data-store';

const FAVORITE_LIST_STORAGE_KEY = 'favorites/list';

export const add = async ({ commit, state }, data) => {
  commit('add', data);
  const list = state.list;
  save(FAVORITE_LIST_STORAGE_KEY, list);
};

export const remove = async ({ commit, state }, data) => {
  commit('remove', data);
  const list = state.list;
  save(FAVORITE_LIST_STORAGE_KEY, list);
};

export const load = async ({ commit }) => {
  const list = loadData(FAVORITE_LIST_STORAGE_KEY);
  for (const item of list) commit('add', item);
};
