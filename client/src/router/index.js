import Vue from 'vue';
import VueRouter from 'vue-router';
import CarrisBusDetail from '@/views/carris/vehicle/detail';
import MetroStationDetail from '@/views/metro/station/detail';

// const AboutView = () =>
//   import(/* webpackChunkName: "about" */ '../views/About.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/carris/vehicle/:id',
    name: 'carris-vehicle',
    props: true,
    component: CarrisBusDetail
  },
  {
    path: '/metro/station/:id',
    name: 'metro-station',
    props: true,
    component: MetroStationDetail
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
