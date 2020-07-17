<template lang="pug">
  metro-station-data-provider(v-bind="{ id: station }")
    template(slot-scope="{ loaded, details, estimates }")
      .favorite__card.favorite__card--metro(:class="generateClasses(details)")
        small.heading-label Station
        h2.placeholder(v-text="details && details.name")
        small.heading-label Directions
        metro-next-arrivals(
          v-if="details",
          v-bind="{ station: details, estimates }"
        )
        .btn__group
          router-link.btn(:to="{ name: 'metro/station', params: { id: station } }")
            icon(icon="plus")
</template>

<script>
  import MetroNextArrivals from '@/providers/metro/components/next-arrivals';
  import TimeUntil from '@/components/time-until';
  import MetroStationDataProvider from '@/providers/metro/components/providers/station';

  export default {
    props: {
      station: String
    },
    // computed: {
    //   classes() {
    //     const lines = this.details?.lines || [];
    //     const [line] = lines;
    //     return {
    //       [`favorite__card--metro--${line}`]: true
    //     };
    //   }
    // },
    methods: {
      generateClasses(details) {
        const lines = details?.lines || [];
        const [line] = lines;
        return {
          [`favorite__card--metro--${line}`]: true
        };
      }
    },
    components: {
      MetroStationDataProvider,
      TimeUntil,
      MetroNextArrivals
    }
  };
</script>

<style lang="scss">
  @import '~@/providers/metro/style/variables';

  $metro-lines: (
    'vermelha': $metro-line-color-red,
    'azul': $metro-line-color-blue,
    'verde': $metro-line-color-green,
    'amarela': $metro-line-color-yellow
  );

  .favorite__card.favorite__card--metro {
    color: white;
    background-color: grey(0.75);
    @each $line, $color in $metro-lines {
      &.favorite__card--metro--#{$line} {
        background-color: $color;
        @include shadow(0.125em, $color);
      }
    }
    // .heading-label {
    //   font-weight: bold;
    // }
    .next-arrivals__line {
      margin-bottom: 0;
    }
    .btn__group {
      margin: -1em;
      // margin-top: 0;
      margin-top: 1em;
      margin-bottom: -2em;
      border-top: 1px solid grey(0.75, 0.25);
    }
  }

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
