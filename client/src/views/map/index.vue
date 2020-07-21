<template lang="pug">
  .map__wrapper
    custom-map(
      v-bind="{ options, center, zoom, user }"
      v-on="{ changeZoom, changeCenter, locate }"
    )
      template(v-slot:navigation)
        navigation-aside
      template(v-slot:filters)
        router-view(name="filters")
      router-view(name="map")
</template>

<script>
  import { mapState } from 'vuex';

  import CustomMap from '@/components/map';
  import MapOverlay from '@/components/map/overlay';
  import NavigationAside from '@/components/layout/navigation-aside';

  import { maps as mapsConfiguration } from '@/config';

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
    computed: {
      ...mapState('location', {
        user: ({ position }) => position && position.coordinates
      })
    },
    methods: {
      changeZoom(value) {
        this.zoom = value;
      },
      changeCenter(position) {
        this.center = Object.assign({}, this.center, position);
      },
      locate(position) {
        // console.log(position);
        // this.$ga.event(
        //   'location',
        //   'triggered-geolocation',
        //   'trigger',
        //   position
        // );
        this.$gtag.event('location', {
          event_category: 'triggered-geolocation',
          event_label: 'trigger',
          value: position
        });
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
  .map__wrapper {
    width: 100%;
    height: 100vh;
  }
</style>
