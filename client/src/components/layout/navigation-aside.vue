<template lang="pug">
  aside.side__navigation(
    :class="{ 'side__navigation--toggled': toggled }",
    @blur="toggled = false"
  )
    router-link.map__control(
      v-for="{ name, icon, disabled } in links",
      :key="icon",
      :to="{ name }",
      :class="{ disabled }",
      v-bind="{ disabled }",
      @click="toggled = false"
    )
      icon(v-bind="{ icon }")
    button.map__control.map__control--toggle(@click="toggled = !toggled")
      icon(icon="menu")
</template>

<script>
  import Icon from '@/components/icon';

  import { providers as providersConfiguration } from '@/config';

  const LINKS = [
    ...[
      { id: 'carris', name: 'carris/map', icon: 'bus' },
      { id: 'metro', name: 'metro/map', icon: 'subway' },
      { id: 'cp', name: 'error', icon: 'train' },
      // { id: 'boat', name: 'error', icon: 'boat' },
      { id: 'gira', name: 'gira/map', icon: 'bicycle' }
    ].map(({ name, ...link }) => {
      const disabled = !providersConfiguration[link.id];
      return { ...link, name: disabled ? 'error' : name, disabled };
    }),
    { id: 'favorites', name: 'favorites', icon: 'favorite' },
    { id: 'about', name: 'about', icon: 'about' }
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
    &:not(.side__navigation--toggled) {
      a:not(.active) {
        display: none;
      }
      .active {
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
    .map__control {
      display: flex;
      justify-content: center;
      width: 4em;
      padding: 1em 0;
      text-align: center;
      background-color: white;
      &:not(.active) {
        box-shadow: 0 0;
        &:not(.disabled):not(.map__control--toggle) {
          color: grey(0.5, 1, 0.1);
        }
      }
    }
    .map__control--toggle {
      position: absolute;
      z-index: 50;
      opacity: 0;
    }
    &.side__navigation--toggled {
      @include shadow;
      a {
        position: inherit;
      }
      .map__control--toggle {
        position: static;
        opacity: 1;
      }
    }
  }
</style>
