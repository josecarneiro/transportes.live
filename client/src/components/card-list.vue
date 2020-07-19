<template lang="pug">
  .favorite__list
    component(
      v-for="{ id, type, details } of list",
      :is="types[type]",
      :key="id"
      v-bind="{ ...details }"
    )
</template>

<script>
  import FavoriteCarrisCard from '@/providers/carris/components/card';
  import FavoriteMetroCard from '@/providers/metro/components/card';

  export default {
    props: {
      list: Array
    },
    data: () => ({
      types: {
        carris: 'FavoriteCarrisCard',
        metro: 'FavoriteMetroCard'
      }
    }),
    components: {
      FavoriteCarrisCard,
      FavoriteMetroCard
    }
  };
</script>

<style lang="scss">
  .favorite__list {
    max-width: 30em;
    & > * {
      &:not(:last-child) {
        margin-bottom: 1em;
      }
    }
  }

  .favorite__card {
    padding: 1em;
    border-radius: 0.5em;
    background-color: white;
    @include shadow;
  }
</style>
