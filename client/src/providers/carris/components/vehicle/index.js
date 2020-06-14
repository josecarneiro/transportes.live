import './style.scss';

import mergeClasses from '@/util/merge-classes';

import CustomMapMarker from '@/components/map/custom-marker';

export default {
  functional: true,
  props: {
    id: String,
    position: Object,
    route: String,
    angle: Number
  },
  render: (
    createElement,
    {
      data: { key },
      props: { id, position, route, angle },
      listeners: { changeCenter }
    }
  ) =>
    createElement(
      CustomMapMarker,
      {
        key,
        props: { position },
        class: mergeClasses('bus', [
          'bus',
          `bus--${angle > 180 ? 'left' : 'right'}`
        ]),
        on: {
          click: () => {
            if (changeCenter) changeCenter(position);
          }
        }
      },
      [
        createElement(
          'router-link',
          {
            style: { transform: `rotate(${angle}deg)` },
            props: {
              to: { name: 'carris/vehicle', params: { id } }
            }
          },
          // route
          [createElement('span', route)]
        )
      ]
    )
};
