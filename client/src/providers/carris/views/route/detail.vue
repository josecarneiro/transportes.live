<template lang="pug">
  view-aside
    small.heading-label Route
    h1(v-text="id")
    template(v-if="route")
      small.heading-label Name
      h4(v-text="route.name")
      small.heading-label Route Information
      div(
        v-for="item in route.variants"
        :key="item.variant"
      )
        span Variant \#{{ item.id }}
        div(
          v-for="itenerary in item.iteneraries",
          v-if="itenerary.connections && itenerary.connections.length"
        )
          strong {{ itenerary.direction }}: {{itenerary.connections[0].stop.name}} - {{itenerary.connections[itenerary.connections.length - 1].stop.name}}
          ul
            li(v-for="connection in itenerary.connections")
              router-link(:to="{ name: 'carris/stop', params: { id: connection.stop.publicId } }")
                span
                  | {{ connection.stop.publicId }} 
                  strong {{ connection.stop.name }}
</template>

<script>
  import { loadRoute } from '@/providers/carris/services';

  import ViewAside from '@/components/view/aside';

  export default {
    props: {
      id: String
    },
    data: () => ({
      route: null
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
