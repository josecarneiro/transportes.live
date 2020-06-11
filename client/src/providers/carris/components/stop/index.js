import { Marker as MapMarker } from 'vue2-google-maps';

const ICON_SIZE = 24;

const icon = {
  url: '/images/marker-cluster.png',
  scaledSize: { height: ICON_SIZE, width: ICON_SIZE }
};

export default {
  functional: true,
  props: {
    id: String,
    position: Object
  },
  render: (
    createElement,
    { data: { key }, props: { position }, listeners: { navigate } }
  ) =>
    createElement(MapMarker, {
      key,
      props: { clickable: true, position, icon },
      on: {
        click: () => {
          if (navigate) navigate();
        }
      }
    })
};
