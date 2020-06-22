<template lang="pug">
  .map__controls
    router-link.map__control(
      :to="{ name: 'carris/map', ...!layers.stops && { query: { stops: true } } }"
      replace
    )
      icon(icon="stop")
    router-link.map__control(
      :to="{ name: 'carris/route/list' }"
    )
      icon(icon="routes")
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
