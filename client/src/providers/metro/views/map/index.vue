<template lang="pug">
  div
    metro-line(
      v-for="line in lines"
      :key="line.id"
      v-bind="{ ...line }"
    )
    metro-station(
      v-for="station in stations"
      :key="station.id"
      v-bind="{ ...station }"
    )
    metro-train(
      v-for="(train, index) in markers"
      :key="index",
      v-bind="{ ...train }"
    )
</template>

<script>
  import {
    TrainPositionService,
    loadInfrastructure
  } from '@/providers/metro/services';

  import metroStations from '@/data/metro/stations';

  import MetroStation from '@/providers/metro/components/station';
  import MetroLine from '@/providers/metro/components/line';
  import MetroTrain from '@/providers/metro/components/train';

  const interpolatePositions = (start, end, progress) => ({
    latitude: start.latitude + (end.latitude - start.latitude) * progress,
    longitude: start.longitude + (end.longitude - start.longitude) * progress
  });

  const extractAngle = (start, end) =>
    Math.atan2(end.latitude - start.latitude, end.longitude - start.longitude);

  // const convertPosition = ({ latitude: lat, longitude: lng }) => ({ lat, lng });

  const extractMarkersFromTrains = trains =>
    trains.map(({ id, ...train }) => {
      const [startStationId, endStationId] = train.position.stations;
      const progress = train.position.progress;
      const startStation = metroStations.find(
        station => startStationId === station.id
      );
      const endStation = metroStations.find(
        station => endStationId === station.id
      );
      const position = interpolatePositions(startStation, endStation, progress);
      const direction = extractAngle(startStation, endStation);
      return {
        id,
        position,
        direction
      };
    });

  export default {
    data: () => ({
      service: null,
      trains: [],
      stations: {},
      lines: {}
    }),
    computed: {
      markers() {
        const { trains } = this;
        const markers = extractMarkersFromTrains(trains);
        return markers;
      }
    },
    created() {
      this.loadData();
      this.service = new TrainPositionService(this.updateTrains);
      this.service.listen();
    },
    destroyed() {
      if (this.service) this.service.destroy();
    },
    methods: {
      updateTrains(trains) {
        if (trains) {
          this.trains = [...TrainPositionService.parse(trains)];
        }
      },
      async loadData() {
        const { lines, stations } = await loadInfrastructure();
        this.lines = Object.assign(this.lines, {}, lines);
        this.stations = Object.assign(this.stations, {}, stations);
      }
    },
    components: {
      MetroTrain,
      MetroStation,
      MetroLine
    }
  };
</script>
