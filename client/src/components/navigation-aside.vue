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
    { name: 'map/carris', icon: 'bus' },
    { name: 'map/metro', icon: 'subway' },
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
  .disabled {
    pointer-events: none;
    color: grey(0.8);
  }

  body {
    line-height: 1.5;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  button {
    font: inherit;
    color: inherit;
    border: 0;
    background-color: transparent;
    -webkit-appearance: none;
  }

  .side__navigation {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 4em;
    min-height: 4em;
    a {
      &:not(.active) {
        box-shadow: 0 0;
        &:not(.disabled) {
          color: grey(0.5, 1, 0.1);
        }
      }
    }
    &:not(.toggled) {
      .active {
        z-index: 30;
      }
      a:not(.active) {
        transform: translateY(-15%) scale(0.85);
      }
      .active {
        // box-shadow: 0 0 1em -0.5em grey(0.6);
        @include shadow;
      }
    }
    &.toggled {
      @include shadow;
      a {
        position: inherit;
      }
      button {
        display: none;
      }
    }
    a {
      position: absolute;
      display: flex;
      justify-content: center;
      width: 4em;
      padding: 1em 0;
      text-align: center;
      background-color: white;
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

  a.disabled {
    color: grey(0.9);
  }
</style>
