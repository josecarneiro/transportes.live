export const add = (state, data) => {
  state.list.push(data);
};

export const remove = (state, id) => {
  const index = state.list.findIndex(item => item.id === id);
  state.list.splice(index, 1);
};
