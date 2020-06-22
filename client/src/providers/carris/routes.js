const CarrisMapView = () => import('./views/map');
const CarrisMapFiltersView = () => import('./views/map/filters');
const CarrisVehicleDetailView = () =>
  import(/* webpackChunkName: "carris" */ './views/vehicle/detail');
const CarrisStopDetailView = () =>
  import(/* webpackChunkName: "carris" */ './views/stop/detail');
const CarrisRouteListView = () =>
  import(/* webpackChunkName: "carris" */ './views/route/list');
const CarrisRouteDetailView = () =>
  import(/* webpackChunkName: "carris" */ './views/route/detail');

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
  },
  {
    path: '/carris/route/list',
    name: 'carris/route/list',
    components: {
      map: CarrisMapView,
      overlay: CarrisRouteListView
    }
  },
  {
    path: '/carris/route/:id',
    name: 'carris/route',
    props: {
      overlay: true
    },
    components: {
      map: CarrisMapView,
      overlay: CarrisRouteDetailView
    }
  }
];
