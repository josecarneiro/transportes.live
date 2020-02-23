<template lang="pug">
  view-aside
    h1 Station Detail
    div(v-for="pier in station")
      strong {{ pier.pier }}
      div(v-for="arrival in pier.arrivals")
        strong {{ arrival.train }}: 
        span
          time-ago(
            :datetime="arrival.time"
            :auto-update="5"
            :converterOptions="{ includeSeconds: true }"
          )
</template>

<script>
  import { StationDetailService } from '@/services/metro';
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
          this.service = new StationDetailService(this.id, this.updateStation);
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
      ViewAside
    }
  };
</script>
