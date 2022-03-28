import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'layout',
    meta: { keepAlive: true },
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '/',
        name: 'find',
        component: () => import('@/views/find/'),
        meta: { keepAlive: true },
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/'),
        meta: { keepAlive: true },
      },
      {
        path: '/Videosquare',
        name: 'Videosquare',
        component: () => import('@/views/Videosquare/'),
        props: true,
        meta: {
          transition: 'slide-fade',
          keepAlive: true,
        },
      },
      {
        path: '/follow',
        name: 'follow',
        component: () => import('@/views/follow/'),
        meta: { transition: 'slide-fade', keepAlive: true },
      },
    ],
  },
  {
    path: '/albumlist:id',
    name: 'albumlist',
    component: () => import('@/components/songsdetails/albumlist.vue'),
    props: true,
    meta: { transition: 'slide-fade' },
  },
  {
    path: '/songsdetails:id',
    name: 'songsdetails',
    component: () => import('@/components/songsdetails/'),
    props: true,
    meta: { transition: 'slide-fade' },
  },
  {
    path: '/comments:id',
    name: 'comments',
    component: () => import('@/components/comments/'),
    props: true,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    meta: { transition: 'slide-fade' },
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/index.vue'),
    meta: { transition: 'slide-fade', keepAlive: true },
  },
  {
    path: '/video:id',
    name: 'video',
    component: () => import('@/components/video/'),
    props: true,
    meta: { transition: 'slide-fade' },
  },
  {
    path: '/user:id',
    name: 'user',
    component: () => import('@/components/user/'),
    props: true,
    meta: { transition: 'slide-fade' },
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: () => import('@/components/ranking/'),
    meta: { transition: 'slide-fade', keepAlive: true },
  },
  {
    path: '/mymessage',
    name: 'mymessage',
    component: () => import('../views/my/mymessage.vue'),
    meta: { transition: 'slide-fade', keepAlive: true },
  },
];

const router = createRouter({
  mode: 'history',
  history: createWebHashHistory(),
  routes,
});
router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length;
  const fromDepth = from.path.split('/').length;
  to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
});
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    if (JSON.parse(localStorage.getItem('cookie')) === null) {
      next();
    } else {
      return false;
    }
  } else {
    next();
  }
});
export default router;
