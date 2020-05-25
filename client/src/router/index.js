import Vue from 'vue';
import VueRouter from 'vue-router';

import carrisRoutes from '@/providers/carris/routes';
import metroRoutes from '@/providers/metro/routes';

import { providersConfiguration } from '@/config';

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
  ...(providersConfiguration.carris ? carrisRoutes : []),
  ...(providersConfiguration.metro ? metroRoutes : [])
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active--exact'
});

export default router;
