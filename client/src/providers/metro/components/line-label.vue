<template lang="pug">
  .metro__line__label(:class="classes")
    span(v-text="label")
</template>

<script>
  import LINE_NAME_MAP from '@/providers/metro/data/line-names';

  const CONVERSION_MAP = {
    vermelha: 'red',
    verde: 'green',
    azul: 'blue',
    amarela: 'yellow'
  };

  export default {
    props: {
      id: String
    },
    computed: {
      label() {
        return LINE_NAME_MAP[this.id];
      },
      classes() {
        const id = CONVERSION_MAP[this.id];
        return {
          ['metro__line__label--' + id]: true
        };
      }
    }
  };
</script>

<style lang="scss">
  @import '~@/providers/metro/style/variables.scss';

  .metro__line__label {
    display: inline-flex;
    padding: 0.25em 0.5em;
    border-radius: 0.25em;
    font-weight: bold;
    font-size: 0.875em;
    color: white;
    @include uppercase();
    background-color: grey();
    &.metro__line__label--red {
      background-color: $metro-line-color-red;
    }
    &.metro__line__label--blue {
      background-color: $metro-line-color-blue;
    }
    &.metro__line__label--green {
      background-color: $metro-line-color-green;
    }
    &.metro__line__label--yellow {
      background-color: $metro-line-color-yellow;
    }
  }
</style>
