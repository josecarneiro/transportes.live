const calculateBearing = (
  { latitude: latitudeStart, longitude: longitudeStart },
  { latitude: latitudeEnd, longitude: longitudeEnd }
) => {
  let longitudeDelta = (longitudeEnd - longitudeStart) * (Math.PI / 180);

  let latitudeDelta = Math.log(
    Math.tan(((latitudeEnd * Math.PI) / 180 + Math.PI / 2) / 2) /
      Math.tan(((latitudeStart * Math.PI) / 180 + Math.PI / 2) / 2)
  );

  if (Math.abs(longitudeDelta) > Math.PI) {
    longitudeDelta =
      longitudeDelta > 0
        ? -(2 * Math.PI - longitudeDelta)
        : 2 * Math.PI + longitudeDelta;
  }

  return (
    (Math.atan2(longitudeDelta, latitudeDelta) + Math.PI * 2) % (Math.PI * 2)
  );
};

module.exports = calculateBearing;
