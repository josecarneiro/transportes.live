<template lang="pug">
  .view--aside
    slot
</template>

<style lang="scss">
  .view--aside {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    width: 100%;
    padding: 2em;
    padding-top: 6em;
    background-color: white;
    background-color: hsla(0, 0, 100%, 0.9);
    backdrop-filter: blur(2px);
    @media (min-width: 30em) {
      width: 30%;
      padding-top: 2em;
    }
  }
</style>
