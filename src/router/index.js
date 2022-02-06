import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "layoue",
    component: () => import("@/views/layout/"),
    children: [
      {
        path: "",
        name: "find",

        component: () => import("@/views/find/"),
      },
      {
        path: "/my",
        name: "my",
        component: () => import("@/views/my/"),
      },
      {
        path: "/Videosquare",
        name: "Videosquare",
        component: () => import("@/views/Videosquare/"),
        props: true,
        meta: { transition: "slide-fade" },
      },
      {
        path: "/follow",
        name: "follow",
        component: () => import("@/views/follow/"),
      },
    ],
  },
  {
    path: "/albumlist:id",
    name: "albumlist",
    component: () => import("@/components/songsdetails/albumlist.vue"),
    props: true,
    meta: { transition: "slide-fade" },
  },
  {
    path: "/songsdetails:id",
    name: "songsdetails",
    component: () => import("@/components/songsdetails/"),
    props: true,
    meta: { transition: "slide-fade" },
  },
  {
    path: "/comments:id",
    name: "comments",
    component: () => import("@/components/comments/"),
    props: true,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/my/login.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/search/index.vue"),
  },
  {
    path: "/video:id",
    name: "video",
    component: () => import("@/components/video/"),
    props: true,
    meta: { transition: "slide-fade" },
  },
];

const router = createRouter({
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
