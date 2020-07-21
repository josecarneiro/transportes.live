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
    border-radius: 0.5em;
    background-color: white;
    @include shadow;
  }

  .favorite__card__header {
    padding: 1em;
    padding-bottom: 0;
    display: flex;
    .btn {
      .icon {
        margin-right: -0.125em;
      }
    }
  }

  .favorite__card__body {
    padding: 0 1em;
    padding-bottom: 1em;
  }

  .favorite__card__header__actions {
    margin-left: auto;
    margin-top: -1em;
    margin-right: -1em;
  }
</style>
