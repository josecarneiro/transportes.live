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
  $size: 1.25em;

  .metro-station {
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: $size;
      height: $size;
      border: 2px solid black;
      border-radius: 2em;
      background-color: white;
      transform: translateY(50%);
      span {
        font-size: 0.5em;
        font-weight: bold;
      }
    }
  }
</style>
