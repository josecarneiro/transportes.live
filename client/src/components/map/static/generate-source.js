const extractStaticStyle = styles =>
  styles
    .map(({ stylers, featureType, elementType }) => {
      let style = '';
      if (stylers && stylers.length > 0) {
        style += (featureType ? 'feature:' + featureType : 'feature:all') + '|';
        style += (elementType ? 'element:' + elementType : 'element:all') + '|';
        stylers.forEach(styler => {
          const name = Object.keys(styler)[0];
          const value = styler[name].toString().replace('#', '0x');
          style += name + ':' + value + '|';
        });
      }
      return 'style=' + encodeURIComponent(style);
    })
    .join('&');

const stringifyPosition = ({ lat, lng }) => [lat, lng];

const generate = ({
  center,
  zoom = 13,
  size: [width = 1000, height = 1000] = [],
  scale,
  style,
  apiKey
}) => {
  const styleQuery = extractStaticStyle(style);
  return (
    'https://maps.googleapis.com/maps/api/staticmap?' +
    [
      'center=' + stringifyPosition(center),
      'zoom=' + zoom,
      // 'format=png',
      // 'sensor=false',
      'size=' + width + 'x' + height,
      'scale=' + scale,
      'maptype=roadmap',
      // 'markers=color:brown|Cape%20Canaveral',
      'key=' + apiKey,
      // style=feature:road.local%7Celement:geometry%7Ccolor:0x00ff00&style=feature:landscape%7Celement:geometry.fill%7Ccolor:0x000000&style=element:labels%7Cinvert_lightness:true&style=feature:road.arterial%7Celement:labels%7Cinvert_lightness:false
      styleQuery
    ].join('&')
  );
};

export default generate;
