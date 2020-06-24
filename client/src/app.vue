<template lang="pug">
  #app
    navigation-bar
    map-view
    transition(name="slide")
      router-view.view.view--aside(name="aside")
    router-view.view.view--overlay(name="overlay")
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

  .view--overlay {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    padding: 6em 5em 5em 1em;
  }
</style>
