<template lang="pug">
  aside.side__navigation(
    :class="{ toggled }"
    @blur="toggled = false"
  )
    button(
      @click="toggled = true"
    )
    router-link.map__control(
      v-for="{ name, icon, disabled } in links",
      :key="icon",
      :to="{ name }"
      :class="{ disabled }"
      v-bind="{ disabled }"
      @click="toggled = false"
    )
      icon(v-bind="{ icon }")
</template>

<script>
  import Icon from '@/components/icon';

  const LINKS = [
    { name: 'carris/map', icon: 'bus' },
    { name: 'metro/map', icon: 'subway' },
    { name: 'about', icon: 'train', disabled: true },
    { name: 'about', icon: 'boat', disabled: true },
    { name: 'about', icon: 'bicycle' }
  ];

  export default {
    data: () => ({
      links: LINKS,
      toggled: false
    }),
    watch: {
      $route() {
        this.toggled = false;
      }
    },
    methods: {},
    components: {
      Icon
    }
  };
</script>

<style lang="scss">
  .side__navigation {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 4em;
    min-height: 4em;
    &:not(.toggled) {
      // a {
      //   position: absolute;
      // }
      a:not(.active) {
        display: none;
      }
      .active {
        // z-index: 30;
        @include shadow;
      }
      &:before {
        content: '';
        position: absolute;
        top: 0em;
        left: 0em;
        z-index: -1;
        display: flex;
        width: 4em;
        height: 4em;
        background-color: white;
        transform: translateY(-15%) scale(0.85);
      }
    }
    &.toggled {
      @include shadow;
      // a {
      //   position: inherit;
      // }
      button {
        display: none;
      }
    }
    a {
      display: flex;
      justify-content: center;
      width: 4em;
      padding: 1em 0;
      text-align: center;
      background-color: white;
      &:not(.active) {
        box-shadow: 0 0;
        &:not(.disabled) {
          color: grey(0.5, 1, 0.1);
        }
      }
    }
    button {
      position: absolute;
      z-index: 50;
      width: 100%;
      height: 100%;
      display: flex;
      .toggled & {
        display: none;
      }
    }
  }
</style>
