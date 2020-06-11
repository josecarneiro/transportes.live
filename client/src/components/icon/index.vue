<script>
  import mergeClasses from '@/util/merge-classes';

  export default {
    functional: true,
    render: (createElement, { props: { icon }, data: { class: classes, staticClass } }) =>
      createElement('i', {
        class: mergeClasses('icon', `icon--${icon}`, classes, staticClass)
      })
  };
</script>

<style src="./style.scss" lang="scss"></style>
