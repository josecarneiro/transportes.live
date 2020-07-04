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
  import FavoritesCarris from './favorites/carris';

  export default {
    data: () => ({
      favorites: [
        { type: 'metro', details: { stop: 'LA', direction: 'SP' } },
        { type: 'metro', details: { stop: 'CS', direction: 'TE' } },
        { type: 'carris', details: { stop: '13620', route: '701' } },
        { type: 'carris', details: { stop: '13620', route: '738' } },
        { type: 'carris', details: { stop: '13621', route: '701' } }
      ]
    }),
    computed: {
      favoritesPerProvider() {
        const { favorites } = this;
        return favorites.reduce((acc, { type, details }) => {
          if (!acc[type]) acc[type] = [];
          acc[type].push(details);
          return acc;
        }, {});
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
