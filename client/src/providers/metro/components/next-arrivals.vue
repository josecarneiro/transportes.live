<template lang="pug">
  .next-arrivals
    .next-arrivals__line(v-for="line in lines")
      //- metro-line-label(:id="line.id")
      .next-arrivals__platform__list
        .next-arrivals__platform(v-for="platform in line.platforms")
          small.heading-label {{ stationNames[platform.direction] }}
          time-until(
            v-if="platform.estimates && platform.estimates.length"
            :date="platform.estimates[0].time"
            :interval="1"
          )
          span(v-else) -
</template>

<script>
  import stationNames from '@/providers/metro/data/station-names';

  import TimeUntil from '@/components/time-until';
  import MetroLineLabel from '@/providers/metro/components/line-label';

  export default {
    props: {
      estimates: Object,
      station: Object
    },
    data: () => ({ stationNames }),
    computed: {
      lines() {
        const { station, estimates } = this;
        const lines = Object.entries(station.platforms)
          .map(([id, { line }]) => line)
          .reduce(
            (acc, line) => [...acc, ...(acc.includes(line) ? [] : [line])],
            []
          );
        const platforms = Object.entries(
          station.platforms
        ).map(([id, data]) => ({ ...data, id }));
        const linesWithEstimates = lines.map(line => ({
          id: line,
          platforms: platforms
            .filter(platform => platform.line === line)
            .map(platform => ({
              ...platform,
              estimates: estimates[platform.id]
            }))
        }));
        return linesWithEstimates;
      }
    },
    components: {
      TimeUntil,
      MetroLineLabel
    }
  };
</script>

<style lang="scss">
  .next-arrivals__line {
    margin-bottom: 1rem;
    .metro__line__label {
      font-size: 0.75em;
      margin-bottom: 0.5rem;
    }
  }

  .next-arrivals__platform__list {
    display: flex;
    justify-content: space-between;
    & > div {
      flex: 1 1 50%;
      span {
        font-size: 2em;
      }
    }
  }
</style>
