<template lang="pug">
  carris-stop-data-provider(v-bind="{ id: stop }")
    template(slot-scope="{ loaded, stop: details, estimates }")
      .favorite__card
        header.favorite__card__header
          div
            small.heading-label Code
            h1.placeholder(v-text="stop")
            small.heading-label Stop
            h4.placeholder(v-text="details && details.name")
          .favorite__card__header__actions
            router-link.btn(:to="{ name: 'carris/stop', params: { id: stop } }")
              icon(icon="arrow-right")
        section.favorite__card__body
          small.heading-label Routes
          carris-stop-next-arrivals(
            v-if="loaded",
            v-bind="{ stop: details, estimates }"
          )
</template>

<script>
  import CarrisStopNextArrivals from './next-arrivals';
  import CarrisStopDataProvider from '@/providers/carris/components/providers/stop';

  export default {
    props: {
      stop: String
    },
    components: {
      CarrisStopDataProvider,
      CarrisStopNextArrivals
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
