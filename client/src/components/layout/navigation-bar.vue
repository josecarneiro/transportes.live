<template lang="pug">
  .nav
    navigate-back-wrapper.btn.btn--default(v-if="displayBackButton")
      icon(icon="arrow-left")
    router-link.btn.btn--default(:to="logoLink") transportes.live
</template>

<script>
  import NavigateBackWrapper from '@/components/wrappers/navigate-back';
  import Icon from '@/components/icon';

  export default {
    computed: {
      displayBackButton() {
        const { matched } = this.$route;
        const hasAside = matched.some(({ components }) => components.aside);
        console.log(matched, hasAside);
        return hasAside;
      },
      logoLink() {
        const { name } = this.$route;
        if (name) {
          const parts = name.split('/');
          const [provider] = parts;
          if (['carris', 'metro', 'gira'].includes(provider)) {
            return `/${provider}`;
          }
        }
        return { name: 'home' };
      }
    },
    methods: {
      navigateBack() {
        this.$router.go(-1);
      }
    },
    components: {
      NavigateBackWrapper,
      Icon
    }
  };
</script>

<style lang="scss">
  @import '~@/style/utilities.scss';

  .nav {
    position: fixed;
    top: 0;
    top: env(safe-area-inset-top);
    left: 0;
    z-index: 300;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1em;
    pointer-events: none;
    & > * {
      pointer-events: initial;
    }
    a,
    button {
      font-weight: bold;
      // &.router-link-exact-active {
      //   color: #42b983;
      // }
      &:last-child {
        margin-right: 0;
      }
    }
    $button-back-breakpoint: medium;
    @include screen($button-back-breakpoint) {
      button {
        display: none;
      }
    }
  }
</style>
