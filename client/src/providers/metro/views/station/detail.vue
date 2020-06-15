<template lang="pug">
  view-aside
    h1 Station Detail
    template(v-if="station")
      div(v-for="{ platform, arrivals } in estimates")
        strong {{ platform }}
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
      estimates: {}
    }),
    watch: {
      id: {
        immediate: true,
        handler() {
          if (this.service) this.service.destroy();
          this.station = null;
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
      updateEstimates(data) {
        console.log(data);
        this.station = data;
      },
      async loadData() {
        const station = await loadStationDetails(this.id);
        console.log(station);
      }
    },
    components: {
      ViewAside,
      TimeUntil
    }
  };
</script>
