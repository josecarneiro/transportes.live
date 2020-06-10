<template lang="pug">
  div
    map-carris-stop-cluster
      map-carris-stop(
        v-for="(position, id) in stops",
        :key="id",
        v-bind="{ id, position }",
        @navigate="navigateToStop(id)"
      )
</template>

<script>
  import MapCarrisStop from './../../components/stop';
  import MapCarrisStopCluster from './../../components/stop-cluster';

  export default {
    props: {
      stops: Object
    },
    methods: {
      navigateToStop(id) {
        this.$router.push({ name: 'carris/stop', params: { id } });
      }
    },
    components: {
      MapCarrisStop,
      MapCarrisStopCluster
    }
  };
</script>
