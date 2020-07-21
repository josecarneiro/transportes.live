<template lang="pug">
  carris-stop-data-provider(v-bind="{ id }")
    template(slot-scope="{ loaded, stop, estimates }")
      view-aside(v-if="loaded")
        template
          .title__container
            div
              small.heading-label Stop
              h1(v-text="id")
            div
              small.heading-label Location
              h3.placeholder.placeholder--long(v-text="stop && stop.name")
          small.heading-label Next arrivals
          template(v-if="loaded")
            carris-stop-next-arrivals(v-bind="{ stop, estimates }")
          small.heading-label All Estimates
          template(v-if="!estimates || !estimates.length")
            span There are no estimates for this stop...
          template(v-else)
            ul.carris__estimate__list
              li.carris__estimate__item(
                v-for="{ id, plate, route, routeName, time } of estimates"
                :key="plate"
              )
                component(
                  :is="id ? 'router-link' : 'div'",
                  :to="id && { name: 'carris/vehicle', params: { id } }"
                )
                  strong(v-text="route")
                  em(v-text="routeName")
                  time-until(
                    :date="time"
                    :interval="5"
                  )
        template(slot="actions")
          .btn__group
            button.btn(@click="toggleFavorite")
              icon(:icon="favorite ? 'favorite' : 'favorite-empty'")
</template>

<script>
  import { mapActions } from 'vuex';
  import TimeUntil from '@/components/time-until';
  import ViewAside from '@/components/layout/view-aside';

  import CarrisStopDataProvider from '@/providers/carris/components/providers/stop';
  import CarrisStopNextArrivals from '@/providers/carris/components/next-arrivals';

  const carrisFavoriteFactory = stop => ({
    id: `carris/${stop}`,
    type: 'carris',
    details: { stop }
  });

  export default {
    props: {
      id: String
    },
    computed: {
      favorite() {
        const { id } = this;
        const list = this.$store.state.favorites?.list || [];
        const favorite = list.find(item => item.details?.stop === id);
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
          const data = carrisFavoriteFactory(id);
          this.$store.dispatch('favorites/add', data);
        }
      }
    },
    components: {
      ViewAside,
      TimeUntil,
      CarrisStopNextArrivals,
      CarrisStopDataProvider
    }
  };
</script>

<style lang="scss">
  .carris__estimate__item {
    margin-bottom: 1em;
    & > * {
      display: flex;
      padding: 1em;
      background-color: white;
      @include shadow;
      strong {
        margin-right: 1em;
      }
      span:last-child {
        margin-left: auto;
        white-space: nowrap;
        // margin-left: 1em;
        text-align: right;
      }
      em {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-right: 1em;
      }
    }
  }
</style>
