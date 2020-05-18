'use strict';

const client = require('./client');

function radians(n) {
  return n * (Math.PI / 180);
}
function degrees(n) {
  return n * (180 / Math.PI);
}

function getBearing(startLat, startLong, endLat, endLong) {
  startLat = radians(startLat);
  startLong = radians(startLong);
  endLat = radians(endLat);
  endLong = radians(endLong);

  var dLong = endLong - startLong;

  var dPhi = Math.log(
    Math.tan(endLat / 2.0 + Math.PI / 4.0) / Math.tan(startLat / 2.0 + Math.PI / 4.0)
  );
  if (Math.abs(dLong) > Math.PI) {
    if (dLong > 0.0) dLong = -(2.0 * Math.PI - dLong);
    else dLong = 2.0 * Math.PI + dLong;
  }

  return Math.atan2(dLong, dPhi);
}

const calculateBearing = (p1, p2) =>
  (getBearing(p1.latitude, p1.longitude, p2.latitude, p2.longitude) + Math.PI * 2) % (Math.PI * 2);

// const calculateBearing = (p1, p2) =>
//   (Math.atan2(p2.latitude - p1.latitude, p2.longitude - p1.longitude) + Math.PI * 2) %
//   (Math.PI * 2);

const transformVehicle = vehicle => {
  let bearing =
    vehicle.position && vehicle.previousPosition
      ? calculateBearing(vehicle.previousPosition, vehicle.position)
      : 0;
  return {
    bearing,
    ...vehicle,
  };
};

const loadVehiclePositions = async () => {
  const vehicles = await client.listVehicles();
  return vehicles.map(transformVehicle);
};

module.exports = loadVehiclePositions;
