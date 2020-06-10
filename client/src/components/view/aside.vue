<template lang="pug" functional>
  .view--aside(:class="[data.class, data.staticClass]")
    slot
</template>

<style lang="scss">
  .view--aside {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1em;
    padding-top: 6em;
    padding-top: calc(env(safe-area-inset-top) - 0em + 6em);
    background-color: white;
    background-color: hsla(0, 0, 100%, 0.9);
    backdrop-filter: blur(2px);
    overflow-y: auto;
    @media (min-width: 30em) {
      max-width: 26em;
      padding-top: 2em;
    }
  }
</style>
