<template lang="pug">
  div
    slot(v-bind="{ now }")
</template>

<script>
  export default {
    props: {
      interval: Number
    },
    data: () => ({ now: new Date(), id: null }),
    mounted() {
      const { interval } = this;
      if (interval) {
        this.id = setInterval(() => {
          this.now = new Date();
        }, interval * 1000);
      }
    },
    unmounted() {
      setInterval(this.id);
    }
  };
</script>
