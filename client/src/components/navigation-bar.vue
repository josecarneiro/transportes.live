<template lang="pug">
  .nav
    router-link(to="/") transportes.live
</template>

<style lang="scss">
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      // &.router-link-exact-active {
      //   color: #42b983;
      // }
    }
  }
</style>
