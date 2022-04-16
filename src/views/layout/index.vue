<script>
import { ref, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
export default {
  components: {
    Audio,
  },
  name: 'layout',
  setup() {
    const route = useRoute();
    const active = ref();
    const routerlist = reactive([
      {
        router: '/',
        iconname: 'home-o',
        routername: '发现',
      },
      {
        router: '/my',
        iconname: 'service-o',
        routername: '我的',
      },
      {
        router: '/follow',
        iconname: 'friends-o',
        routername: '关注',
      },
      {
        router: '/Videosquare',
        iconname: 'live',
        routername: '视频',
      },
    ]);
    watch(
      () => route,
      (n, o) => {
        switch (n.path) {
          case '/':
            active.value = 0;
            break;

          case '/my':
            active.value = 1;
            break;
          case '/follow':
            active.value = 2;
            break;
          case '/Videosquare':
            active.value = 3;
            break;

          default:
            active.value = 0;
        }
      },
      {
        deep: true,
        immediate: true,
      },
    );

    return {
      active,
      routerlist,
    };
  },
};
</script>

<style lang="less" scoped>
.layout {
  ::v-deep(.van-tabbar, .van-tabbar--fixed, .van-hairline--top-bottom, .van-safe-area-bottom) {
    z-index: 100 !important;
  }
}
</style>

<template>
  <transition name="slide-fade">
    <div class="layout">
      <van-tabbar v-model="active" active-color="#ee0a24" z-index="-99">
        <van-tabbar-item v-for="(item, index) in routerlist" :key="index" :to="item.router" :icon="item.iconname">{{
          item.routername
        }}</van-tabbar-item>
      </van-tabbar>
      <router-view />
    </div>
  </transition>
</template>
