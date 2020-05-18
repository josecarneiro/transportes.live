<template lang="pug">
  div
    custom-map-marker(
      v-for="(marker, index) in markers"
      :key="index"
      :position="marker.position"
      class="marker bus"
      @click="center = marker.position"
    )
      router-link(
        :to="{ name: 'carris/vehicle', params: { id: marker.id } }"
        :style="{ transform: `rotate(${ 180 * marker.bearing / Math.PI }deg)` }"
      )
        span(v-text="marker.route")
</template>

<script>
  import { VehiclePositionService } from '@/services/carris';

  import CustomMapMarker from '@/components/map/custom-marker';

  const extractMarkersFromVehicles = (vehicles) =>
    vehicles.map(({ route, ...vehicle }) => ({
      ...vehicle,
      route
    }));

  export default {
    data: () => ({
      service: null,
      vehicles: []
    }),
    computed: {
      markers() {
        const { vehicles } = this;
        return [...extractMarkersFromVehicles(vehicles)];
      }
    },
    created() {
      this.service = new VehiclePositionService(this.updateVehicles);
    },
    destroyed() {
      if (this.service) this.service.destroy();
    },
    methods: {
      updateVehicles(vehicles) {
        this.vehicles = [...VehiclePositionService.parse(vehicles)];
      }
    },
    components: {
      CustomMapMarker
    }
  };
</script>

<style lang="scss">
  // $carris-yellow: hsl(59, 100%, 68%);
  $carris-yellow: #fed705;
  $carris-blue: #0055a2;

  .bus {
    a {
      $scale: 1.25;
      width: $scale * 0.75rem;
      height: $scale * 1.5rem;
      background-color: $carris-yellow;
      border-radius: $scale * 0.125rem;
      border: 2px solid $carris-blue;
      color: $carris-blue;
      font-weight: bold;
      // border: 1px solid white;
    }
  }
</style>
