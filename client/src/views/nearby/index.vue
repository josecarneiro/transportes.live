<template lang="pug">
  .view--glance
    .container
      h1 At a glance
      favorites-carris(
        v-if="favoritesPerProvider.carris",
        :favorites="favoritesPerProvider.carris"
      )
</template>

<script>
  import { mapState } from 'vuex';

  import FavoritesCarris from './favorites/carris';

  import loadNearby from '@/services/load-nearby';

  const DEFAULT_FAVORITES = [
    { type: 'metro', details: { stop: 'LA', direction: 'SP' } },
    { type: 'metro', details: { stop: 'CS', direction: 'TE' } },
    { type: 'carris', details: { stop: '13620', route: '701' } },
    { type: 'carris', details: { stop: '13620', route: '738' } },
    { type: 'carris', details: { stop: '13621', route: '701' } }
  ];

  export default {
    data: () => ({
      favorites: [...DEFAULT_FAVORITES]
    }),
    computed: {
      favoritesPerProvider() {
        const { favorites } = this;
        return favorites.reduce((acc, { type, details }) => {
          if (!acc[type]) acc[type] = [];
          acc[type].push(details);
          return acc;
        }, {});
      },
      ...mapState('location', {
        coordinates: ({ position }) => position && position.coordinates
      })
    },
    async created() {
      const coordinates = this.coordinates;
      if (coordinates) {
        const start = performance.now();
        const nearby = await loadNearby(coordinates);
        const end = performance.now();
        console.log(`Call took ${end - start} milliseconds.`);
        console.log(nearby);
      }
    },
    components: {
      FavoritesCarris
    }
  };
</script>

<style lang="scss">
  .view--glance {
    background-image: linear-gradient(white, grey(1, 0, 0));
    // .container {
    // }
  }
</style>
