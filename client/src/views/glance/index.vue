<template lang="pug">
  .view--glance
    .container
      h1(v-text="$t('message.atAGlance')")
      favorites-list(v-bind="{ favorites }")
</template>

<script>
  import { mapState } from 'vuex';

  import FavoritesList from './list';

  import loadNearby from '@/services/load-nearby';

  export default {
    computed: {
      ...mapState('location', {
        coordinates: ({ position }) => position && position.coordinates
      }),
      ...mapState('favorites', {
        favorites: ({ list }) => list
      })
    },
    i18n: {
      messages: {
        pt: { message: { atAGlance: 'Numa vista de olhos' } },
        en: { message: { atAGlance: 'At a glance' } }
      }
    },
    async created() {
      const coordinates = this.coordinates;
      if (coordinates) {
        // const start = performance.now();
        const nearby = await loadNearby(coordinates);
        // const end = performance.now();
        // console.log(`Call took ${end - start} milliseconds.`);
        // console.log(nearby);
      }
    },
    components: {
      FavoritesList
    }
  };
</script>

<style lang="scss">
  .view--glance {
    background-image: linear-gradient(white, grey(1, 0, 0));
  }
</style>
