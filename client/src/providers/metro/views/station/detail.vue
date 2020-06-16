<template lang="pug">
  view-aside
    template(v-if="station")
      h3(v-text="station.name")
      div(v-for="(arrivals, platform) in platforms")
        //- strong {{ platform }}
        strong Direction {{ station.platforms[platform] }}
        div(v-for="{ train, time } in arrivals")
          strong {{ train }}: 
          span
            time-until(
              :date="new Date(time)",
              :interval="5"
            )
</template>

<script>
  import {
    StationEstimatesService,
    loadStationDetails
  } from '@/providers/metro/services';

  import TimeUntil from '@/components/time-until';
  import ViewAside from '@/components/view/aside';

  export default {
    props: {
      id: String
    },
    data: () => ({
      station: null,
      platforms: {}
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
