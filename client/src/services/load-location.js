export default () =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(position => {
      const {
        coords: { accuracy, latitude, longitude },
        timestamp
      } = position;
      resolve({
        coordinates: { latitude, longitude },
        metadata: { timestamp, accuracy }
      });
    }, reject)
  );
