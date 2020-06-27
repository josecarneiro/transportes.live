<template lang="pug">
  .carris__arrivals
    .carris__arrival(v-for="arrival of arrivals")
      h6.heading-label.carris__arrival__route(v-text="arrival.route")
      time-until.carris__arrival__time(
        v-if="arrival.estimate",
        :date="arrival.estimate.time"
        :interval="1"
      )
      span(v-else) -
</template>

<script>
  import TimeUntil from '@/components/time-until';

  export default {
    props: {
      stop: Object,
      estimates: Array
    },
    computed: {
      arrivals() {
        const {
          stop: { routes },
          estimates
        } = this;
        if (!routes) return [];
        const arrivals = routes.map(route => ({
          route,
          estimate: estimates.find(estimate => estimate.route === route) || null
        }));
        return arrivals;
      }
    },
    components: {
      TimeUntil
    }
  };
</script>

<style lang="scss">
  .carris__arrivals {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1em;
    & > * {
      flex: 1 1 50%;
    }
  }

  .carris__arrival__route {
    font-weight: 300;
  }

  .carris__arrival__time {
    font-size: 2em;
  }
</style>
