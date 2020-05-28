<template lang="pug">
  div
    metro-line(
      v-for="line in lines"
      :key="line.id"
      v-bind="{ ...line }"
    )
    metro-station(
      v-for="station in stations"
      :key="line.id"
      v-bind="{ ...station }"
    )
</template>

<script>
  import metroLines from '@/data/metro/lines';
  import metroStations from '@/data/metro/stations';

  import MetroStation from '@/providers/metro/components/station';
  import MetroLine from '@/providers/metro/components/line';

  const removeDuplicateMetroStations = ({ id }, index, array) =>
    array.findIndex(({ id: i }) => i === id) === index;

  const mapMetroStations = ({ id, latitude, longitude }) => ({
    id,
    position: { latitude, longitude }
  });

  export default {
    data: () => ({
      stations: metroStations
        .filter(removeDuplicateMetroStations)
        .map(mapMetroStations),
      lines: metroLines
    }),
    components: {
      MetroStation,
      MetroLine
    }
  };
</script>
