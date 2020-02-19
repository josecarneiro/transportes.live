import React from 'react';
import './VehicleMarker.scss';

const radToDeg = value => (360 * value) / (2 * Math.PI);

export default ({ route, direction = 0 }) => (
  <div
    className="marker__inner--carris-vehicle"
    style={{ transform: `rotate(${radToDeg(direction)}deg)` }}
  >
    {route}
  </div>
);
