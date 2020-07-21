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
    $transparency: 0.5;
    // $transparency: 0.625;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: grey(1, $transparency);
    backdrop-filter: blur(1px);
  }
</style>
