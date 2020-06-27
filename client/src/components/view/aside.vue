<script>
  import mergeClasses from '@/util/merge-classes';

  export default {
    functional: true,
    render: (
      createElement,
      {
        props: { preventBackNavigationOnSafari = false, size = 'small' },
        data: { class: classes, staticClass },
        children
      }
    ) =>
      createElement(
        'div',
        {
          class: mergeClasses(
            'view--aside',
            `view--aside--${size}`,
            classes,
            staticClass
          ),
          on: {
            ...(preventBackNavigationOnSafari && {
              touchstart: event => {
                const THRESHOLD = 30;
                const { pageX: x } = event;
                const { innerWidth: width } = window;
                if (x <= THRESHOLD || x >= width - THRESHOLD) {
                  event.preventDefault();
                }
              }
            })
          }
        },
        children
      )
  };
</script>

<style lang="scss">
  .view--aside {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    // display: flex;
    // flex-direction: column;
    // justify-content: flex-start;
    // align-items: flex-start;
    width: 100%;
    height: 100%;
    padding: 1em;
    padding-top: 6em;
    padding-top: calc(env(safe-area-inset-top) - 0em + 6em);
    background-color: white;
    background-color: hsla(0, 0, 100%, 0.9);
    backdrop-filter: blur(2px);
    overflow-y: auto;
    & > * {
      flex: 0;
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
        // padding-top: 1em;
        // padding-top: 2em;
      }
    }

    &.view--aside--full {
      @include screen(large) {
        @include shadow();
        max-width: initial;
        // padding-top: 1em;
        // padding-top: 2em;
      }
    }
  }

  .view--aside__content {
  }
</style>
