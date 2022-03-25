<script>
import { getrecommendlist } from '@/api/songsheet.js';
import { playCount } from '@/Util/fltter.js';
import { reactive, inject, markRaw } from 'vue';
import { useRouter } from 'vue-router';
import { lookbtn, looktitle } from '@/hooks/reactive';
export default {
  setup(props, { attrs }) {
    const DynamicRouter = useRouter();
    const extInfo = markRaw(inject('extInfo'));

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
      extInfo,
      looktitle,
      lookbtn,
    };
  },
};
</script>

<style lang="less" scoped>
.recommend {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btn {
    width: 50px;
  }
}
.Recommendlist {
  overflow-x: auto;
  height: 150px;

  display: flex;
  .item {
    width: 110px;
    position: relative;
    margin-right: 15px;
    .title {
      height: auto;
      width: 100%;
    }
    .count {
      background: rgba(200, 30, 22, 0.3);

      border-radius: 15px;
      padding: 3px;
      box-sizing: border-box;
    }
  }
}
</style>

<template>
  <div class="recommend auto">
    <h3>{{ looktitle }}</h3>
    <van-button type="primary" color="red" class="btn" round size="mini">{{ lookbtn }}</van-button>
  </div>
  <div class="Recommendlist auto">
    <div class="item" v-for="item in extInfo" :key="item.coverId">
      <van-image width="100" height="100" radius="15" fit="cover" :src="item.cover">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" color="#000" />
        </template>
      </van-image>

      <div class="title van-multi-ellipsis--l2">{{ item.title }}</div>
      <span class="count">{{ item.coverTag }}</span>
    </div>
  </div>
</template>
