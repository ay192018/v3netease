<template>
  <transition name="slide-fade">
    <div class="layout">
      <van-tabbar v-model="active" active-color="#ee0a24" z-index="-99">
        <van-tabbar-item to="/" icon="home-o">发现</van-tabbar-item>
        <van-tabbar-item to="/my" icon="service-o">我的</van-tabbar-item>
        <van-tabbar-item to="/Videosquare" icon="live">视频</van-tabbar-item>
        <van-tabbar-item to="/follow" icon="friends-o">关注</van-tabbar-item>
      </van-tabbar>

      <router-view />
    </div>
  </transition>
</template>

<script>
import { ref } from "vue";
export default {
  components: {
    Audio,
  },
  setup() {
    const active = ref(0);
    return {
      active,
    };
  },
};
</script>

<style lang="less" scoped>
.layout {
  /deep/ .van-tabbar,
  .van-tabbar--fixed,
  .van-hairline--top-bottom,
  .van-safe-area-bottom {
    z-index: 100 !important;
  }
}
</style>
