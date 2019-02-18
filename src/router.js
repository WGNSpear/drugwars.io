import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import { isWeb } from '@/helpers/utils';
import { hasAccounts } from '@/helpers/keychain';

const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue');
const Callback = () => import(/* webpackChunkName: "callback" */ '@/views/Callback.vue');
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue');
const Missions = () => import(/* webpackChunkName: "missions" */ '@/views/Missions.vue');
const Buildings = () => import(/* webpackChunkName: "buildings" */ '@/views/Buildings.vue');
const Units = () => import(/* webpackChunkName: "units" */ '@/views/Units.vue');
const Battles = () => import(/* webpackChunkName: "battles" */ '@/views/Battles.vue');
const Leaderboard = () => import(/* webpackChunkName: "leaderboard" */ '@/views/Leaderboard.vue');
const About = () => import(/* webpackChunkName: "about" */ '@/views/About.vue');
const Error404 = () => import(/* webpachChunkName: "error404" */ '@/views/404.vue');

Vue.use(Router);

const requireAuth = (to, from, next) => {
  if (!store.state.auth.username) {
    const name = hasAccounts() ? 'login' : 'import';
    const redirect = to.fullPath === '/' ? undefined : to.fullPath;
    next({ name, query: { redirect } });
  } else {
    next();
  }
};

export default new Router({
  mode: isWeb() ? 'history' : 'hash',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      beforeEnter: requireAuth,
      component: Dashboard,
    },
    {
      path: '/missions',
      name: 'missions',
      beforeEnter: requireAuth,
      component: Missions,
    },
    {
      path: '/buildings',
      name: 'buildings',
      beforeEnter: requireAuth,
      component: Buildings,
    },
    {
      path: '/units',
      name: 'units',
      beforeEnter: requireAuth,
      component: Units,
    },
    {
      path: '/battles',
      name: 'battles',
      beforeEnter: requireAuth,
      component: Battles,
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      beforeEnter: requireAuth,
      component: Leaderboard,
    },
    {
      path: '/login',
      name: 'login',
      component: Home,
      meta: {
        hideSidebar: true,
      },
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback,
      meta: {
        hideSidebar: true,
      },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        hideSidebar: true,
      },
    },
    {
      path: '*',
      component: Error404,
      meta: {
        hideSidebar: true,
      },
    },
  ],
});