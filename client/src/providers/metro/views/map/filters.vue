<template lang="pug">
  .map__controls
    router-link.map__control(
      :to="{ name: 'metro/station/list' }"
      replace
    )
      icon(icon="station")
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
