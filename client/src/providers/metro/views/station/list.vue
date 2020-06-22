<template lang="pug">
  view-aside
    h1 Metro Stations
    div(
      v-for="line in lines"
    )
      //- span(v-text="line.id")
      h4(v-text="line.name")
      .metro__station__list
        .metro__station__item(
          v-for="station in line.stations",
          :key="station.id"
        )
          router-link(
            :to="{ name: 'metro/station', params: { id: station.id }}"
          )
            strong(v-text="station.id")
            span(v-text="station.name")
      //- div(
      //-   v-for="station in stations"
      //- )
      //-   span(v-text="station.name")
</template>

<script>
  import ViewAside from '@/components/view/aside';

  import {
    stations as rawStations,
    lines as rawLines
  } from '@/providers/metro/data';

  const lines = rawLines.map(({ stations: stationIds, ...line }) => ({
    ...line,
    stations: stationIds.map(id =>
      rawStations.find(station => id === station.id)
    )
  }));

  export default {
    data: () => ({
      lines
    }),
    components: {
      ViewAside
    }
  };
</script>

<style lang="scss">
  // .metro__station__list {
  // }

  .metro__station__item {
    margin-bottom: 1em;
    a {
      display: block;
      padding: 1em;
      background-color: white;
      @include shadow;
      strong {
        margin-right: 1em;
      }
    }
  }
</style>
