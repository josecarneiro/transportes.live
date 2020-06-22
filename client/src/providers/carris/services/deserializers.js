const parseTimestamp = timestamp => new Date(timestamp * 1000);

export const deserializeVehicle = ({
  id,
  a: active,
  // d: direction,
  p: plate,
  r: route,
  t: time
}) => ({
  id,
  active,
  // direction,
  plate,
  route,
  time: parseTimestamp(time)
});

export const deserializeEstimate = ({
  v: id,
  p: plate,
  r: route,
  n: routeName,
  // d: destination,
  t: time
}) => ({
  id,
  plate,
  route,
  routeName,
  // destination,
  time: parseTimestamp(time)
});

export const deserializeVehiclePosition = ({
  r: route,
  a: angle,
  p: [latitude, longitude]
}) => ({ route, angle, position: { latitude, longitude } });
