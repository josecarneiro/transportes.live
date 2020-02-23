<template lang="pug">
  .map__overlay
    button.map__control.map__control--locate(@click="$emit('control', 'locate')")
      icon-location
    .map__controls.map__controls--zoom
      button.map__control.map__control--zoom(@click="$emit('control', 'zoom-in')")
        icon-plus
      button.map__control.map__control--zoom(@click="$emit('control', 'zoom-out')")
        icon-minus
</template>

<script>
  import IconPlus from 'vue-material-design-icons/Plus';
  import IconMinus from 'vue-material-design-icons/Minus';
  import IconLocation from 'vue-material-design-icons/NearMe';

  export default {
    components: {
      IconPlus,
      IconMinus,
      IconLocation
    }
  };
</script>

<style lang="scss">
  .map__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    // align-items: center;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 1em;
    padding-bottom: 1em + 14 * 1em / 16;
    pointer-events: none;
    & > * {
      pointer-events: initial;
    }
  }

  $icon-size: 1.25em;

  .map__control {
    width: 4em;
    height: 4em;
    background-color: white;
    padding: 0;
    .material-design-icon {
      &,
      & > .material-design-icon__svg {
        width: $icon-size;
        height: $icon-size;
      }
    }
  }

  .map__controls {
    display: flex;
    flex-direction: column;
  }

  .map__controls--zoom {
    // justify-self: flex-end;
    // align-self: flex-end;
    // margin-left: auto;
  }

  .map__control--locate {
    // align-self: flex-end;
    // margin-left: auto;
    margin-bottom: 1em;
  }
</style>
