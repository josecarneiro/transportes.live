<template lang="pug">
  view-aside.view--carris--vehicle
    template(v-if="vehicle && route")
      //- button(@click="$emit('control', 'zoom-out')")
        icon(icon="favorite")
      .vehicle__title
        div
          small.heading-label Route
          h1(v-text="vehicle.route")
        div
          small.heading-label Number
          h1(v-text="id")
      small.heading-label Destination
      h4(v-text="route.name")
      small.heading-label More
      router-link.btn.btn--default(
        :to="{ name: 'carris/route', params: { id: vehicle.route } }"
      ) Route Information
      router-link.btn.btn--default(
        :to="{ name: 'home' }",
        disabled
      )
        | Buses in this route
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
      flex: 0;
      display: flex;
      em {
        color: grey();
        font-style: inherit;
        margin-left: auto;
      }
    }
  }

  .vehicle__title {
    display: flex;
    justify-content: space-between;
  }
</style>
