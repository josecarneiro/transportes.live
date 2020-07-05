<script>
  import NavigateBackWrapper from '@/components/wrappers/navigate-back';

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
        'div',
        {
          class: mergeClasses(
            `view--aside--${size}`,
            height === 'full' ? 'view--aside--tall' : [],
            classes,
            staticClass
          )
        },
        [
          createElement(NavigateBackWrapper),
          createElement('transition', { props: { name: 'slide' } }, [
            createElement(
              'main',
              {
                class: mergeClasses('view--aside__content'),
                on: {
                  ...(preventBackNavigationOnSafari && {
                    touchstart: preventBackNavigation
                  })
                }
              },
              children
            )
          ])
        ]
      )
  };
</script>

<style lang="scss">
  $radius: 1.5em;

  .view--aside {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 200;
    display: flex;
    // flex-direction: column;
    width: 100%;
    // max-height: calc(100% - 6em);
    // max-height: calc(100% - env(safe-area-inset-top) - 6em);
    // @include screen(medium) {
    //   max-height: calc(100% - 1em);
    // }
    padding-top: 6em;
    padding-top: calc(env(safe-area-inset-top) + 6em);
    @include screen(medium) {
      padding-top: 1em;
    }
    // & > * {
    //   flex: 0;
    // }
    & > button {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-color: hsla(0, 0, 100%, 0.5);
      backdrop-filter: blur(1px);
    }
  }

  .view--aside__content {
    flex: 1;
    width: 100%;
    padding: 1em;
    margin-left: auto;
    overflow-y: auto;
    background-color: white;
    border-radius: $radius $radius 0 0;
    will-change: transform;
    &.slide-enter-active,
    &.slide-leave-active {
      transform: translateY(0);
    }
    &.slide-enter,
    &.slide-leave-to {
      transform: translateY(100%);
    }
    @include shadow(-0.125em);
    .view--aside--tall & {
      height: 100%;
    }
    .view--aside--small & {
      @include screen(medium) {
        @include shadow();
        max-width: 36em;
        padding-top: 1em;
        // padding-top: 2em;
      }
    }
    .view--aside--medium & {
      @include screen(medium) {
        @include shadow();
        max-width: 36em;
      }
    }
    .view--aside--full & {
      @include screen(large) {
        max-width: initial;
      }
    }
  }
</style>
