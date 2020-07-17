<template lang="pug">
  metro-station-data-provider(v-bind="{ id: station }")
    template(slot-scope="{ loaded, details, estimates }")
      .favorite__card.favorite__card--metro(:class="generateClasses(details)")
        header.favorite__card__header
          div
            small.heading-label Station
            h2.placeholder(v-text="details && details.name")
          .favorite__card__header__actions
            router-link.btn(:to="{ name: 'metro/station', params: { id: station } }")
              icon(icon="arrow-right")
        section.favorite__card__body
          small.heading-label Directions
          metro-next-arrivals(
            v-if="details",
            v-bind="{ station: details, estimates }"
          )
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
    padding: 0;
    color: white;
    background-color: grey(0.75);
    @each $line, $color in $metro-lines {
      &.favorite__card--metro--#{$line} {
        background-color: $color;
        @include shadow(0.125em, $color);
      }
    }
    .next-arrivals__line {
      margin-bottom: 0;
    }
    .favorite__card__header {
      .btn {
        .icon {
          margin-right: -0.125em;
        }
      }
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

  .favorite__card__header {
    padding: 1em;
    padding-bottom: 0;
    display: flex;
  }

  .favorite__card__body {
    padding: 0 1em;
    padding-bottom: 1em;
  }

  .favorite__card__header__actions {
    margin-left: auto;
    margin-top: -1em;
    margin-right: -1em;
  }
</style>
