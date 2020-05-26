<template lang="pug">
  map-marker.marker(
    v-bind="{ position }",
    :icon="icon",
    :clickable="true",
    @click="$emit('navigate')"
  )
</template>

<script>
  import { Marker as MapMarker } from 'vue2-google-maps';

  const icon = {
    url: '/images/marker-cluster.png',
    // size: { height: 24, width: 24 },
    scaledSize: { height: 24, width: 24 }
  };

  export default {
    props: {
      id: String,
      position: Object
    },
    data: () => ({ icon }),
    components: {
      MapMarker
    }
  };
</script>

<style lang="scss">
  .bus-stop {
    a {
      $scale: 1;
      width: $scale * 1rem;
      height: $scale * 1rem;
      background-color: hsl(0, 0%, 90%);
      border-radius: 50%;
      border: 2px solid grey;
    }
  }
</style>
