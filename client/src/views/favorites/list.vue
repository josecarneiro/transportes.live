<template lang="pug">
  div
    template(v-if="favorites.length")
      card-list(:list="favorites")
    template(v-else)
      p You haven't favorited any station or stop yet.
</template>

<script>
  import { mapState } from 'vuex';

  import CardList from '@/components/card-list';

  export default {
    props: {
      limit: {
        type: Number,
        default: 20
      }
    },
    computed: {
      ...mapState('favorites', {
        favorites({ list }) {
          return list.slice(0, this.limit);
        }
      })
    },
    components: {
      CardList
    }
  };
</script>
