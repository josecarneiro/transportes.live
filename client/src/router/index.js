import Vue from 'vue';
import VueRouter from 'vue-router';
import CarrisBusDetail from '@/views/carris/vehicle/detail';

// const AboutView = () =>
//   import(/* webpackChunkName: "about" */ '../views/About.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/carris/vehicle/:id',
    name: 'carris',
    props: true,
    component: CarrisBusDetail
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
