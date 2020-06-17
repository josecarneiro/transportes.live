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
      v-for="(location, id) in trains"
      :key="id",
      v-bind="{ id, location }"
    )
</template>

<script>
  import {
    TrainPositionService,
    loadInfrastructure
  } from '@/providers/metro/services';

  import MetroStation from '@/providers/metro/components/station';
  import MetroLine from '@/providers/metro/components/line';
  import MetroTrain from '@/providers/metro/components/train';

  export default {
    data: () => ({
      service: null,
      trains: {},
      stations: {},
      lines: {}
    }),
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
        this.trains = Object.assign({}, this.trains, trains);
      },
      async loadData() {
        const { lines, stations } = await loadInfrastructure();
        this.lines = Object.assign({}, this.lines, lines);
        this.stations = Object.assign({}, this.stations, stations);
      }
    },
    components: {
      MetroTrain,
      MetroStation,
      MetroLine
    }
  };
</script>
