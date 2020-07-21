<template lang="pug">
  view-aside
    h1.title Debug
    h3.title Views
    ul
      li(v-for="{ link, title } in views")
        router-link(:to="link", v-text="title")
</template>

<script>
  import ViewAside from '@/components/layout/view-aside';

  const views = [
    { link: { name: 'glance' }, title: 'At a glance' },
    { link: { name: 'favorites' }, title: 'Favorites' },
    { link: { name: 'nearby' }, title: 'Nearby' }
  ];

  export default {
    data: () => ({ views }),
    components: {
      ViewAside
    }
  };
</script>
