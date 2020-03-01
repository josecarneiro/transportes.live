<template lang="pug">
  .map__static(:style="{ backgroundImage: `url(${source})` }")
</template>

<script>
  import { mapsConfiguration } from '@/config';
  import MAP_STYLE from './../style/light';

  import generateSource from './generate-source';

  export default {
    props: {
      center: Object,
      zoom: Number,
      size: Array,
      scale: {
        type: Number,
        default: 2
        // default: 1
      }
    },
    computed: {
      source() {
        const { center, zoom, size, scale } = this;
        return generateSource({
          center,
          zoom: zoom - 1,
          size,
          scale,
          style: MAP_STYLE,
          apiKey: mapsConfiguration.apiKey
        });
      }
    }
  };
</script>

<style lang="scss">
  .map__static {
    background-color: #fff;
    background-position: center;
    background-size: cover;
  }
</style>
