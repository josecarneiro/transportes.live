<template lang="pug">
  div
    gmap-cluster(v-bind="{ styles: clusterStyles }")
      custom-map-marker(
        v-for="(position, id) in stops"
        :key="id"
        v-bind="{ position }"
        class="marker bus-stop"
      )
        router-link(:to="{ name: 'carris/stop', params: { id } }")
</template>

<script>
  import GmapCluster from 'vue2-google-maps/src/components/cluster';
  import CustomMapMarker from '@/components/map/custom-marker';

  const clusterStyles = [
    'marker-cluster',
    'marker-cluster',
    'marker-cluster'
  ].map((name) => ({
    url: `/images/${name}.png`,
    textColor: 'black',
    height: 24,
    width: 24
  }));

  export default {
    props: {
      stops: Object
    },
    data: () => ({ clusterStyles }),
    components: {
      CustomMapMarker,
      GmapCluster
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

  .gm-style {
    .cluster {
      img {
        // max-width: 100%;
        display: none;
      }
      & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.5rem;
        height: 1.5rem;
        border: 2px solid grey;
        border-radius: 50%;
        background-color: hsl(0, 0%, 90%);
        // font-weight: normal !important;
        // font-family: inherit !important;
        // font-size: inherit !important;
        font: inherit !important;
        font-size: 0.75em !important;
        // font-size: 0.5em !important;
        font-weight: bold !important;
        line-height: inherit !important;
      }
    }
  }
</style>
