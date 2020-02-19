<template lang="pug">
  #app
    navigation-bar
    map-view
    transition(name="slide")
      router-view
</template>

<script>
  import NavigationBar from '@/components/navigation-bar';

  import MapView from '@/views/map/index';

  export default {
    components: {
      NavigationBar,
      MapView
    }
  };
</script>

<style lang="scss">
  @import '~@/style/main.scss';

  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.25s ease;
    // transition: opacity 0.5s;
    transform: translate(0);
  }

  .slide-enter-active {
    transition-timing-function: ease-out;
  }

  .slide-leave-active {
    transition-timing-function: ease-in;
  }

  .slide-enter,
  .slide-leave-to {
    // opacity: 0;
    transform: translate(100%);
  }
</style>
