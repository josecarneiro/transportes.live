<template lang="pug">
  main
    custom-map(
      v-bind="{ center, zoom, options }"
      v-on="{ changeZoom, changeCenter }"
    )
      template(v-slot:overlay)
        router-link.map__control(:to="{ name: 'map/carris' }")
          icon(icon="bus")
        router-link.map__control(:to="{ name: 'map/metro' }")
          icon(icon="subway")
      router-view(name="map")
</template>

<script>
  import CustomMap from '@/components/map';
  import MapOverlay from '@/components/map/overlay';
  import Icon from '@/components/icon';

  // import MapLayerCarris from './carris';
  // import MapLayerMetro from './metro';

  const DEFAULT_CENTER = { lat: 38.7462929, lng: -9.1447389 };

  const DEFAULT_ZOOM = 13;

  export default {
    data: () => ({
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      options: {
        minZoom: 7
      },
      active: {
        bus: false,
        subway: true
      }
    }),
    methods: {
      changeZoom(value) {
        this.zoom = value;
      },
      changeCenter(position) {
        this.center = Object.assign({}, this.center, position);
      },
      control(value) {
        const { minZoom } = this.options;
        switch (value) {
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
      }
    },
    components: {
      // MapLayerCarris,
      // MapLayerMetro,
      Icon,
      MapOverlay,
      CustomMap
    }
  };
</script>

<style lang="scss">
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
</style>
