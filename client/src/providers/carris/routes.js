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
      aside: true
    },
    components: {
      map: CarrisMapView,
      aside: CarrisVehicleDetailView
    }
  },
  {
    path: '/carris/stop/:id',
    name: 'carris/stop',
    props: {
      aside: true
    },
    components: {
      map: CarrisMapView,
      aside: CarrisStopDetailView
    }
  },
  {
    path: '/carris/route/list',
    name: 'carris/route/list',
    components: {
      map: CarrisMapView,
      aside: CarrisRouteListView
    }
  },
  {
    path: '/carris/route/:id',
    name: 'carris/route',
    props: {
      aside: true
    },
    components: {
      map: CarrisMapView,
      aside: CarrisRouteDetailView
    }
  }
];
