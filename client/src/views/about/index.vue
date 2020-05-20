<template lang="pug">
  view-aside
    h1 About 
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
