<template lang="pug">
  .map__container(
    :class="{ 'map__container--loaded': loaded }"
  )
    map-overlay(
      v-on="{ control }"
    )
      slot(name="overlay")
    map-static(
      v-bind="{ center, zoom, size }"
    )
    gmaps-map(
      ref="map"
      v-bind="{ center, zoom, options: { ...defaultOptions, ...options } }",
      v-on="{ tilesloaded: changeLoaded }"
    )
      slot(
        v-if="ready"
        name="default"
      )
</template>

<script>
  import { Map as GmapsMap } from 'vue2-google-maps';
  import MapOverlay from '@/components/map/overlay';
  import loadLocation from '@/services/load-location';
  import MapStatic from './static/image';

  import LIGHT_STYLE from './style/light';

  const DEFAULT_CENTER = { lat: 38.7462929, lng: -9.1447389 };

  export default {
    props: {
      center: Object,
      zoom: {
        type: Number,
        default: 13
      },
      options: Object
    },
    data: () => ({
      defaultOptions: {
        gestureHandling: 'greedy',
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
      loaded: false,
      size: []
    }),
    mounted() {
      const { map } = this.$refs;
      this.$refs.map.$mapPromise.then(() => {
        this.ready = true;
        this.$emit('ready');
        this.setSize();
      });
    },
    methods: {
      changeLoaded() {
        this.loaded = true;
        console.log('loaded');
      },
      control(value) {
        const { minZoom } = this.options;
        switch (value) {
          case 'zoom-in':
            this.$emit('changeZoom', this.zoom + 1);
            this.zoom++;
            break;
          case 'zoom-out':
            this.$emit('changeZoom', Math.max(minZoom, this.zoom - 1));
            break;
          case 'locate':
            this.locate();
            break;
        }
      },
      async locate() {
        const position = await loadLocation();
        const center = Object.assign({}, this.center, {
          lat: position.latitude,
          lng: position.longitude
        });
        this.$emit('changeCenter', center);
        this.$emit('changeZoom', 15);
      },
      setSize() {
        const { innerWidth: width, innerHeight: height } = window;
        // this.size = [width / 2, height / 2];
        this.size[0] = Math.floor(width / 2 - 0.5);
        this.size[1] = Math.floor(height / 2 - 0.5);
        // this.size[0] = width;
        // this.size[1] = height;
      }
    },
    components: {
      GmapsMap,
      MapStatic,
      MapOverlay
    }
  };
</script>

<style lang="scss">
  .map__container,
  .vue-map-container {
    width: 100%;
    height: 100%;
    // min-height: 100vh;
  }

  .vue-map > div {
    background-color: white !important;
  }

  .map__container {
    position: relative;
    .map__static {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 80;
      transition: opacity 0.25s ease;
      pointer-events: none;
    }
  }

  .map__container--loaded {
    .map__static {
      opacity: 0;
    }
  }
</style>
