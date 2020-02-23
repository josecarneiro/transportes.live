<template lang="pug">
  main
    gmap-map(
      ref="map"
      v-bind="{ center, zoom, options }"
      class="map__container"
    )
      template(v-if="ready")
        map-layer-carris
        map-layer-metro
</template>

<script>
  import MapLayerCarris from './carris';
  import MapLayerMetro from './metro';

  // const DEFAULT_CENTER = [38.7262929, -9.1447389];

  // const DEFAULT_ZOOM = 14;

  export default {
    data: () => ({
      center: { lat: 38.75, lng: -9.2 },
      zoom: 11,
      options: {
        minZoom: 7,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: true
      },
      ready: false
    }),
    mounted() {
      this.$refs.map.$mapPromise.then(map => {
        this.ready = true;
      });
    },
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
