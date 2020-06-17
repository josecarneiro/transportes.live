<template lang="pug">
  view-aside
    small.heading-label Station
    h1(v-text="id")
    template(v-if="station")
      small.heading-label Name
      h4(v-text="station.name")
      small.heading-label Occupancy
      .gira__occupancy
        div
          small.heading-label Free Bikes
          h3 {{ station.bikes }}
        div
          small.heading-label Total Docks
          h3 {{ station.docks }}
</template>

<script>
  import { loadStation } from '@/providers/gira/services';

  import ViewAside from '@/components/view/aside';

  export default {
    props: {
      id: String
    },
    data: () => ({ station: null }),
    watch: {
      id: {
        immediate: true,
        async handler() {
          const station = await loadStation(this.id);
          this.station = station;
        }
      }
    },
    components: {
      ViewAside
    }
  };
</script>

<style lang="scss">
  .gira__occupancy {
    display: flex;
    & > * {
      &:not(:last-child) {
        margin-right: 1em;
      }
    }
  }
</style>
