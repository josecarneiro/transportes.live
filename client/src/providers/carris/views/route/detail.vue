<template lang="pug">
  view-aside
    template(v-if="vehicle")
      //- button(@click="$emit('control', 'zoom-out')")
        icon(icon="favorite")
      h1(v-text="vehicle.route")
      br
      span
        strong Vehicle Id
        | : {{id}}
      br
      span 
</template>

<script>
  import { VehicleDetailService } from '@/providers/carris/services';

  import Icon from '@/components/icon';
  import ViewAside from '@/components/view/aside';

  const service = new VehicleDetailService();

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
        async handler() {
          this.vehicle = null;
          const vehicle = await service.load(this.id);
          this.vehicle = vehicle;
        }
      }
    },
    components: {
      ViewAside,
      Icon
    }
  };
</script>
