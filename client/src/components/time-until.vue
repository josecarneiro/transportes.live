<template lang="pug">
  time-sensitive-component(
    :interval="5",
    v-slot="time"
  )
    span {{ parse(date - time.now) }}
</template>

<script>
  import TimeSensitiveComponent from './time-aware-component.vue';

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
    methods: {
      parse(milliseconds) {
        const seconds = milliseconds / 1000;
        if (seconds <= 0) return '0s';
        return format(seconds);
      }
    },
    components: {
      TimeSensitiveComponent
    }
  };
</script>
