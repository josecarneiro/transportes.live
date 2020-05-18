<template lang="pug">
  view-aside
    template(v-if="vehicle")
      //- button(@click="$emit('control', 'zoom-out')")
        icon(icon="favorite")
      h1(v-text="vehicle.route")
      small {{vehicle.plate}}
      br
      span ID \#{{id}}
      br
      span 
</template>

<script>
  import { VehicleDetailService } from '@/services/carris';
  import Icon from '@/components/icon';
  import ViewAside from '@/components/view/aside';

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
          if (this.service) this.service.destroy();
          this.vehicle = null;
          this.service = new VehicleDetailService(this.id, this.updateVehicle);
        }
      }
    },
    destroyed() {
      if (this.service) this.service.destroy();
    },
    methods: {
      updateVehicle(data) {
        this.vehicle = data;
      }
    },
    components: {
      ViewAside,
      Icon
    }
  };
</script>
