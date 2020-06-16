<template lang="pug">
  div
    template(v-if="Object.keys(stations).length && Object.keys(occupancy).length")
      map-gira-station(
        v-for="(station, id) in stations"
        :key="id"
        v-bind="{ id, ...station, ...occupancy[id] }"
      )
</template>

<script>
  import {
    StationOccupancyService,
    listStations
  } from '@/providers/gira/services';

  import MapGiraStation from './../../components/station';

  export default {
    data: () => ({ stations: {}, occupancy: {} }),
    created() {
      this.listenToGiraStationUpdates();
      this.loadData();
    },
    destroyed() {
      if (this.service) this.service.destroy();
    },
    methods: {
      async listenToGiraStationUpdates() {
        this.service = new StationOccupancyService(this.updateOccupancy);
        this.service.listen();
      },
      updateOccupancy(occupancy) {
        this.occupancy = Object.assign({}, this.occupancy, occupancy);
      },
      async loadData() {
        const stations = await listStations();
        this.stations = Object.assign({}, this.stations, stations);
      }
    },
    components: {
      MapGiraStation
    }
  };
</script>
