import Vue from 'vue';
import VueRouter from 'vue-router';

const CarrisMapView = () =>
  import(/* webpackChunkName: "carris" */ '@/views/carris/map');
const CarrisVehicleDetailView = () =>
  import(/* webpackChunkName: "carris" */ '@/views/carris/vehicle/detail');

const MetroMapView = () =>
  import(/* webpackChunkName: "metro" */ '@/views/metro/map');
const MetroStationDetailView = () =>
  import(/* webpackChunkName: "metro" */ '@/views/metro/station/detail');

const AboutView = () => import(/* webpackChunkName: "other" */ '@/views/about');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/carris'
  },
  {
    path: '/about',
    name: 'about',
    components: {
      overlay: AboutView
    }
  },
  {
    path: '/metro',
    name: 'map/metro',
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
  },
  {
    path: '/carris',
    name: 'map/carris',
    components: {
      map: CarrisMapView
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
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
