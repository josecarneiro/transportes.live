<template lang="pug">
  main
    map-overlay(
      v-on="{ control }"
    )
    gmap-map(
      ref="map"
      class="map__container"
      v-bind="{ center, zoom, options }"
    )
      template(v-if="ready")
        map-layer-carris(v-if="active.bus")
        map-layer-metro(v-if="active.subway")
</template>

<script>
  import MapOverlay from '@/components/map/overlay';

  import MapLayerCarris from './carris';
  import MapLayerMetro from './metro';

  const DEFAULT_CENTER = { lat: 38.7462929, lng: -9.1447389 };

  const DEFAULT_ZOOM = 13;

  const loadLocation = () =>
    new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => resolve(coords),
        reject
      )
    );

  import LIGHT_STYLE from '@/components/map/style/light';

  export default {
    data: () => ({
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      options: {
        gestureHandling: 'greedy',
        minZoom: 7,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: true,
        clickableIcons: false,
        styles: LIGHT_STYLE
      },
      ready: false,
      active: {
        bus: false,
        subway: true
      }
    }),
    mounted() {
      this.$refs.map.$mapPromise.then(() => {
        this.ready = true;
      });
    },
    methods: {
      control(value) {
        const { minZoom } = this.options;
        // const { map } = this.$refs;
        // console.log(value);
        switch (value) {
          case 'zoom-in':
            this.zoom++;
            break;
          case 'zoom-out':
            if (this.zoom - 1 >= minZoom) this.zoom--;
            break;
          case 'locate':
            this.locate();
            break;
          case 'toggle-bus':
            this.toggle('bus');
            break;
          case 'toggle-subway':
            this.toggle('subway');
            break;
        }
      },
      toggle(value) {
        this.active[value] = !this.active[value];
      },
      async locate() {
        const position = await loadLocation();
        this.center = Object.assign({}, this.center, {
          lat: position.latitude,
          lng: position.longitude
        });
        this.zoom = 15;
      }
    },
    components: {
      MapLayerCarris,
      MapLayerMetro,
      MapOverlay
    }
  };
</script>

<style lang="scss">
  .map__container {
    width: 100%;
    height: 100%;
    // min-height: 100vh;
  }

  main {
    width: 100%;
    height: 100vh;
    // min-height: 100vh;
  }

  .marker a {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.675em;
  }

  .vue-map > div {
    background-color: white !important;
  }
</style>
