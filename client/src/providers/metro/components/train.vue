<template lang="pug">
  custom-map-marker.train(v-bind="{ position }")
    router-link(:to="{ name: 'metro/map' }", v-bind="{ style }")
      span(v-text="id")
</template>

<script>
  import { stations } from '@/providers/metro/data';

  import CustomMapMarker from '@/components/map/custom-marker';

  import extractAngle from '@/util/calculate-bearing';

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
      stationPositions() {
        const [
          { station: startStationId },
          { station: endStationId }
        ] = this.location;
        const startStation = stations.find(({ id }) => id === startStationId);
        const endStation = stations.find(({ id }) => id === endStationId);
        return [startStation.position, endStation.position];
      },
      progress() {
        const [{ time: startDate }, { time: endDate }] = this.location;
        const now = new Date();
        return limit(1 - (endDate - now) / (endDate - startDate), 0, 1);
      },
      position() {
        const [startStation, endStation] = this.stationPositions;
        const progress = this.progress;
        const position = interpolatePositions(
          startStation,
          endStation,
          progress
        );
        return position;
      },
      direction() {
        const [startStation, endStation] = this.stationPositions;
        const direction = extractAngle(startStation, endStation);
        return direction;
      },
      style() {
        const direction = convertRadiansToDegrees(this.direction);
        // const direction = 0;
        return {
          transform: `translateY(50%) rotate(${direction.toFixed(0)}deg)`
        };
      }
    },
    components: {
      CustomMapMarker
    }
  };
</script>

<style lang="scss">
  .train {
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
