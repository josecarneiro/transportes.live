<template lang="pug">
  .map__controls
    router-link.map__control(
      v-if="!layers.stops",
      :to="{ name: 'carris/map', query: { stops: true } }"
      replace
    )
      icon(icon="stop")
    router-link.map__control(
      v-else,
      :to="{ name: 'carris/map' }"
      replace
    )
      icon(icon="stop")
</template>

<script>
  import Icon from '@/components/icon';

  export default {
    computed: {
      layers() {
        const { query } = this.$route;
        return {
          stops: !!query.stops
        };
      }
    },
    components: {
      Icon
    }
  };
</script>
