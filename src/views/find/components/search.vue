<script>
import { sideShow } from '@/hooks/status.js';
import Sider from './sider.vue';
export default {
  name: 'search',
  components: { Sider },
  setup() {
    return {
      sideShow,
    };
  },
};
</script>

<style lang="less" scoped>
.search {
  /deep/ .van-button {
    width: 220px;
  }
  /deep/.van-badge__wrapper {
    color: #fff;
  }
  .popup {
    background: #f0f0f0 !important;
  }
}
</style>

<template>
  <div class="search">
    <van-nav-bar :border="false" fixed>
      <template #title>
        <van-button size="small" round type="primary" to="/search"
          >搜索
          <template #icon>
            <van-icon name="search" color="#c8c9cc" />
          </template>
        </van-button>
      </template>
      <template #left>
        <van-badge :content="81">
          <van-icon name="bars" color="#c8c9cc" size="25" @click="sideShow = true" />
        </van-badge>
      </template>
      <template #right>
        <a href="https://github.com/ay192018/v3netease">
          <van-image width="30" height="30" fit="cover" src="https://b.yzcdn.cn/vant/logo/github.svg"
        /></a>
      </template>
    </van-nav-bar>
    <van-popup
      v-model:show="sideShow"
      class="popup"
      position="left"
      :style="{ height: '100%', width: '80%' }"
      teleport="body"
      ><Sider />
    </van-popup>
  </div>
</template>
