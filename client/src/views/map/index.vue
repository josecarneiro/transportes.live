<template lang="pug">
  main
    custom-map(
      v-bind="{ center, zoom, options }"
      v-on="{ changeZoom, changeCenter }"
    )
      template(v-slot:navigation)
        navigation-aside
      template(v-slot:filters)
        router-view(name="filters")
      router-view(name="map")
</template>

<script>
  import CustomMap from '@/components/map';
  import MapOverlay from '@/components/map/overlay';
  import NavigationAside from '@/components/navigation-aside';

  import { mapsConfiguration } from '@/config';

  const DEFAULT_CENTER = { lat: 38.7462929, lng: -9.1447389 };

  const DEFAULT_ZOOM = 13;

  export default {
    data: () => ({
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      options: {
        minZoom: 11,
        mapId: mapsConfiguration.mapId,
        restriction: {
          latLngBounds: {
            north: DEFAULT_CENTER.lat + 2.5,
            south: DEFAULT_CENTER.lat - 1,
            west: DEFAULT_CENTER.lng - 3,
            east: DEFAULT_CENTER.lng + 3
          },
          strictBounds: false
        }
      }
    }),
    methods: {
      changeZoom(value) {
        this.zoom = value;
      },
      changeCenter(position) {
        this.center = Object.assign({}, this.center, position);
      }
    },
    components: {
      MapOverlay,
      CustomMap,
      NavigationAside
    }
  };
</script>

<style lang="scss">
  main {
    width: 100%;
    height: 100vh;
  }
</style>
