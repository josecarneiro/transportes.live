<template lang="pug">
  view-aside
    h1 Settings
    select(v-model="$i18n.locale")
      option(
        v-for="(lang, i) in ['pt', 'en']"
        :key="i"
        :value="lang",
        v-text="lang"
      )
</template>

<script>
  import ViewAside from '@/components/layout/view-aside';

  export default {
    components: {
      ViewAside
    }
  };
</script>

<style lang="scss">
  .view--about {
    justify-content: center;
    p {
      font-size: 1.125em;
    }
  }
</style>
