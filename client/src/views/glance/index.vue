<template lang="pug">
  .view--glance
    .container
      h1.title(v-text="$t('message.glanceTitle')")
      h3.title(v-text="$t('message.favoritesTitle')")
      favorites-list(:limit="3")
      h3.title(v-text="$t('message.nearbyTitle')")
      nearby-list(:limit="3")
</template>

<script>
  import FavoritesList from '@/views/favorites/list';
  import NearbyList from '@/views/nearby/list';

  export default {
    i18n: {
      messages: {
        pt: { message: { title: 'Favoritos' } },
        en: {
          message: {
            glanceTitle: 'At a Glance',
            favoritesTitle: 'Favorites',
            nearbyTitle: 'Nearvy'
          }
        }
      }
    },
    components: {
      FavoritesList,
      NearbyList
    }
  };
</script>

<style lang="scss">
  .view--glance {
    background-image: linear-gradient(white, grey(1, 0, 0));
  }
</style>
