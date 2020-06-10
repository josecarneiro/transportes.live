const GiraMapView = () => import(/* webpackChunkName: "gira" */ './views/map');
const GiraStopDetailView = () =>
  import(/* webpackChunkName: "gira" */ './views/stop/detail');

export default [
  {
    path: '/gira',
    name: 'gira/map',
    components: {
      map: GiraMapView
    }
  },
  {
    path: '/gira/stop/:id',
    name: 'gira/stop',
    props: {
      overlay: true
    },
    components: {
      map: GiraMapView,
      overlay: GiraStopDetailView
    }
  }
];
