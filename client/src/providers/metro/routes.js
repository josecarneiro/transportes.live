const MetroMapView = () =>
  import(/* webpackChunkName: "metro" */ './views/map');
const MetroMapFiltersView = () =>
  import(/* webpackChunkName: "metro" */ './views/map/filters');
const MetroStationDetailView = () =>
  import(/* webpackChunkName: "metro" */ './views/station/detail');
const MetroStationListView = () =>
  import(/* webpackChunkName: "metro" */ './views/station/list');

export default [
  {
    path: '/metro',
    name: 'metro/map',
    components: {
      map: MetroMapView,
      filters: MetroMapFiltersView
    }
  },
  {
    path: '/metro/station/list',
    name: 'metro/station/list',
    props: {
      overlay: true
    },
    components: {
      map: MetroMapView,
      overlay: MetroStationListView
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
