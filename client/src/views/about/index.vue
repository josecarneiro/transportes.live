<template lang="pug">
  view-aside.view--about
    h1 About 
    include copy
</template>

<script>
  import ViewAside from '@/components/view/aside';

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
