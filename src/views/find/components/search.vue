<script>
import { checked } from '@/hooks/status.js';
import { sideShow } from '@/hooks/status.js';
import Sider from './sider.vue';
export default {
  name: 'search',
  components: { Sider },
  setup() {
    return {
      sideShow,
      checked,
    };
  },
};
</script>

<style lang="less" scoped>
.search {
::v-deep(.van-button) {
    width: 220px;
  }
 ::v-deep(.van-badge__wrapper) {
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
        <van-button size="small" hairline round type="primary" to="/search"
          >搜索
          <template #icon>
            <van-icon name="search" color="#c8c9cc" />
          </template>
        </van-button>
      </template>
      <template #left>
        <van-badge :content="81">
          <van-icon name="bars" color="#c8c9cc" size="32" @click="sideShow = true" />
        </van-badge>
      </template>
      <template #right>
        <a href="https://github.com/ay192018/v3netease">
          <van-image
            width="30"
            height="30"
            fit="cover"
            :src="
              checked
                ? 'https://b.yzcdn.cn/vant/logo/github.svg'
                : 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fouo1x3vy6.bkt.clouddn.com%2Fgithub_Icon.jpg&refer=http%3A%2F%2Fouo1x3vy6.bkt.clouddn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651165883&t=a2e93d283ed0f34c53d4f6d086f06779'
            "
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
