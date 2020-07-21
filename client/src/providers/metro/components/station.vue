<template lang="pug">
  custom-map-marker.metro-station(
    :key="id"
    v-bind="{ position }"
  )
    router-link(:to="{ name: 'metro/station', params: { id } }")
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
  .metro-station {
    // $size: 1.25em;
    // $size: 1.5em;
    $size: 1.5em;
    $border-size: 2 / 16 * 1em;
    // $font-size: 0.5em;
    // $font-size: 0.75em;
    $font-size: 0.675em;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: $size;
      height: $size;
      border: $border-size solid black;
      border-radius: 50%;
      background-color: white;
      // transform: translateY(50%);
      span {
        font-size: $font-size;
        font-weight: bold;
        transform: translateY(2.5%);
      }
    }
  }
</style>
