<template lang="pug">
  card-list(:list="favorites")
</template>

<script>
  import { mapState } from 'vuex';

  import loadNearby from '@/services/load-nearby';

  import CardList from '@/components/card-list';

  export default {
    data: () => ({ nearby: [] }),
    computed: {
      ...mapState('location', {
        coordinates: ({ position }) => position && position.coordinates
      })
    },
    async created() {
      const coordinates = this.coordinates;
      if (coordinates) {
        // const start = performance.now();
        const nearby = await loadNearby(coordinates);
        // const end = performance.now();
        // console.log(`Call took ${end - start} milliseconds.`);
        // console.log(nearby);
      }
    },
    components: {
      CardList
    }
  };
</script>
