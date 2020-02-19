import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import Marker from './Marker';
import Polyline from './Polyline';

class BasicMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapsLoaded: false,
      map: null,
      maps: null
    };
  }

  onMapLoaded(map, maps) {
    console.log('MAP LOADED');
    this.setState({
      ...this.state,
      mapsLoaded: true,
      map,
      maps
    });
  }

  afterMapLoadChanges() {
    const props = this.props;
    const { map, maps } = this.state;
    return (
      <div style={{ display: 'none' }}>
        {props.lines.map(line => (
          <Polyline map={map} maps={maps} markers={line.markers} style={line.style} />
        ))}
      </div>
    );
  }

  render() {
    const props = this.props;
    const { mapsLoaded, map, maps } = this.state;

    const mapChildData = { map, maps };

    const childrenWithProps = React.Children.map(props.children, child =>
      React.cloneElement(child, { ...mapChildData })
    );

    return (
      <GoogleMap
        bootstrapURLKeys={{ key: props.options.key }}
        style={{ height: '100vh', width: '100%' }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
        onGoogleApiLoaded={({ map: mapInstance, maps: mapInstances }) =>
          this.onMapLoaded(mapInstance, mapInstances)
        }
      >
        {mapsLoaded ? childrenWithProps : ''}
        {/* {mapsLoaded ? () => props.children : ''} */}
      </GoogleMap>
    );
  }
}

export default BasicMap;
