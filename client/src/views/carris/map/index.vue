<template lang="pug">
  div
    stop-layer(
      v-if="layers.stops",
      v-bind="{ stops }"
    )
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
    computed: {
      layers() {
        const { query } = this.$route;
        return {
          stops: !!query.stops
        };
      }
    },
    watch: {
      layers({ stops }) {
        if (stops) this.loadStops();
      }
    },
    created() {
      this.listenToVehiclePositions();
      // this.loadStops();
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
        const parsed = Object.fromEntries(
          Object.entries(vehicles).map(
            ([
              key,
              {
                r: route,
                a: angle,
                p: [latitude, longitude]
              }
            ]) => [key, { route, angle, position: { latitude, longitude } }]
          )
        );
        this.vehicles = Object.assign({}, this.vehicles, parsed);
      }
    },
    components: {
      StopLayer,
      VehiclesLayer
    }
  };
</script>
