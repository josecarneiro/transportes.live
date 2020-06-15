<template lang="pug">
  view-aside
    template(v-if="vehicle")
      h1(v-text="vehicle.route")
      small {{vehicle.plate}}
      br
      span ID \#{{id}}
      br
      span 
</template>

<script>
  // import { VehicleDetailService } from '@/services/carris';

  export default {
    props: {
      id: String
    },
    data: () => ({
      vehicle: null
    }),
    watch: {
      id: {
        immediate: true,
        handler() {
          // if (this.service) this.service.destroy();
          this.vehicle = null;
          // this.service = new VehicleDetailService(this.id, this.updateVehicle);
          // this.service.listen();
        }
      }
    },
    destroyed() {
      // if (this.service) this.service.destroy();
    },
    methods: {
      updateVehicle(data) {
        this.vehicle = data;
      }
    }
  };
</script>
