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
      aside: true
    },
    components: {
      map: GiraMapView,
      aside: GiraStationDetailView
    }
  }
];
