<script>
import { playCount } from '@/Util/fltter.js';

import { useRouter } from 'vue-router';
import { lookbtn, looktitle } from '@/hooks/reactive';
export default {
  name: 'live',
  setup(props, { attrs }) {
    const DynamicRouter = useRouter();

    const router = (id) => {
      DynamicRouter.push({
        name: 'songsdetails',
        params: { id: id },
      });
    };

    return {
      playCount,
      router,
      DynamicRouter,

      looktitle,
      lookbtn,
      attrs,
    };
  },
};
</script>

<style lang="less" scoped>
.btn {
  width: 50px;
}

.item {
  width: 110px;
  position: relative;
  margin-right: 15px;
  .title {
    height: auto;
    width: 100%;
    font-size: 13px;
  }
  .count {
    background: rgba(200, 30, 22, 0.3);
    border-radius: 15px;
    padding: 3px;
    box-sizing: border-box;
  }
}
</style>

<template>
  <div class="recommend auto">
    <h3>{{ looktitle }}</h3>
    <van-button type="primary" class="btn" hairline round size="mini">
      <template #icon> {{ lookbtn }}<van-icon name="arrow" /> </template>
    </van-button>
  </div>

  <div class="Recommendlist ">
    <div class="item" v-for="item in attrs.extInfo" :key="item.coverId">
      <van-image width="110" height="110" radius="15" fit="cover" :src="item.cover">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" color="#000" />
        </template>
      </van-image>

      <div class="title van-multi-ellipsis--l2">{{ item.title }}</div>
      <span class="count">{{ item.coverTag }}</span>
    </div>
  </div>
</template>
