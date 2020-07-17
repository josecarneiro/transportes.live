<template lang="pug">
  metro-station-data-provider(v-bind="{ id }")
    template(slot-scope="{ loaded, details, estimates }")
      view-aside.view--metro-station-detail
        template
          .heading__labels
            div
              small.heading-label Name
              h3.placeholder(v-text="details && details.name")
            div
              small.heading-label Line
              .metro__line__labels(v-if="details && details.lines")
                metro-line-label(
                  v-for="line in details.lines",
                  :key="line",
                  :id="line"
                )
          small.heading-label Next Arrivals
          metro-station-next-arrivals(
            v-if="details && details.lines && details.lines.length",
            v-bind="{ station: details, estimates }"
          )
          h1.placeholder(v-else)
          small.heading-label Detailed Estimates
          template(v-if="details")
            .metro__station__estimates(
              v-for="(arrivals, platform) in estimates",
              :key="platform"
            )
              h5 Towards {{ metroStations.find(({ id }) => id === details.platforms[platform].direction).name }}
              ul.metro__train__list(v-if="arrivals.length")
                li.metro__train__item(v-for="{ train, time } in arrivals")
                  a(href="#")
                    .metro__train__icon
                      span(v-text="train")
                    span
                      time-until(
                        :date="time",
                        :interval="1"
                      )
              span(v-else) There are no train estimates for this trip.
        template(slot="actions")
          .btn__group
            button.btn(@click="toggleFavorite")
              icon(:icon="favorite ? 'favorite' : 'favorite-empty'")
</template>

<script>
  import { mapActions } from 'vuex';

  import TimeUntil from '@/components/time-until';
  import ViewAside from '@/components/layout/view-aside';

  import MetroLineLabel from '@/providers/metro/components/line-label';
  import MetroStationNextArrivals from '@/providers/metro/components/next-arrivals';
  import MetroStationDataProvider from '@/providers/metro/components/providers/station';

  import { stations as metroStations } from '@/providers/metro/data';

  // import generateId from '@/util/generate-id';

  const metroFavoriteFactory = station => ({
    // id: generateId(),
    id: `metro/${station}`,
    type: 'metro',
    details: { station }
  });

  export default {
    props: {
      id: String
    },
    data: () => ({
      metroStations
    }),
    computed: {
      favorite() {
        const { id } = this;
        const list = this.$store.state.favorites?.list || [];
        const favorite = list.find(item => item.details?.station === id);
        return favorite;
      }
    },
    methods: {
      ...mapActions('favorites', {
        add: 'add',
        remove: 'remove'
      }),
      toggleFavorite() {
        const { id, favorite } = this;
        if (favorite) {
          this.$store.dispatch('favorites/remove', favorite.id);
        } else {
          const data = metroFavoriteFactory(id);
          this.$store.dispatch('favorites/add', data);
        }
      }
    },
    components: {
      ViewAside,
      TimeUntil,
      MetroLineLabel,
      MetroStationNextArrivals,
      MetroStationDataProvider
    }
  };
</script>

<style lang="scss">
  .view--metro-station-detail {
    display: flex;
    flex-direction: column;
    .view--aside__contents {
      flex: 1;
    }
    .view--aside__actions {
      .btn__group {
        border-top: 1px solid grey(0.5, 0.05);
        .btn {
          margin-bottom: 0em;
        }
      }
    }
  }

  .metro__station__estimates {
    margin-bottom: 1em;
    h5 {
      margin-bottom: 0.75em;
    }
  }

  .metro__train__item {
    a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 0.25em;
      padding: 1em;
      margin-bottom: 1em;
      background-color: white;
      @include shadow;
    }
  }

  .metro__train__icon {
    display: inline-flex;
    justify-content: center;
    font-weight: bold;
    letter-spacing: 1 / 16 * 1em;
    // @include shadow;
  }

  .heading__labels {
    display: flex;
    & > * {
      &:not(:last-child) {
        margin-right: 1em;
      }
    }
  }

  .view--metro-station-detail {
    .heading__labels {
      & > * {
        &:first-child {
          margin-right: auto;
        }
        &:last-child {
          .heading-label {
            justify-content: flex-end;
          }
        }
      }
    }
  }

  .metro__line__labels {
    & > *:not(:first-child) {
      margin-left: 0.5em;
    }
    .metro__line__label {
      font-size: 0.75em;
    }
  }

  // .view--with-contents {
  //   display: flex;
  //   flex-direction: column;
  //   padding: 0;
  //   overflow: initial;
  //   .view__contents {
  //     flex: 1;
  //     overflow-y: auto;
  //     padding: 1em;
  //   }
  //   .view__actions {
  //     flex: 0;
  //   }
  // }
</style>
