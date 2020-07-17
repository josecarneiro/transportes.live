<template lang="pug">
  .favorite__card
    small.heading-label Stop
    h1(v-text="stop")
    small.heading-label Routes
    .favorite__route__list
      .favorite__route__item(v-for="(item, route) in arrivals")
        router-link(:to="{ name: 'carris/stop', params: { id: route } }")
          h5(v-text="route")
          time-until(:date="item.time")
</template>

<script>
  import { loadStop, EstimatesService } from '@/providers/carris/services';
  import TimeUntil from '@/components/time-until';

  const estimatesService = new EstimatesService();

  export default {
    props: {
      stop: String
    },
    data: () => ({
      arrivals: {}
    }),
    async mounted() {
      const { stop } = this;
      const estimates = await estimatesService.load(stop);
      const arrivals = estimates.reduce(
        (acc, { route, ...other }) => ({
          ...acc,
          ...((!acc[route] || acc[route].time > other.time) && {
            [route]: other
          })
        }),
        {}
      );
      this.arrivals = Object.assign({}, this.arrivals, arrivals);
    },
    components: {
      TimeUntil
    }
  };
</script>

<style lang="scss">
  .favorite__route__list {
    display: flex;
  }

  .favorite__route__item {
    margin-right: 1em;
    a {
      display: flex;
      flex-direction: column;
    }
    h5 {
      margin-bottom: 0.25rem;
    }
  }
</style>
