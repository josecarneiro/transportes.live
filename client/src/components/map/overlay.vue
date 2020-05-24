<template lang="pug">
  .map__overlay__wrapper
    .map__overlay
      .map__overlay__container.map__overlay__container--bottom-left
        slot(name="overlay-bottom-left")
      .map__overlay__container.map__overlay__container--top-right
        slot(name="overlay-top-right")
      //- .map__controls
      //-   slot(name="")
      .map__overlay__container.map__overlay__container--bottom-right
        .map__controls
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

  .map__overlay__wrapper {
    position: fixed;
    top: 0;
    top: calc(env(safe-area-inset-top));
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    padding: 1em;
    // padding-bottom: 1em + 14 * 1em / 16;
    // padding-bottom: 1em + 14 / 16 * 1em;
    padding-bottom: 26px; // Google icon size
    pointer-events: none;
  }

  .map__overlay {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    & > * {
      pointer-events: initial;
    }
  }

  .map__overlay__container {
    position: absolute;
  }

  .map__overlay__container--bottom-left {
    left: 0;
    bottom: 0;
  }

  .map__overlay__container--top-right {
    top: 0;
    right: 0;
  }

  .map__overlay__container--bottom-right {
    right: 0;
    bottom: 0;
  }

  .map__controls {
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
    @include shadow();
    // &:first-child {
    //   margin-bottom: auto;
    // }
    &:last-child {
      margin-bottom: 0;
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
</style>
