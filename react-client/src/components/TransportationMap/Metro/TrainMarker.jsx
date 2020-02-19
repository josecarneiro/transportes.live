import React from 'react';
import './TrainMarker.scss';

const radToDeg = value => (360 * value) / (2 * Math.PI);

export default ({ name, direction = 0 }) => (
  <div className="marker__inner--metro" style={{ transform: `rotate(${radToDeg(direction)}deg)` }}>
    {name}
  </div>
);
