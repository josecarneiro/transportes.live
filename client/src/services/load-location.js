const getCurrentPosition = options =>
  new Promise((resolve, reject) =>
    window.navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );

export default async ({ timeout, maximumAge = 5 * 60 * 1000 } = {}) => {
  const position = await getCurrentPosition({
    maximumAge,
    timeout
  });
  const {
    coords: { accuracy, latitude, longitude },
    timestamp
  } = position;
  return {
    coordinates: { latitude, longitude },
    metadata: { timestamp, accuracy }
  };
};
