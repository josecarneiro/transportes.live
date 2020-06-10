<template lang="pug">
  view-aside.view--carris--vehicle
    template(v-if="vehicle && route")
      //- button(@click="$emit('control', 'zoom-out')")
        icon(icon="favorite")
      h1
        | {{ vehicle.route }}
        em {{ id }}
      h4 {{ route.name }}
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
  import { VehicleDetailService, loadRoute } from '@/providers/carris/services';

  import Icon from '@/components/icon';
  import ViewAside from '@/components/view/aside';

  const vehicleDetailService = new VehicleDetailService();

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
          const vehicle = await vehicleDetailService.load(this.id);
          this.vehicle = vehicle;

          if (this.vehicle) {
            const route = await loadRoute(this.vehicle.route);
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

<style lang="scss">
  .view--carris--vehicle {
    h1 {
      display: flex;
      em {
        color: grey();
        font-style: inherit;
        margin-left: auto;
        // &:before {
        //   content: '•';
        //   margin: 0 0.5em;
        // }
      }
    }
  }
</style>
