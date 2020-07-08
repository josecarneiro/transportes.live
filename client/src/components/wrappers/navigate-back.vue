<template lang="pug">
  button(@click="navigateBack")
    slot
</template>

<script>
  export default {
    methods: {
      navigateBack() {
        this.$router.go(-1);
      }
    }
  };
</script>
