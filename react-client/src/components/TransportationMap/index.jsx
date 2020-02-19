import React, { useState, useEffect, Fragment } from 'react';
import BasicMap from './../BasicMap';
import BasicMapMarker from './../BasicMap/Marker';
import BasicMapPolyline from './../BasicMap/Polyline';

import LINE_DATA from './../../data/metro-lines';
// import METRO_POSITIONS from './../../data/metro-positions';

import { listenToPositionUpdates as listenToMetroTrainPositionUpdates } from './../../services/metro';
import { listenToPositionUpdates as listenToCarrisVehiclePositionUpdates } from './../../services/carris';

import MetroTrainMarker from './Metro/TrainMarker';
import CarrisVehicleMarker from './Carris/VehicleMarker';

const DEFAULT_CENTER = [38.7262929, -9.1447389];

const DEFAULT_ZOOM = 14;

const LINE_COLOR_MAP = {
  azul: '#2F7DE1',
  vermelha: '#EA1D76',
  amarela: '#F7A800',
  verde: '#00A19B'
};

const interpolatePositions = (start, end, progress) => ({
  latitude: start.latitude + (end.latitude - start.latitude) * progress,
  longitude: start.longitude + (end.longitude - start.longitude) * progress
});

const extractAngle = (start, end) =>
  Math.atan2(end.latitude - start.latitude, end.longitude - start.longitude);

const TransportationMap = props => {
  const [trainPositions, changeTrainPositions] = useState([]);
  const [vehiclePositions, changeVehiclePositions] = useState([]);

  useEffect(() => {
    listenToMetroTrainPositionUpdates(data => {
      changeTrainPositions(data);
    });
    listenToCarrisVehiclePositionUpdates(data => {
      changeVehiclePositions(data);
    });
  }, []);

  const lines = LINE_DATA;

  const metroLinePolygons = lines.map(({ id, stations }) => ({
    id,
    markers: stations.map(({ latitude: lat, longitude: lng }) => ({
      lat,
      lng
    })),
    style: {
      color: LINE_COLOR_MAP[id]
    }
  }));

  const metroStations = lines
    .map(({ stations }) => stations)
    .reduce((acc, value) => [...acc, ...value], []);

  const metroStationMarkers = metroStations.map(({ id, name, latitude, longitude }) => ({
    id,
    text: name,
    position: {
      latitude: latitude,
      longitude: longitude
    },
    style: {
      // color: LINE_COLOR_MAP
      color: 'grey'
    }
  }));

  const metroTrainPositionMarkers = trainPositions.map(train => {
    const [startStationId, endStationId] = train.position.stations;
    const progress = train.position.progress;
    const startStation = metroStations.find(({ id }) => startStationId === id);
    const endStation = metroStations.find(({ id }) => endStationId === id);
    const position = interpolatePositions(startStation, endStation, progress);
    const direction = extractAngle(startStation, endStation);
    return {
      ...train,
      position,
      direction,
      name: train.id
    };
  });

  const carrisVehicleMarkers = vehiclePositions.map(({ routeNumber: route, ...vehicle }) => ({
    ...vehicle,
    route
  }));

  // console.log(metroTrainPositions);
  // const markers = metroTrainPositions;

  const polylines = metroLinePolygons;

  // changeTrainPositions(METRO_POSITIONS);

  return (
    <BasicMap options={props.options} center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM}>
      {metroStationMarkers.map(marker => (
        <BasicMapMarker
          key={marker.id}
          lat={marker.position.latitude}
          lng={marker.position.longitude}
          {...marker}
        />
      ))}
      {metroTrainPositionMarkers.map(marker => (
        <BasicMapMarker
          key={marker.id}
          lat={marker.position.latitude}
          lng={marker.position.longitude}
          {...marker}
        >
          <MetroTrainMarker {...marker} />
        </BasicMapMarker>
      ))}
      {carrisVehicleMarkers.map(marker => (
        <BasicMapMarker
          key={marker.id}
          lat={marker.position.latitude}
          lng={marker.position.longitude}
          {...marker}
        >
          <CarrisVehicleMarker {...marker} />
        </BasicMapMarker>
      ))}
      {polylines.map(line => (
        <BasicMapPolyline key={line.id} markers={line.markers} style={line.style} {...line} />
      ))}
    </BasicMap>
  );
};

export default TransportationMap;
