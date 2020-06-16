<template lang="pug">
  view-aside.view--about
    h1 About 
    p
      strong transportes.live
      |  uses data that is made publicly available by third-party transportation providers. As such, the accuracy of all estimates, vehicle and stop information, among others, is of the responsibility of said providers.
    p
      strong transportes.live
      |  was built by 
      a(href="https://josecarnei.ro") José Carneiro
      | ,
      br
      | a full-stack developer and instructor based in Lisbon, Portugal.
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
  }
</style>
