<template lang="pug">
  view-aside
    h1 Routes
    ul.route__list
      li.route__item(
        v-for="{ id, name } in routes",
        :key="id"
      )
        router-link(:to="{ name: 'carris/route', params: { id } }")
          strong(v-text="id")
          span(v-text="name")
</template>

<script>
  import ViewAside from '@/components/layout/view-aside';

  import routes from '@/providers/carris/data/routes';

  export default {
    data: () => ({ routes }),
    components: {
      ViewAside
    }
  };
</script>

<style lang="scss">
  .route__item {
    a {
      display: flex;
      align-items: center;
      padding: 1em;
      margin-bottom: 1em;
      background-color: white;
      @include shadow;
    }
    strong {
      margin-right: 1rem;
      font-size: 1.5em;
    }
  }
</style>
