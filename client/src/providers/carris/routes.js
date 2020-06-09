const CarrisMapView = () => import('./views/map');
const CarrisMapFiltersView = () => import('./views/map/filters');
const CarrisVehicleDetailView = () =>
  import(/* webpackChunkName: "carris" */ './views/vehicle/detail');
const CarrisStopDetailView = () => import(/* webpackChunkName: "carris" */ './views/stop/detail');

export default [
  {
    path: '/carris',
    name: 'carris/map',
    components: {
      map: CarrisMapView,
      filters: CarrisMapFiltersView
    }
  },
  {
    path: '/carris/vehicle/:id',
    name: 'carris/vehicle',
    props: {
      overlay: true
    },
    components: {
      map: CarrisMapView,
      overlay: CarrisVehicleDetailView
    }
  },
  {
    path: '/carris/stop/:id',
    name: 'carris/stop',
    props: {
      overlay: true
    },
    components: {
      map: CarrisMapView,
      overlay: CarrisStopDetailView
    }
  }
];
