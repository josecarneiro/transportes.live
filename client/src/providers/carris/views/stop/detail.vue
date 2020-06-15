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
          v-for="{ id, plate, route, routeName, time } of estimates"
          :key="plate"
        )
          component(
            :is="id ? 'router-link' : 'div'",
            :to="id && { name: 'carris/vehicle', params: { id } }"
          )
            strong {{ route }}
            span  {{ routeName }}
            |  - 
            strong
              time-until(
                :date="time"
                :interval="5"
              )
</template>

<script>
  import { loadStop, EstimatesService } from '@/providers/carris/services';

  import TimeUntil from '@/components/time-until';
  import ViewAside from '@/components/view/aside';

  export default {
    props: {
      id: String
    },
    data: () => ({ stop: null, estimates: [] }),
    async created() {
      const stop = await loadStop(this.id);
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
