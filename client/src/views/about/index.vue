<template lang="pug">
  view-aside.view--about
    h1 About 
    p
      strong transportes.live
      |  aims to centralize useful, real-time information from all major public transportation providers in Portugal. It is still in early stages of development, as such several features might be incomplete or display buggy behaviors.
    p
      | It uses data that is made publicly available by third-party transportation providers.
      br
      | As such, the accuracy of all estimates, vehicle and stop information, among others, is of the responsibility of said providers.
    p
      strong transportes.live
      |  was built by 
      a(href="https://josecarnei.ro") José Carneiro
      | , a full-stack developer and instructor based in Lisbon, Portugal.
    p
      | If you have any suggestions or feedback, 
      a(href="mailto:hello@josecarnei.ro") reach out
      | .
</template>

<script>
  import ViewAside from '@/components/view/aside';

  export default {
    components: {
      ViewAside
    }
  };
</script>

<style lang="scss">
  .view--about {
    justify-content: center;
    p {
      font-size: 1.125em;
    }
  }
</style>
