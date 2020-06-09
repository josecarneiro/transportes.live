const loadLocation = () =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(({ coords }) => resolve(coords), reject)
  );

export default loadLocation;
