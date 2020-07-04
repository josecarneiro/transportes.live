<template lang="pug">
  div
    div(v-for="{ stop, routes } of list")
      h1(v-text="stop")
      div(v-for="route of routes")
        router-link(:to="{ name: 'carris/stop', params: { id: stop } }")
          h5 {{ route }}
          time-until(:date="estimates[`${stop}/${route}`]")
</template>

<script>
  import { loadStop, EstimatesService } from '@/providers/carris/services';
  import TimeUntil from '@/components/time-until';

  const estimatesService = new EstimatesService();

  export default {
    props: {
      favorites: Array
    },
    data: () => ({
      estimates: {}
    }),
    computed: {
      list() {
        const { favorites } = this;
        return favorites.reduce((acc, { stop, route }) => {
          const index = acc.findIndex(item => item.stop === stop);
          if (index >= 0) {
            acc[index].routes.push(route);
          } else {
            acc.push({ stop, routes: [route] });
          }
          return acc;
        }, []);
      }
    },
    async mounted() {
      const { list } = this;
      const data = {};
      const estimatesList = await Promise.all(
        list.map(({ stop }) => estimatesService.load(stop))
      );
      for (const [index, { stop, routes }] of Object.entries(list)) {
        const estimates = estimatesList[index];
        for (const route of routes) {
          const arrival = estimates.find(estimate => estimate.route === route);
          const id = [stop, route].join('/');
          if (arrival) data[id] = arrival.time;
        }
      }
      this.estimates = Object.assign({}, this.estimates, data);
    },
    components: {
      TimeUntil
    }
  };
</script>

<style lang="scss">
  //
</style>
