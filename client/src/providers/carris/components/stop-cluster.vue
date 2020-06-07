<template lang="pug">
  gmap-cluster(v-bind="{ styles: clusterStyles }")
    slot
</template>

<script>
  import GmapCluster from 'vue2-google-maps/src/components/cluster';

  const ICON_SIZE = 24;
  const ICON_FILE_NAME = 'marker-cluster';

  const clusterStyles = [ICON_FILE_NAME, ICON_FILE_NAME, ICON_FILE_NAME].map(
    (name) => ({
      url: `/images/${name}.png`,
      textColor: 'black',
      height: ICON_SIZE,
      width: ICON_SIZE
    })
  );

  export default {
    data: () => ({
      clusterStyles
    }),
    components: {
      GmapCluster
    }
  };
</script>

<style lang="scss">
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
