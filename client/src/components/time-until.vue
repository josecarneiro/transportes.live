<template lang="pug">
  time-aware-component(
    v-bind="{ interval }"
    v-slot="time"
  )
    span(
      v-if="date - time.now > 0",
      v-text="parse(date - time.now)"
    )
    span(v-else) Now
</template>

<script>
  import TimeAwareComponent from './time-aware-component.vue';

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
      TimeAwareComponent
    }
  };
</script>
