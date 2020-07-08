import round from '@/util/round';

export default ({ latitude, longitude }, { precision = 2 } = {}) =>
  `${round(latitude, precision)}${latitude > 0 ? 'N' : 'S'}, ${round(
    longitude,
    precision
  )}${longitude > 0 ? 'E' : 'W'}`;
