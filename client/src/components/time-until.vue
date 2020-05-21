<template lang="pug">
  span {{ parsed }}
</template>

<script>
  const format = (value, separator = ' ') => {
    const hours = Math.floor(value / (60 * 60));
    const minutes = Math.floor(value / 60) % 60;
    const seconds = value % 60;

    return [hours, minutes, seconds]
      .map((value) => Math.floor(value))
      .map((value, index) => (value ? value + ['h', 'm', 's'][index] : null))
      .filter((value) => value)
      .join(separator);
  };

  export default {
    props: {
      date: Date,
      interval: Number
    },
    data: () => ({ now: new Date(), timeout: null }),
    created() {
      const { interval } = this;
      this.timeout = setTimeout(() => {
        this.now = new Date();
      }, interval * 1000);
    },
    destroyed() {
      clearTimeout(this.timeout);
    },
    computed: {
      parsed() {
        const seconds = Math.max(0, this.date - this.now) / 1000;
        if (seconds < 0) return '0s';
        return format(seconds);
      }
    }
  };
</script>
