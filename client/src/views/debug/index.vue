<template lang="pug">
  view-aside
    h1 Debug
    router-link(:to="{ name: 'glance' }") At a glance
</template>

<script>
  import ViewAside from '@/components/layout/view-aside';

  export default {
    components: {
      ViewAside
    }
  };
</script>
