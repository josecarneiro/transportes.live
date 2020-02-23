<template lang="pug">
  .nav
    router-link(to="/") transportes.live
</template>

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
    a {
      pointer-events: initial;
      display: inline-flex;
      padding: 1.25em;
      font-weight: bold;
      color: #2c3e50;
      // &.router-link-exact-active {
      //   color: #42b983;
      // }
      background-color: white;
      @include shadow();
    }
  }
</style>
