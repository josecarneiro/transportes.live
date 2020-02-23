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
    width: 30%;
    padding: 2em;
    background-color: white;
    background-color: hsla(0, 0, 100%, 0.9);
    backdrop-filter: blur(2px);
  }
</style>
