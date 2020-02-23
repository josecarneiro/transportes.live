<template lang="pug">
  .nav
    router-link(to="/") transportes.live
</template>

<style lang="scss">
  .nav {
    position: fixed;
    top: 0;
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
    }
  }
</style>
