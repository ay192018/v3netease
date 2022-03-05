import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "layoue",
    component: () => import("@/views/layout/"),
    children: [
      {
        path: "/",
        name: "find",
        component: () => import("@/views/find/"),
        meta: { keepAlive: true },
      },
      {
        path: "/my",
        name: "my",
        component: () => import("@/views/my/"),
        meta: { keepAlive: true },
      },
      {
        path: "/Videosquare",
        name: "Videosquare",
        component: () => import("@/views/Videosquare/"),
        props: true,
        meta: { transition: "slide-fade", keepAlive: true },
      },
      {
        path: "/follow",
        name: "follow",
        component: () => import("@/views/follow/"),
        keepAlive: true,
      },
    ],
  },
  {
    path: "/albumlist:id",
    name: "albumlist",
    component: () => import("@/components/songsdetails/albumlist.vue"),
    props: true,
    meta: { transition: "slide-fade", keepAlive: true },
  },
  {
    path: "/songsdetails:id",
    name: "songsdetails",
    component: () => import("@/components/songsdetails/"),
    props: true,
    meta: { transition: "slide-fade", keepAlive: true },
  },
  {
    path: "/comments:id",
    name: "comments",
    component: () => import("@/components/comments/"),
    props: true,
    keepAlive: true,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/search/index.vue"),
    keepAlive: true,
  },
  {
    path: "/video:id",
    name: "video",
    component: () => import("@/components/video/"),
    props: true,
    meta: { transition: "slide-fade", keepAlive: true },
  },
  {
    path: "/user:id",
    name: "user",
    component: () => import("@/components/user/"),
    props: true,
    meta: { transition: "slide-fade", keepAlive: true },
  },
];

const router = createRouter({
  mode: "hash",
  history: createWebHashHistory(),
  routes,
});
router.afterEach((to, from) => {
  const toDepth = to.path.split("/").length;
  const fromDepth = from.path.split("/").length;
  to.meta.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
});
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    if (JSON.parse(localStorage.getItem("profile"))) {
      return false;
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
