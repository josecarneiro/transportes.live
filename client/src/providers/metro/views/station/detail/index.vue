<template lang="pug">
  view-aside.view--metro-station-detail
    template(v-if="loaded")
      .heading__labels
        div
          small.heading-label Name
          h3(v-text="station.name")
        //- div
        //-   small.heading-label Station
        //-   h3(v-text="id")
        div
          small.heading-label Line
          .metro__line__labels
            metro-line-label(
              v-for="line in station.lines",
              :key="line",
              :id="line"
            )
      small.heading-label Next Arrivals
      metro-station-next-arrivals(
        v-bind="{ station, estimates }"
      )
      small.heading-label Detailed Estimates
      .metro__station__estimates(
        v-for="(arrivals, platform) in estimates",
        :key="platform"
      )
        //- strong {{ platform }}
        h5 Towards {{ metroStations.find(({ id }) => id === station.platforms[platform].direction).name }}
        ul.metro__train__list
          li.metro__train__item(v-for="{ train, time } in arrivals")
            a(href="#")
              .metro__train__icon
                span(v-text="train")
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
  import { stations as metroStations } from '@/providers/metro/data';

  import TimeUntil from '@/components/time-until';
  import ViewAside from '@/components/view/aside';
  import MetroLineLabel from '@/providers/metro/components/line-label';
  import MetroStationNextArrivals from './next-arrivals';

  export default {
    props: {
      id: String
    },
    data: () => ({
      loaded: false,
      station: {
        lines: []
      },
      estimates: {},
      metroStations
    }),
    watch: {
      id: {
        immediate: true,
        handler() {
          this.loaded = false;
          if (this.service) this.service.destroy();
          this.station = null;
          this.estimates = {};
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
      updateEstimates(estimates) {
        this.estimates = Object.assign({}, this.estimates, estimates);
      },
      async loadData() {
        const station = await loadStationDetails(this.id);
        this.station = Object.assign({}, this.station, station);
        this.loaded = true;
      }
    },
    components: {
      ViewAside,
      TimeUntil,
      MetroLineLabel,
      MetroStationNextArrivals
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

  .heading__labels {
    display: flex;
    & > * {
      &:not(:last-child) {
        margin-right: 1em;
      }
    }
  }

  .view--metro-station-detail {
    .heading__labels {
      & > * {
        &:first-child {
          margin-right: auto;
        }
        &:last-child {
          .heading-label {
            justify-content: flex-end;
          }
        }
      }
    }
  }

  .metro__line__labels {
    & > *:not(:first-child) {
      margin-left: 0.5em;
    }
    .metro__line__label {
      font-size: 0.75em;
    }
  }
</style>
