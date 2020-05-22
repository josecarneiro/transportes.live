<template lang="pug">
  div
    stop-layer(v-bind="{ stops }")
    vehicles-layer(v-bind="{ vehicles }")
</template>

<script>
  import {
    VehiclePositionService,
    StopPositionService
  } from '@/services/carris';

  import StopLayer from './stop-layer';
  import VehiclesLayer from './vehicles-layer';

  export default {
    data: () => ({
      service: null,
      vehicles: {},
      stops: {}
    }),
    created() {
      this.listenToVehiclePositions();
      this.loadStops();
    },
    destroyed() {
      if (this.service) this.service.destroy();
    },
    methods: {
      async loadStops() {
        const service = new StopPositionService();
        const stops = await service.load();
        const parsed = Object.fromEntries(
          Object.entries(stops).map(([key, [lat, lng]]) => [key, { lat, lng }])
        );
        this.stops = Object.assign({}, this.stops, parsed);
      },
      async listenToVehiclePositions() {
        this.service = new VehiclePositionService(this.updateVehicles);
        this.service.listen();
      },
      updateVehicles(vehicles) {
        this.vehicles = Object.assign({}, this.vehicles, vehicles);
      }
    },
    components: {
      StopLayer,
      VehiclesLayer
    }
  };
</script>
