import './style.scss';

import GmapCluster from 'vue2-google-maps/src/components/cluster';

const ICON_SIZE = 24;
const ICON_FILE_NAME = 'marker-cluster';

const clusterStyles = [ICON_FILE_NAME, ICON_FILE_NAME, ICON_FILE_NAME].map(
  name => ({
    url: `/images/${name}.png`,
    textColor: 'black',
    height: ICON_SIZE,
    width: ICON_SIZE
  })
);

export default {
  functional: true,
  render: (createElement, { children }) =>
    createElement(
      GmapCluster,
      {
        props: { styles: clusterStyles }
      },
      children
    )
};
