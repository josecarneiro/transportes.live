const MetroMapView = () =>
  import(/* webpackChunkName: "metro" */ '@/views/metro/map');
const MetroStationDetailView = () =>
  import(/* webpackChunkName: "metro" */ '@/views/metro/station/detail');

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
