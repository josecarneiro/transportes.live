import TimeAwareComponent from './wrappers/time-aware';

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

const parse = milliseconds => {
  const seconds = milliseconds / 1000;
  if (seconds <= 0) return '0s';
  return format(seconds);
};

export default {
  functional: true,
  props: {
    date: Date,
    interval: Number
  },
  render: (createElement, { props: { date, interval } }) =>
    createElement(TimeAwareComponent, {
      props: {
        interval
      },
      scopedSlots: {
        default: ({ now }) => {
          const delta = date - now;
          const text = delta > 0 ? parse(delta) : 'Now';
          return createElement('span', text);
        }
      }
    })
};
