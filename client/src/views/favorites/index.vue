<template lang="pug">
  .view--glance
    .container
      h1.title(v-text="$t('message.title')")
      favorites-list
</template>

<script>
  import FavoritesList from './list';

  export default {
    i18n: {
      messages: {
        pt: { message: { title: 'Favoritos' } },
        en: { message: { title: 'Favorites' } }
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
