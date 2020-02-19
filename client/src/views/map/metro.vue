<template lang="pug">
  div
    custom-map-marker(
      v-for="(marker, index) in markers"
      :key="index"
      :position="marker.position"
      class="metro marker"
      @click="center = marker.position"
    )
      router-link(to="/")
        span(v-text="marker.id")
</template>

<script>
  import { TrainPositionService } from '@/services/metro';

  import metroStations from '@/data/metro/stations';

  import CustomMapMarker from '@/components/map/custom-marker';

  const interpolatePositions = (start, end, progress) => ({
    latitude: start.latitude + (end.latitude - start.latitude) * progress,
    longitude: start.longitude + (end.longitude - start.longitude) * progress
  });

  const extractAngle = (start, end) =>
    Math.atan2(end.latitude - start.latitude, end.longitude - start.longitude);

  // const convertPosition = ({ latitude: lat, longitude: lng }) => ({ lat, lng });

  const extractMarkersFromTrains = trains =>
    trains.map(train => {
      const [startStationId, endStationId] = train.position.stations;
      const progress = train.position.progress;
      const startStation = metroStations.find(
        ({ id }) => startStationId === id
      );
      const endStation = metroStations.find(({ id }) => endStationId === id);
      const position = interpolatePositions(startStation, endStation, progress);
      const direction = extractAngle(startStation, endStation);
      return {
        ...train,
        position,
        direction,
        name: train.id,
        type: 'metro'
      };
    });

  export default {
    data: () => ({
      trains: []
    }),
    computed: {
      markers() {
        const { trains } = this;
        return [...extractMarkersFromTrains(trains)];
      }
    },
    created() {
      this.trainPositionListener = new TrainPositionService(this.updateTrains);
    },
    destroyed() {
      this.vehiclePositionListener.destroy();
    },
    methods: {
      updateTrains(trains) {
        this.trains = [...TrainPositionService.parse(trains)];
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
      background-color: hsl(185, 12%, 85%);
      border: 2px solid hsl(185, 12%, 65%);
      font-weight: bold;
      border-radius: 0.25em;
      border-top-right-radius: 1em;
      border-top-left-radius: 1em;
    }
  }
</style>
