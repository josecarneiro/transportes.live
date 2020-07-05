const storage = window.localStorage;

export const load = collection => {
  let data = storage.getItem(collection);
  data = JSON.parse(data);
  return data;
};

export const save = (collection, data) => {
  storage.setItem(collection, JSON.stringify(data));
};

export const clear = collection => {
  if (collection) {
    storage.removeItem(collection);
  } else {
    storage.clear();
  }
};
