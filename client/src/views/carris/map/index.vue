<template lang="pug">
  div
    custom-map-marker(
      v-for="({ route, position, angle }, id) in vehicles"
      :key="id"
      :position="position"
      class="marker bus"
      @click="center = position"
    )
      router-link(
        :to="{ name: 'carris/vehicle', params: { id } }"
        :class="{ 'bus--left': angle > 180, 'bus--right': angle <= 180 }"
        :style="{ transform: `rotate(${ angle }deg)` }"
      )
        span(v-text="route")
</template>

<script>
  import { VehiclePositionService } from '@/services/carris';

  import CustomMapMarker from '@/components/map/custom-marker';

  export default {
    data: () => ({
      service: null,
      vehicles: {}
    }),
    created() {
      this.service = new VehiclePositionService(this.updateVehicles);
      this.service.listen();
    },
    destroyed() {
      if (this.service) this.service.destroy();
    },
    methods: {
      updateVehicles(vehicles) {
        this.vehicles = Object.assign({}, this.vehicles, vehicles);
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
    .map--idle & {
      transition: all 1s ease;
    }
    a {
      position: relative;
      $scale: 1.25;
      width: $scale * 0.75rem;
      height: $scale * 1.5rem;
      background-color: $carris-yellow;
      border-radius: $scale * 0.125rem;
      border: 1px solid $carris-blue;
      color: $carris-blue;
      font-weight: bold;
      // border-bottom-width: 3px;
      // border-width: 2px 1px;
      // border-top-width: 1px;
      // border-bottom-width: 2px;
      // &:before {
      //   position: absolute;
      //   top: 0;
      //   margin: 0 auto;
      //   $size: 4px;
      //   content: '';
      //   display: block;
      //   border: $size solid transparent;
      //   border-bottom: $size * 2 solid $carris-blue;
      //   border-top: 0;
      // }
    }
    .bus--left {
      span {
        transform: rotate(90deg);
      }
    }
    .bus--right {
      span {
        transform: rotate(-90deg);
      }
    }
  }
</style>
