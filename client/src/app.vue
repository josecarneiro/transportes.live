<template lang="pug">
  #app
    navigation-bar
    map-view
    transition(name="transparency")
      overlay-back-navigation-trigger(v-if="navigationIsAside")
    transition(name="slide")
      router-view.view.view--aside(name="aside")
    router-view.view.view--overlay(name="overlay")
</template>

<script>
  import OverlayBackNavigationTrigger from '@/components/layout/overlay-back-navigation-trigger';

  import NavigationBar from '@/components/layout/navigation-bar';

  import MapView from '@/views/map/index';

  export default {
    computed: {
      navigationIsAside() {
        return this.$route.matched.some(({ components }) => components.aside);
      }
    },
    components: {
      NavigationBar,
      MapView,
      OverlayBackNavigationTrigger
    }
  };
</script>

<style lang="scss">
  @import '~@/style/main.scss';

  // $slide-duration: 0.25s;
  // $slide-duration: 0.25s;
  $slide-duration: 0.275s;
  // $slide-duration: 0.325s;

  .slide-enter-active,
  .slide-leave-active {
    transition: transform $slide-duration ease;
    transform: translateY(0);
  }

  .slide-enter-active {
    transition-timing-function: $ease-out;
  }

  .slide-leave-active {
    transition-timing-function: $ease-in;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translateY(100%);
  }

  .view--overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 6em 5em 5em 1em;
  }

  // .transparency
  .transparency-enter-active,
  .transparency-leave-active {
    transition: all $slide-duration ease;
    opacity: 1;
  }

  .transparency-enter-active {
    transition-timing-function: $ease-out;
  }

  .transparency-leave-active {
    transition-timing-function: $ease-in;
  }

  .transparency-enter,
  .transparency-leave-to {
    opacity: 0;
  }
</style>
