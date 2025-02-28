import Vue from 'vue';
import VueRouter from 'vue-router';

import carrisRoutes from '@/providers/carris/routes';
import metroRoutes from '@/providers/metro/routes';
import giraRoutes from '@/providers/gira/routes';

import {
  app as appConfiguration,
  providers as providersConfiguration
} from '@/config';

const FavoritesView = () => import('@/views/favorites');
const NearbyView = () => import('@/views/nearby');
const GlanceView = () => import('@/views/glance');
const AboutView = () => import(/* webpackChunkName: "other" */ '@/views/about');
const DebugView = () => import(/* webpackChunkName: "other" */ '@/views/debug');
const ErrorView = () => import(/* webpackChunkName: "other" */ '@/views/error');
const SettingsView = () =>
  import(/* webpackChunkName: "other" */ '@/views/settings');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/metro'
  },
  {
    path: '/glance',
    name: 'glance',
    components: {
      overlay: GlanceView
    }
  },
  {
    path: '/favorites',
    name: 'favorites',
    components: {
      overlay: FavoritesView
    }
  },
  {
    path: '/nearby',
    name: 'nearby',
    components: {
      overlay: NearbyView
    }
  },
  {
    path: '/debug',
    name: 'debug',
    ...((appConfiguration.debug && {
      components: {
        aside: DebugView
      }
    }) || {
      redirect: '/'
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
    path: '/settings',
    name: 'settings',
    components: {
      aside: SettingsView
    }
  },
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
