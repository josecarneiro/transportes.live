// const extractAngle = (start, end) =>
// Math.atan2(end.latitude - start.latitude, end.longitude - start.longitude);

const calculate = (startLat, startLng, destLat, destLng) => {
  const y = Math.sin(destLng - startLng) * Math.cos(destLat);
  const x =
    Math.cos(startLat) * Math.sin(destLat) -
    Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
  const bearing = Math.atan2(y, x);
  return (bearing + Math.PI * 2) % (Math.PI * 2);
};

const extractAngle = (
  { latitude: startLat, longitude: startLong },
  { latitude: endLat, longitude: endLong }
) => calculate(startLat, startLong, endLat, endLong);

// const extractAngle = (
//   { latitude: startLat, longitude: startLong },
//   { latitude: endLat, longitude: endLong }
// ) =>
//   Math.atan2(
//     Math.sin(endLong - startLong) * Math.cos(endLat),
//     Math.cos(startLat) * Math.sin(endLat) -
//       Math.sin(startLat) * Math.cos(endLat) * Math.cos(endLong - startLong)
//   );

export default extractAngle;
