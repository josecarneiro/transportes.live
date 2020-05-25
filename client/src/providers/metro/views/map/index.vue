<template lang="pug">
  div
    metro-infrastructure-layer
    metro-train(
      v-for="(train, index) in markers"
      :key="index",
      v-bind="{ ...train }"
    )
</template>

<script>
  import { TrainPositionService } from '@/providers/metro/services';

  import metroStations from '@/data/metro/stations';

  import MetroInfrastructureLayer from './infrastructure-layer';
  import MetroTrain from '@/providers/metro/components/train';

  const interpolatePositions = (start, end, progress) => ({
    latitude: start.latitude + (end.latitude - start.latitude) * progress,
    longitude: start.longitude + (end.longitude - start.longitude) * progress
  });

  const extractAngle = (start, end) =>
    Math.atan2(end.latitude - start.latitude, end.longitude - start.longitude);

  // const convertPosition = ({ latitude: lat, longitude: lng }) => ({ lat, lng });

  const extractMarkersFromTrains = (trains) =>
    trains.map((train) => {
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
        name: train.id
        // type: 'metro'
      };
    });

  export default {
    data: () => ({
      service: null,
      trains: []
    }),
    computed: {
      markers() {
        const { trains } = this;
        return [...extractMarkersFromTrains(trains)];
      }
    },
    created() {
      this.service = new TrainPositionService(this.updateTrains);
      this.service.listen();
    },
    destroyed() {
      if (this.service) this.service.destroy();
    },
    methods: {
      updateTrains(trains) {
        this.trains = [...TrainPositionService.parse(trains)];
      }
    },
    components: {
      MetroInfrastructureLayer,
      MetroTrain
    }
  };
</script>
