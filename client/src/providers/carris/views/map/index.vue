<template lang="pug">
  div
    map-carris-stop-cluster(v-if="layers.stops")
      map-carris-stop(
        v-for="(position, id) in stops",
        :key="id",
        v-bind="{ id, position }",
        @navigate="navigateToStop(id)"
      )
    map-carris-vehicle(
      v-for="(vehicle, id) in vehicles"
      :key="id"
      v-bind="{ id, ...vehicle }"
    )
</template>

<script>
  import {
    VehiclePositionService,
    listStops
  } from '@/providers/carris/services';

  import MapCarrisVehicle from './../../components/vehicle';
  import MapCarrisStop from './../../components/stop';
  import MapCarrisStopCluster from './../../components/stop/cluster';

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
      },
      navigateToStop(id) {
        this.$router.push({ name: 'carris/stop', params: { id } });
      }
    },
    components: {
      MapCarrisStopCluster,
      MapCarrisStop,
      MapCarrisVehicle
    }
  };
</script>
