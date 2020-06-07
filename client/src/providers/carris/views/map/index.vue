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
    listStops
  } from '@/providers/carris/services';

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
      layers: {
        immediate: true,
        handler({ stops }) {
          if (stops) this.loadStops();
        }
      }
    },
    created() {
      this.listenToVehiclePositions();
    },
    destroyed() {
      if (this.service) this.service.destroy();
    },
    methods: {
      async loadStops() {
        const stops = await listStops();
        this.stops = Object.assign({}, this.stops, stops);
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
