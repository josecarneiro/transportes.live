<template lang="pug">
  map-polyline(
    :editable="false"
    :draggable="false"
    v-bind="{ options, path }"
  )
</template>

<script>
  import { Polyline as MapPolyline } from 'vue2-google-maps';

  const LINE_COLOR_MAP = {
    azul: '#2F7DE1',
    vermelha: '#EA1D76',
    amarela: '#F7A800',
    verde: '#00A19B'
  };

  // const LINE_STROKE_WEIGHT = 7;
  const LINE_STROKE_WEIGHT = 8;

  export default {
    props: {
      id: String,
      stations: Array
    },
    computed: {
      path() {
        return this.stations.map(
          ({ position: { latitude: lat, longitude: lng } }) => ({
            lat,
            lng
          })
        );
      },
      options() {
        return {
          strokeWeight: LINE_STROKE_WEIGHT,
          strokeColor: LINE_COLOR_MAP[this.id]
        };
      }
    },
    components: {
      MapPolyline
    }
  };
</script>
