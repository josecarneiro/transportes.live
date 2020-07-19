<template lang="pug">
  .view--glance
    .container
      h1.title(v-text="$t('message.title')")
      nearby-list
</template>

<script>
  import NearbyList from './list';

  export default {
    i18n: {
      messages: {
        pt: { message: { title: 'Próximos' } },
        en: { message: { title: 'Nearby' } }
      }
    },
    components: {
      NearbyList
    }
  };
</script>

<style lang="scss">
  .view--glance {
    background-image: linear-gradient(white, grey(1, 0, 0));
  }
</style>
