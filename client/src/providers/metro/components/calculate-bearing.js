// const extractAngle = (start, end) =>
//   Math.atan2(end.latitude - start.latitude, end.longitude - start.longitude);

const extractAngle = (
  { latitude: startLat, longitude: startLong },
  { latitude: endLat, longitude: endLong }
) => {
  const y = Math.sin(endLong - startLong) * Math.cos(endLat);
  const x =
    Math.cos(startLat) * Math.sin(endLat) -
    Math.sin(startLat) * Math.cos(endLat) * Math.cos(endLong - startLong);
  const bearing = Math.atan2(y, x);
  return (bearing + Math.PI * 2) % (Math.PI * 2);
};

export default extractAngle;
