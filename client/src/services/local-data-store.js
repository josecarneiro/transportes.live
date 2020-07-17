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
  storage.removeItem(collection);
};

export const clearAll = () => {
  storage.clear();
};

// class Reference {
//   constructor(key) {
//     this.key = key;
//   }

//   save(data) {
//     save(this.key, data);
//   }

//   load() {
//     return load(this.key);
//   }

//   clear() {
//     clear(this.key);
//   }
// }
