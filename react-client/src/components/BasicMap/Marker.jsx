import React from 'react';
import './Marker.scss';

const Marker = ({
  style: { width = '5em', color = 'grey', textColor = '#fff', padding = '0.5rem', ...style } = {},
  text,
  children
}) => (
  <div
    className="map-marker"
    style={{
      // width,
      // backgroundColor: color,
      // color: textColor,
      padding,
      transform: 'translate(-50%, -50%)',
      ...style
    }}
  >
    {text || children}
  </div>
);

export default Marker;
