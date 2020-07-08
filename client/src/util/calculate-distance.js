const convertDegreesToRadian = deg => deg * (Math.PI / 180);

const EARTH_RADIUS_IN_METERS = 6371 * 1000;

export default (
  { latitude: startLat, longitude: startLong },
  { latitude: endLat, longitude: endLong }
) => {
  const deltaLat = convertDegreesToRadian(endLat - startLat);
  const deltaLon = convertDegreesToRadian(endLong - startLong);
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.sin(deltaLon / 2) ** 2 *
      Math.cos(convertDegreesToRadian(startLat)) *
      Math.cos(convertDegreesToRadian(endLat));
  return (
    EARTH_RADIUS_IN_METERS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  );
};
