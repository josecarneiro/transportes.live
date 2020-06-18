<template lang="pug">
  view-aside
    template(v-if="station")
      small.heading-label Station
      h3(v-text="station.name")
      small.heading-label Estimates
      .metro__station__estimates(v-for="(arrivals, platform) in platforms")
        //- strong {{ platform }}
        h5 Towards {{ metroStations.find(({ id }) => id === station.platforms[platform]).name }}
        ul.metro__train__list
          li.metro__train__item(v-for="{ train, time } in arrivals")
            a(href="#")
              .metro__train__icon
                span {{ train }}
              span
                time-until(
                  :date="time",
                  :interval="1"
              )
</template>

<script>
  import {
    StationEstimatesService,
    loadStationDetails
  } from '@/providers/metro/services';

  import TimeUntil from '@/components/time-until';
  import ViewAside from '@/components/view/aside';

  import { stations as metroStations } from '@/data/metro';

  export default {
    props: {
      id: String
    },
    data: () => ({
      station: null,
      platforms: {},
      metroStations
    }),
    watch: {
      id: {
        immediate: true,
        handler() {
          if (this.service) this.service.destroy();
          this.station = null;
          this.platforms = {};
          this.service = new StationEstimatesService(
            this.id,
            this.updateEstimates
          );
          this.service.listen();
          this.loadData();
        }
      }
    },
    destroyed() {
      if (this.service) this.service.destroy();
    },
    methods: {
      updateEstimates(platforms) {
        this.platforms = Object.assign({}, this.platforms, platforms);
      },
      async loadData() {
        const station = await loadStationDetails(this.id);
        this.station = Object.assign({}, this.station, station);
      }
    },
    components: {
      ViewAside,
      TimeUntil
    }
  };
</script>

<style lang="scss">
  .metro__station__estimates {
    margin-bottom: 1em;
    h5 {
      margin-bottom: 0.75em;
    }
  }

  .metro__train__item {
    a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 0.25em;
      padding: 1em;
      margin-bottom: 1em;
      background-color: white;
      @include shadow;
    }
  }

  .metro__train__icon {
    display: inline-flex;
    justify-content: center;
    font-weight: bold;
    letter-spacing: 1 / 16 * 1em;
    @include shadow;
  }
</style>
