<template lang="pug">
  map-marker.marker(
    v-bind="{ position: { lat: position.latitude, lng: position.longitude }, icon }",
    :label="`${bikes}/${docks}`",
    :clickable="true",
    @click="$emit('navigate')"
  )
</template>

<script>
  import { Marker as MapMarker } from 'vue2-google-maps';

  const ICON_SIZE = 24;

  const icon = {
    url: '/images/marker-cluster.png',
    scaledSize: { height: ICON_SIZE, width: ICON_SIZE }
  };

  export default {
    props: {
      id: String,
      position: Object,
      bikes: Number,
      docks: Number
    },
    data: () => ({ icon }),
    components: {
      MapMarker
    }
  };
</script>

<style lang="scss">
  // .bus-stop {
  //   a {
  //     $scale: 1;
  //     width: $scale * 1rem;
  //     height: $scale * 1rem;
  //     background-color: hsl(0, 0%, 90%);
  //     border-radius: 50%;
  //     border: 2px solid grey;
  //   }
  // }
</style>
