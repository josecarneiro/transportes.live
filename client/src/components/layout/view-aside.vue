<script>
  import mergeClasses from '@/util/merge-classes';

  const preventBackNavigation = event => {
    const THRESHOLD = 30;
    const { pageX: x } = event;
    const { innerWidth: width } = window;
    if (x <= THRESHOLD || x >= width - THRESHOLD) {
      event.preventDefault();
    }
  };

  export default {
    functional: true,
    render: (
      createElement,
      {
        props: {
          preventBackNavigationOnSafari = false,
          size = 'small',
          height = 'full'
        },
        data: { class: classes, staticClass },
        children
      }
    ) =>
      createElement(
        'main',
        {
          class: mergeClasses(
            `view--aside--${size}`,
            height === 'full' ? 'view--aside--tall' : [],
            classes,
            staticClass
          ),
          on: {
            ...(preventBackNavigationOnSafari && {
              touchstart: preventBackNavigation
            })
          }
        },
        children
      )
  };
</script>

<style lang="scss">
  $radius: 1.5em;

  .view--aside {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 200;
    width: 100%;
    // padding-top: 6em;
    // padding-top: calc(env(safe-area-inset-top) + 6em);
    max-height: calc(100% - 6em);
    max-height: calc(100% - (env(safe-area-inset-top) + 6em));
    padding: 1em;
    margin-left: auto;
    border-radius: $radius $radius 0 0;
    overflow-y: auto;
    background-color: white;
    will-change: transform;
    @include shadow(-0.125em);
    @include screen(medium) {
      padding-top: 1em;
    }
    // &:before {
    //   content: '';
    //   position: fixed;
    //   top: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 1em;
    //   // background-color: red;
    //   background-color: white;
    //   z-index: 10000;
    // }
    &.view--aside--tall {
      height: 100%;
    }
    &.view--aside--small {
      @include screen(medium) {
        @include shadow();
        max-width: 36em;
        padding-top: 1em;
        // padding-top: 2em;
      }
    }
    &.view--aside--medium {
      @include screen(medium) {
        @include shadow();
        max-width: 36em;
      }
    }
    &.view--aside--full {
      @include screen(large) {
        max-width: initial;
      }
    }
  }
</style>
