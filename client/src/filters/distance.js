export default value =>
  typeof value === 'number'
    ? value > 1000
      ? `${Math.round(value / 1000)}km`
      : `${value}m`
    : null;
