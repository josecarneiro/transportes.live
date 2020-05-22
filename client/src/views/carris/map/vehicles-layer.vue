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
  import CustomMapMarker from '@/components/map/custom-marker';
  import StopLayer from './stop-layer';

  export default {
    props: {
      vehicles: Object
    },
    components: {
      CustomMapMarker,
      StopLayer
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
      $scale: 1.25;
      width: $scale * 0.75rem;
      height: $scale * 1.5rem;
      border-radius: $scale * 0.125rem;
      border: 1px solid $carris-blue;
      color: $carris-blue;
      font-weight: bold;
      background-color: $carris-yellow;
      // position: relative;
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
