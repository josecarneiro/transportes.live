<template lang="pug">
  view-aside
    h1 Station {{ id }}
    template(v-if="station")
      h4(v-text="station.name")
      span
        strong Bikes
        | : {{ station.bikes }}
      br
      span
        strong Docks
        | : {{ station.docks }}
</template>

<script>
  import { loadStation } from '@/providers/gira/services';

  import ViewAside from '@/components/view/aside';

  export default {
    props: {
      id: String
    },
    data: () => ({ station: null }),
    async created() {
      const station = await loadStation(this.id);
      this.station = station;
    },
    components: {
      ViewAside
    }
  };
</script>
