<template lang="pug">
  .view--aside
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
            :to="{ name: 'carris/vehicle', params: { id: vehicle.id || vehicle.plate } }"
          )
            //- strong {{ vehicle.id }}
            strong {{ vehicle.route }}
            span  {{ vehicle.routeName }}
            //- span {{ vehicle.destination }}
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

  export default {
    props: {
      id: String
    },
    data: () => ({ stop: null, estimates: [] }),
    async created() {
      const stopService = new StopService(this.id);
      const stop = await stopService.load();
      this.stop = stop;

      const estimatesService = new EstimatesService(this.id);
      const estimates = await estimatesService.load();
      if (estimates) {
        this.estimates = estimates.map(({ time, ...everything }) => ({
          ...everything,
          time: new Date(time)
        }));
      }
    },
    components: {
      TimeUntil
    }
  };
</script>
