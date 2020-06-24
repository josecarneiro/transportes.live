<template lang="pug">
  custom-map-marker(v-bind="{ position }")
    .user-position
      .user-position__dot
      .user-position__disks
</template>

<script>
  import CustomMapMarker from '@/components/map/custom-marker';

  export default {
    props: {
      position: Object
    },
    components: {
      CustomMapMarker
    }
  };
</script>

<style lang="scss">
  $dot-size: 1em;
  $disk-size: $dot-size * 5;

  $dot-color: grey(0.7, 1, 1);
  $disk-color: rgba($dot-color, 0.35);

  .user-position {
    position: relative;
    transform: translate(-50%, -50%);
  }

  .user-position__dot {
    display: block;
    width: $dot-size;
    height: $dot-size;
    border-radius: 50%;
    background-color: $dot-color;
  }

  .user-position__disks {
    position: absolute;
    z-index: -1;
    width: $disk-size;
    height: $disk-size;
    transform: translate(
      calc(-50% + #{$dot-size} / 2),
      calc(-50% - #{$dot-size} / 2)
    );
    // &:before,
    &:after {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      content: '';
      display: block;
      width: $disk-size;
      height: $disk-size;
      border-radius: 50%;
      background-color: $disk-color;
      animation: breathe 1s infinite ease-out;
    }
  }

  @keyframes breathe {
    from {
      transform: scale(0);
      opacity: 1;
    }

    to {
      transform: scale(1);
      opacity: 0;
    }
  }
</style>
