<script>
import { ref } from 'vue';
export default {
  setup() {
    const show = ref(false);
    return {
      show,
    };
  },
};
</script>

<style lang="less" scoped>
.search {
  /deep/ .van-nav-bar__content {
    background-color: pink;
  }

  /deep/ .van-button {
    width: 220px;
  }
  /deep/.van-badge__wrapper {
    color: #fff;
  }
}
</style>

<template>
  <div class="search">
    <van-nav-bar :border="false" fixed>
      <template #title>
        <van-button size="small" color="#ccc" round type="primary" to="/search" icon="search">搜索</van-button>
      </template>
      <template #left>
        <van-icon name="bars" size="25" @click="show = true" />
      </template>
      <template #right>
        <a href="https://github.com/ay192018/v3netease">
          <van-image width="30" height="30" fit="cover" src="https://b.yzcdn.cn/vant/logo/github.svg"
        /></a>
      </template>
    </van-nav-bar>
    <van-popup v-model:show="show" position="left" :style="{ height: '100%', width: '80%' }" teleport="body" />
  </div>
</template>
