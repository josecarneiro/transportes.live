const GiraMapView = () => import(/* webpackChunkName: "gira" */ './views/map');
const GiraStationDetailView = () =>
  import(/* webpackChunkName: "gira" */ './views/station/detail');

export default [
  {
    path: '/gira',
    name: 'gira/map',
    components: {
      map: GiraMapView
    }
  },
  {
    path: '/gira/station/:id',
    name: 'gira/station',
    props: {
      overlay: true
    },
    components: {
      map: GiraMapView,
      overlay: GiraStationDetailView
    }
  }
];
