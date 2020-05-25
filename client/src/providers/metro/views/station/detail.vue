<template lang="pug">
  view-aside
    h1 Station Detail
    div(v-for="pier in station")
      strong {{ pier.pier }}
      div(v-for="arrival in pier.arrivals")
        strong {{ arrival.train }}: 
        span
          time-until(
            :date="new Date(arrival.time)",
            :interval="5"
          )
</template>

<script>
  import { StationDetailService } from '@/providers/metro/services';

  import TimeUntil from '@/components/time-until';
  import ViewAside from '@/components/view/aside';

  export default {
    props: {
      id: String
    },
    data: () => ({
      station: null
    }),
    watch: {
      id: {
        immediate: true,
        handler() {
          if (this.service) this.service.destroy();
          this.station = null;
          this.service = new StationDetailService(
            this.id.toUpperCase(),
            this.updateStation
          );
          this.service.listen();
        }
      }
    },
    destroyed() {
      if (this.service) this.service.destroy();
    },
    methods: {
      updateStation(data) {
        this.station = data;
      }
    },
    components: {
      ViewAside,
      TimeUntil
    }
  };
</script>
