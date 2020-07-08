export default (value, places) =>
  Math.floor(value * 10 ** places) / 10 ** places;
