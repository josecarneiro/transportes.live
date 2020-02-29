import Vue from 'vue';
import VueRouter from 'vue-router';

const CarrisBusDetail = () =>
  import(/* webpackChunkName: "carris" */ '@/views/carris/vehicle/detail');
const MetroStationDetail = () =>
  import(/* webpackChunkName: "metro" */ '@/views/metro/station/detail');

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
