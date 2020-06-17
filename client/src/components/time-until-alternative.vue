<template lang="pug">
  span {{ parsed }}
</template>

<script>
  const format = (value, separator = ' ') => {
    const hours = Math.floor(value / (60 * 60));
    const minutes = Math.floor(value / 60) % 60;
    const seconds = value % 60;

    return [hours, minutes, seconds]
      .map(value => Math.floor(value))
      .map((value, index) => (value ? value + ['h', 'm', 's'][index] : null))
      .filter(value => value)
      .join(separator);
  };

  export default {
    props: {
      date: Date,
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
    },
    computed: {
      parsed() {
        const seconds = (this.date - this.now) / 1000;
        if (seconds < 0) return '0s';
        return format(seconds);
      }
    }
  };
</script>
