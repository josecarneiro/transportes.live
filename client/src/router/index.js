import Vue from 'vue';
import VueRouter from 'vue-router';

import carrisRoutes from './carris';
import metroRoutes from './metro';

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
  ...carrisRoutes,
  ...metroRoutes
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active--exact'
});

export default router;
