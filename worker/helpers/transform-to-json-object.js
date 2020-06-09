const round = (value, digits) =>
  Math.round(value * 10 ** digits) / 10 ** digits;

module.exports = (object, hide = []) =>
  JSON.parse(
    JSON.stringify(object, (key, value) => {
      if (hide.includes(key)) return;
      if (typeof value === 'number') return round(value, 5);
      return value;
    })
  );
