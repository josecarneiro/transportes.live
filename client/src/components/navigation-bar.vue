<template lang="pug">
  .nav
    button(
      v-if="displayBackButton",
      @click="navigateBack"
    ) Go Back
    router-link(to="/") transportes.live
</template>

<script>
  export default {
    computed: {
      displayBackButton() {
        const { matched } = this.$route;
        const hasOverlay = matched.some(({ components }) => components.overlay);
        return hasOverlay;
      }
    },
    methods: {
      navigateBack() {
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="scss">
  @import '~@/style/utilities.scss';

  .nav {
    position: fixed;
    top: 0;
    top: env(safe-area-inset-top);
    left: 0;
    z-index: 300;
    width: 100%;
    padding: 1em;
    pointer-events: none;
    & > * {
      pointer-events: initial;
    }
    a,
    button {
      display: inline-flex;
      padding: 1.25em;
      font-weight: bold;
      background-color: white;
      @include shadow();
      // &.router-link-exact-active {
      //   color: #42b983;
      // }
    }
    button + a {
      display: none;
    }
    @media (min-width: 30em) {
      a {
        display: inline-flex;
      }
    }
  }
</style>
