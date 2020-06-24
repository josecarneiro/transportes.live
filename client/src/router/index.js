import Vue from 'vue';
import VueRouter from 'vue-router';

import carrisRoutes from '@/providers/carris/routes';
import metroRoutes from '@/providers/metro/routes';
import giraRoutes from '@/providers/gira/routes';

import {
  app as appConfiguration,
  providers as providersConfiguration
} from '@/config';

const AtAGlanceView = () => import('@/views/glance');
const AboutView = () => import(/* webpackChunkName: "other" */ '@/views/about');
const ErrorView = () => import(/* webpackChunkName: "other" */ '@/views/error');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    ...((appConfiguration.debug && {
      components: {
        overlay: AtAGlanceView
      }
    }) || {
      redirect: '/carris'
    })
  },
  {
    path: '/about',
    name: 'about',
    components: {
      aside: AboutView
    }
  },
  ...(providersConfiguration.carris ? carrisRoutes : []),
  ...(providersConfiguration.metro ? metroRoutes : []),
  ...(providersConfiguration.gira ? giraRoutes : []),
  {
    path: '/error',
    name: 'error',
    components: {
      aside: ErrorView
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active--exact'
});

export default router;
