<template lang="pug">
  view-aside(size="full").view--about
    h1 Settings 
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
