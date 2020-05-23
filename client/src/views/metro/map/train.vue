<template lang="pug">
  custom-map-marker.metro.marker(v-bind="{ position }")
    router-link(to="/")
      span(v-text="id")
</template>

<script>
  import CustomMapMarker from '@/components/map/custom-marker';

  export default {
    props: {
      id: String,
      position: Object
    },
    components: {
      CustomMapMarker
    }
  };
</script>

<style lang="scss">
  .metro {
    a {
      $scale: 1.5;
      width: $scale * 0.65rem;
      height: $scale * 1.75rem;
      // background-color: orange;
      background-color: grey(0.95);
      border: 2px solid grey(0.7);
      font-weight: bold;
      // border-radius: 0.25em;
      border-radius: 0.25em;
      border-top-right-radius: 1em;
      border-top-left-radius: 1em;
    }
  }
</style>
