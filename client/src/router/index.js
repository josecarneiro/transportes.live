import Vue from 'vue';
import VueRouter from 'vue-router';

// prettier-ignore
const CarrisBusDetail = () => import(/* webpackChunkName: "carris" */ '@/views/carris/vehicle/detail');
// prettier-ignore
const MetroStationDetail = () => import(/* webpackChunkName: "metro" */ '@/views/metro/station/detail');
// prettier-ignore
const MapMetroView = () => import(/* webpackChunkName: "metro" */ '@/views/metro/map');
// prettier-ignore
const MapCarrisView = () => import(/* webpackChunkName: "metro" */ '@/views/carris/map');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home'
  },
  {
    path: '/metro',
    name: 'map/metro',
    components: {
      map: MapMetroView
    }
  },
  {
    path: '/metro/station/:id',
    name: 'metro/station',
    props: {
      overlay: true
    },
    components: {
      map: MapMetroView,
      overlay: MetroStationDetail
    }
  },
  {
    path: '/carris',
    name: 'map/carris',
    components: {
      map: MapCarrisView
    }
  },
  {
    path: '/carris/vehicle/:id',
    name: 'carris/vehicle',
    props: {
      overlay: true
    },
    components: {
      map: MapCarrisView,
      overlay: CarrisBusDetail
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
