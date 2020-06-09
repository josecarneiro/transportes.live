const MetroMapView = () => import(/* webpackChunkName: "metro" */ './views/map');
const MetroStationDetailView = () =>
  import(/* webpackChunkName: "metro" */ './views/station/detail');

export default [
  {
    path: '/metro',
    name: 'metro/map',
    components: {
      map: MetroMapView
    }
  },
  {
    path: '/metro/station/:id',
    name: 'metro/station',
    props: {
      overlay: true
    },
    components: {
      map: MetroMapView,
      overlay: MetroStationDetailView
    }
  }
];
