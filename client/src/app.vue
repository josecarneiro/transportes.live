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
    watch: {
      navigationIsAside: {
        immediate: true,
        handler(value) {
          const className = 'no-scroll';
          const body = document.body;
          if (value) {
            body.classList.add(className);
          } else {
            body.classList.remove(className);
          }
        }
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

  // .no-scroll {
  //   overflow: hidden;
  // }

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
    z-index: 100;
    width: 100%;
    height: 100%;
    padding: 1em;
    padding-top: 6em;
    padding-bottom: 5em;
    // padding-right: 5em;
    // padding: 6em 5em 5em 1em;
    overflow-y: auto;
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
