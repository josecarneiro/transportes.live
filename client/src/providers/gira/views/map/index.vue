<template lang="pug">
  div
    map-gira-station(
      v-for="(station, id) in stations"
      :key="id"
      v-bind="{ id, ...station }"
    )
</template>

<script>
  import { StationService } from '@/providers/gira/services';

  import MapGiraStation from './../../components/station';

  export default {
    data: () => ({ stations: {} }),
    created() {
      this.listenToGiraStationUpdates();
    },
    destroyed() {
      if (this.service) this.service.destroy();
    },
    methods: {
      async listenToGiraStationUpdates() {
        this.service = new StationService(this.updateStations);
        this.service.listen();
      },
      updateStations(stations) {
        this.stations = Object.assign({}, this.stations, stations);
      }
    },
    components: {
      MapGiraStation
    }
  };
</script>
