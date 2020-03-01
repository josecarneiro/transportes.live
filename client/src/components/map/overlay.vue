<template lang="pug">
  .map__overlay
    .map__controls
      slot
    button.map__control.map__control--locate(@click="$emit('control', 'locate')")
      icon(icon="location")
    .map__controls.map__controls--zoom
      button.map__control.map__control--zoom(@click="$emit('control', 'zoom-in')")
        icon(icon="plus")
      button.map__control.map__control--zoom(@click="$emit('control', 'zoom-out')")
        icon(icon="minus")
</template>

<script>
  import Icon from '@/components/icon';

  export default {
    components: {
      Icon
    }
  };
</script>

<style lang="scss">
  @import '~@/style/utilities.scss';

  .map__overlay {
    position: fixed;
    top: 0;
    top: calc(env(safe-area-inset-top));
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 1em;
    padding-bottom: 1em + 14 * 1em / 16;
    pointer-events: none;
    & > * {
      pointer-events: initial;
    }
    & > .map__control,
    & > .map__controls {
      @include shadow();
    }
  }

  $icon-size: 1.25em;

  .map__control {
    display: flex;
    justify-content: center;
    align-items: center;
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
    &:first-child {
      margin-bottom: auto;
    }
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
