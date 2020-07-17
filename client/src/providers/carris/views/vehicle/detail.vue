<template lang="pug">
  view-aside.view--carris--vehicle(type="pill")
    template
      .vehicle__title
        div
          small.heading-label Route
          h1.placeholder(v-text="vehicle && vehicle.route")
        div
          small.heading-label Number
          h1(v-text="id")
      small.heading-label Destination
      h4.placeholder.placeholder--long(v-text="route && route.name")
      //- small.heading-label More
    template(slot="actions")
      .btn__group
        router-link.btn(
          :to="vehicle ? { name: 'carris/route', params: { id: vehicle && vehicle.route } } : {}",
          :disabled="!vehicle"
        )
          icon(icon="route")
          span Route Information
        //- router-link.btn(
        //-   :to="{ name: 'home' }",
        //-   disabled
        //- )
        //-   icon(icon="bus")
        //-   span Buses in this route
</template>

<script>
  import { VehicleDetailService, loadRoute } from '@/providers/carris/services';

  import ViewAside from '@/components/layout/view-aside';

  const vehicleDetailService = new VehicleDetailService();

  export default {
    props: {
      id: String
    },
    data: () => ({
      loaded: false,
      vehicle: null,
      route: null
    }),
    watch: {
      id: {
        immediate: true,
        async handler() {
          this.loaded = false;
          this.vehicle = null;
          this.route = null;
          const vehicle = await vehicleDetailService.load(this.id);
          this.vehicle = vehicle;
          if (this.vehicle) {
            const route = await loadRoute(this.vehicle.route);
            this.route = route;
            this.loaded = true;
          }
        }
      }
    },
    components: {
      ViewAside
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
    .btn__group {
      margin-top: 0;
      border-top: 1px solid grey(0.5, 0.05);
      &:not(:empty) {
        // Overide to default
        margin-bottom: 0;
      }
      .btn {
        margin-bottom: 0;
      }
    }
  }

  .vehicle__title {
    display: flex;
    justify-content: space-between;
  }
</style>
