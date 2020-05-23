<template lang="pug">
  .map__container(
    :class="{ 'map__container--loaded': loaded }"
  )
    map-overlay(
      v-on="{ control }"
    )
      template(v-slot:overlay-bottom-left)
        slot(name="overlay")
    map-static(
      v-once,
      v-bind="{ center, zoom, size }"
    )
    gmaps-map(
      ref="map"
      :class="{ 'map--idle': idle }"
      v-bind="{ center, zoom, options: { ...defaultOptions, ...options } }",
      v-on="{ tilesloaded: changeLoaded, drag: idleEnd, resize: idleEnd, zoom_changed: idleEnd, idle: idleStart }"
    )
      slot(
        v-if="ready"
        name="default"
      )
    .map__color-overlay
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
      idle: false,
      size: []
    }),
    async mounted() {
      await this.$refs.map.$mapPromise;
      this.ready = true;
      this.$emit('ready');
      this.setSize();
    },
    methods: {
      changeLoaded() {
        this.loaded = true;
      },
      control(value) {
        const { minZoom } = this.options;
        switch (value) {
          case 'zoom-in':
            this.$emit('changeZoom', this.zoom + 1);
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
        this.size[0] = Math.floor(width / 2 - 0.5);
        this.size[1] = Math.floor(height / 2 - 0.5);
      },
      async idleStart() {
        // await this.$nextTick();
        setTimeout(() => {
          this.idle = true;
        }, 500);
      },
      idleEnd() {
        this.idle = false;
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

  .map__color-overlay {
    // $map-overlay-color: hsla(227, 60%, 50%, 0.3);
    $map-overlay-color: hsla(202, 100%, 60%, 0.1);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    background-color: $map-overlay-color;
    mix-blend-mode: overlay;
    pointer-events: none;
  }

  .marker a {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.675em;
  }
</style>
