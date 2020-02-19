<template lang="pug">
  main
    gmap-map(
      v-bind="{ center, zoom, options }"
      class="map__container"
    )
      map-layer-carris
      map-layer-metro
</template>

<script>
  import MapLayerCarris from './carris';
  import MapLayerMetro from './metro';

  export default {
    data: () => ({
      center: { lat: 38.75, lng: -9.2 },
      zoom: 11,
      options: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: true
      }
    }),
    components: {
      MapLayerCarris,
      MapLayerMetro
    }
  };
</script>

<style lang="scss">
  .map__container {
    width: 100%;
    height: 100%;
  }

  main {
    width: 100%;
    height: 100vh;
  }

  .marker a {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.675em;
  }
</style>
