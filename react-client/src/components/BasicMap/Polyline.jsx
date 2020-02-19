import 'react';

const Polyline = props => {
  const {
    markers,
    map,
    maps,
    options: { geodesic = true } = {},
    style: { color = '#00a1e1', opacity = 1, weight = 8 } = {}
  } = props;

  let polyline = new maps.Polyline({
    path: markers,
    geodesic: !!geodesic,
    strokeColor: color,
    strokeOpacity: opacity,
    strokeWeight: weight
  });
  polyline.setMap(map);

  const innerLine = new maps.Polyline({
    path: markers,
    geodesic: !!geodesic,
    strokeColor: '#fff',
    strokeOpacity: opacity,
    strokeWeight: weight / 2
  });
  innerLine.setMap(map);
  return null;
};

export default Polyline;
