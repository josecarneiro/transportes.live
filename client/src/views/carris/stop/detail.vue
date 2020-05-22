<template lang="pug">
  view-aside
    template(v-if="stop")
      h1 {{ stop.name }}
      h3 Stop \#{{ id }}
    h4 Estimates
    template(v-if="!estimates || !estimates.length")
      span There are no estimates for this stop...
    template(v-else)
      ul
        li(
          v-for="vehicle of estimates"
          :key="vehicle.plate"
        )
          router-link(
            v-if="vehicle.id"
            :to="{ name: 'carris/vehicle', params: { id: vehicle.id } }"
          )
            strong {{ vehicle.route }}
            span  {{ vehicle.routeName }}
            |  - 
            strong
              time-until(
                :date="vehicle.time"
                :interval="5"
              )
          div(v-else)
            strong {{ vehicle.route }}
            span  {{ vehicle.routeName }}
            |  - 
            strong
              time-until(
                :date="vehicle.time"
                :interval="5"
              )
</template>

<script>
  import { StopService, EstimatesService } from '@/services/carris';

  import TimeUntil from '@/components/time-until';
  import ViewAside from '@/components/view/aside';

  export default {
    props: {
      id: String
    },
    data: () => ({ stop: null, estimates: [] }),
    async created() {
      const stopService = new StopService();
      const stop = await stopService.load(this.id);
      this.stop = stop;

      const estimatesService = new EstimatesService();
      const estimates = await estimatesService.load(this.id);
      if (estimates) {
        this.estimates = estimates.map(({ time, ...everything }) => ({
          ...everything,
          time: new Date(time)
        }));
      }
    },
    components: {
      ViewAside,
      TimeUntil
    }
  };
</script>
