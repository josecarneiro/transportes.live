'use strict';

const serializeDate = date => Number(new Date(date)) / 1000;

const serializeEstimate = ({
  id: vehicle,
  plate,
  route,
  routeName,
  // destination,
  time
}) => ({
  v: vehicle,
  p: plate,
  r: route,
  n: routeName,
  // d: destination, // Not using destination at the moment
  t: serializeDate(time)
});

const serializeVehicle = ({
  id,
  active,
  direction,
  plate,
  route,
  time: { lastReport: time }
}) => ({
  id,
  a: active,
  d: direction,
  p: plate,
  r: route,
  t: serializeDate(time)
});

const serializePosition = ({
  id,
  bearing,
  position: { latitude, longitude },
  route
}) => ({
  id,
  a: Math.floor((180 * bearing) / Math.PI),
  p: [latitude, longitude],
  r: route
});

exports.serializeEstimate = serializeEstimate;
exports.serializeVehicle = serializeVehicle;
exports.serializePosition = serializePosition;
