<template lang="pug">
  div
    map-carris-vehicle(
      v-for="(vehicle, id) in vehicles"
      :key="id"
      v-bind="{ id, ...vehicle }"
    )
</template>

<script>
  import MapCarrisVehicle from './../../components/vehicle';
  import StopLayer from './stop-layer';

  export default {
    props: {
      vehicles: Object
    },
    components: {
      MapCarrisVehicle,
      StopLayer
    }
  };
</script>
