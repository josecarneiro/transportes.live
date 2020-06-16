export const deserializeStationOccupancy = ({
  a: active,
  b: bikes,
  d: docks
}) => ({
  active,
  bikes,
  docks,
  ratio: bikes / docks
});

export const deserializeStation = ({ n: name, t: type }) => ({
  name,
  type
});
