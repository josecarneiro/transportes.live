<template lang="pug">
  view-aside
    template(v-if="route")
      small.heading-label Route
      h1(v-text="id")
      small.heading-label Name
      h4(v-text="route.name")
      small.heading-label Route Information
      div(
        v-for="item in route.variants"
        :key="item.variant"
      )
        small.heading-label Variant \#{{ item.id }}
        div(
          v-for="itenerary in item.iteneraries",
          v-if="itenerary.connections && itenerary.connections.length"
        )
          h6 {{ directionMap[itenerary.direction] }}: {{itenerary.connections[0].stop.name}} - {{itenerary.connections[itenerary.connections.length - 1].stop.name}}
          ul.carris__itenerary
            li.carris__itenerary__item(v-for="{ stop } in itenerary.connections")
              router-link(:to="{ name: 'carris/stop', params: { id: stop.id } }")
                strong(v-text="stop.id")
                span(v-text="stop.name")
</template>

<script>
  import { loadRoute } from '@/providers/carris/services';

  import ViewAside from '@/components/view/aside';

  export default {
    props: {
      id: String
    },
    data: () => ({
      route: null,
      directionMap: {
        ASC: 'Ascendente',
        DESC: 'Descendente',
        CIRC: 'Circular'
      }
    }),
    watch: {
      id: {
        immediate: true,
        async handler() {
          const { id } = this;
          const route = await loadRoute(id);
          this.route = route;
        }
      }
    },
    components: {
      ViewAside
    }
  };
</script>

<style lang="scss">
  .carris__itenerary__item {
    margin-bottom: 0.25em;
    a {
      display: flex;
    }
    strong {
      margin-right: 1em;
    }
  }
</style>
