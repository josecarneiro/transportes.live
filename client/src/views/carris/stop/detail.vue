<template lang="pug">
  .view--aside
    h1 Stop Detail
    h1 {{ id }}
    template(v-if="stop")
      span {{ stop.name }}
    template(v-if="estimates")
    ul
      li(
        v-for="vehicle of estimates"
        :key="vehicle.plate"
      )
        router-link(
          :to="{ nome: 'carris/vehicle', params: { id: vehicle.id } }"
        )
          //- strong {{ vehicle.id }}
          span {{ vehicle.route }}
          span  {{ vehicle.routeName }}
          //- span {{ vehicle.destination }}
          |  - 
          time-ago(
            :datetime="vehicle.time"
            :auto-update="5"
            :converterOptions="{ includeSeconds: true }"
          )
</template>

<script>
  import { StopService, EstimatesService } from '@/services/carris';

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

        console.log(stop, estimates);
      }
    }
  };
</script>
