<template lang="pug">
  custom-map-marker.metro.marker(v-bind="{ position }")
    router-link(:to="{ name: 'metro/map' }", v-bind="{ style }")
      span(v-text="id")
</template>

<script>
  import { stations as metroStations, lines as metroLines } from '@/data/metro';

  import CustomMapMarker from '@/components/map/custom-marker';

  import extractAngle from './calculate-bearing';

  const interpolatePositions = (start, end, progress) => ({
    latitude: start.latitude + (end.latitude - start.latitude) * progress,
    longitude: start.longitude + (end.longitude - start.longitude) * progress
  });

  const limit = (value, min, max) => Math.max(Math.min(value, max), min);

  const convertRadiansToDegrees = angle =>
    ((angle / (Math.PI * 2)) * 360 + 360) % 360;

  export default {
    props: {
      id: String,
      location: Array
    },
    computed: {
      position() {
        const [
          { station: startStationId, time: startDate },
          { station: endStationId, time: endDate }
        ] = this.location;
        const startStation = metroStations.find(
          station => startStationId === station.id
        );
        const endStation = metroStations.find(
          station => endStationId === station.id
        );
        const now = new Date();
        const progress = limit((endDate - now) / (endDate - startDate), 0, 1);
        const position = interpolatePositions(
          startStation.position,
          endStation.position,
          progress
        );
        return position;
      },
      direction() {
        const [
          { station: startStationId },
          { station: endStationId }
        ] = this.location;
        const startStation = metroStations.find(
          station => startStationId === station.id
        );
        const endStation = metroStations.find(
          station => endStationId === station.id
        );
        const direction = extractAngle(
          startStation.position,
          endStation.position
        );
        return direction;
      },
      style() {
        // const direction = convertRadiansToDegrees(this.direction);
        // return { transform: `rotate(${direction.toFixed(0)}deg)` };
        return {};
      }
    },
    components: {
      CustomMapMarker
    }
  };
</script>

<style lang="scss">
  .metro {
    a {
      $scale: 1.5;
      width: $scale * 0.65rem;
      height: $scale * 1.75rem;
      // background-color: orange;
      background-color: grey(0.95);
      border: 2px solid grey(0.7);
      font-weight: bold;
      // border-radius: 0.25em;
      border-radius: 0.25em;
      // border-top-right-radius: 1em;
      // border-top-left-radius: 1em;
      span {
        // font-size: 8 / 16 * 1em;
        // font-size: 8 / 16 * 1rem;
        font-size: 0.5rem;
      }
    }
  }
</style>
