<script>
  import NavigateBackWrapper from '@/components/wrappers/navigate-back';

  import mergeClasses from '@/util/merge-classes';

  export default {
    functional: true,
    render: (
      createElement,
      { data: { class: classes, staticClass }, children }
    ) =>
      createElement(
        NavigateBackWrapper,
        {
          class: mergeClasses(
            'overlay-back-navigation-trigger',
            classes,
            staticClass
          )
        },
        children
      )
  };
</script>

<style lang="scss">
  .overlay-back-navigation-trigger {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: hsla(0, 0, 100%, 0.5);
    background-color: grey(1, 0.5);
    backdrop-filter: blur(1px);
  }
</style>
