<template lang="pug">
  view-aside
    template(v-if="vehicle")
      //- button(@click="$emit('control', 'zoom-out')")
        icon(icon="favorite")
      div(
        v-if="route"
      )
        h1 Route {{ vehicle.route }}
        h3 {{ route.name }}
        span
          strong Vehicle Id
          | : {{id}}
        div(
          v-for="item in route.variants"
          :key="item.variant"
        )
          span Variant \#{{ item.id }}
          div(
            v-for="itenerary in item.iteneraries",
            v-if="itenerary.connections && itenerary.connections.length"
          )
            h5 {{ itenerary.direction }}: {{itenerary.connections[0].stop.name}} - {{itenerary.connections[itenerary.connections.length - 1].stop.name}}
            ul
              li(v-for="connection in itenerary.connections")
                router-link(:to="{ name: 'carris/stop', params: { id: connection.stop.publicId } }")
                  span
                    | {{ connection.stop.publicId }} 
                    strong {{ connection.stop.name }}
</template>

<script>
  import { VehicleDetailService, RouteService } from '@/services/carris';

  import Icon from '@/components/icon';
  import ViewAside from '@/components/view/aside';

  export default {
    props: {
      id: String
    },
    data: () => ({
      vehicle: null,
      route: null
    }),
    watch: {
      id: {
        immediate: true,
        async handler() {
          this.vehicle = null;
          this.route = null;
          const vehicleDetailService = new VehicleDetailService(this.id);
          const vehicle = await vehicleDetailService.load();
          this.vehicle = vehicle;
          if (this.vehicle) {
            const routeService = new RouteService(this.vehicle.route);
            const route = await routeService.load();
            this.route = route;
          }
        }
      }
    },
    components: {
      ViewAside,
      Icon
    }
  };
</script>
