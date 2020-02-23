<template lang="pug">
  div
    gmap-polyline(
      v-for="{ id, styles, path } in lines"
      :key="id"
      :editable="false"
      :draggable="false"
      :options="{ ...defaultPolylineOptions, ...styles }"
      :path="path"
    )
    custom-map-marker(
      v-for="{ id, position } in stations"
      :key="id"
      :position="position"
      class="metro-station marker"
    )
      router-link(:to="{ name: 'metro-station', params: { id } }")
        span(v-text="id")
</template>

<script>
  import metroLines from '@/data/metro/lines';
  import metroStations from '@/data/metro/stations';

  import CustomMapMarker from '@/components/map/custom-marker';

  const LINE_COLOR_MAP = {
    azul: '#2F7DE1',
    vermelha: '#EA1D76',
    amarela: '#F7A800',
    verde: '#00A19B'
  };

  const mapMetroStations = ({ id, latitude: lat, longitude: lng }) => ({
    id,
    position: { lat, lng }
  });

  const removeDuplicateMetroStations = ({ id }, index, array) =>
    array.findIndex(({ id: i }) => i === id) === index;

  const mapMetroLines = ({ id, stations }) => ({
    id,
    styles: {
      strokeColor: LINE_COLOR_MAP[id]
    },
    path: stations.map(({ latitude: lat, longitude: lng }) => ({
      lat,
      lng
    }))
  });

  export default {
    data: () => ({
      stations: metroStations
        .filter(removeDuplicateMetroStations)
        .map(mapMetroStations),
      lines: metroLines.map(mapMetroLines),
      defaultPolylineOptions: {
        strokeWeight: 7
      }
    }),
    components: {
      CustomMapMarker
    }
  };
</script>

<style lang="scss">
  $size: 2.5em;

  .metro-station {
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: $size;
      height: $size;
      background-color: white;
      border: 0.5em solid black;
      border-radius: 2em;
    }
  }
</style>
