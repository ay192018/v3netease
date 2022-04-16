<script>
import { getindexFind, geDM } from '@/api/indexFind.js';

import { Notify, Toast } from 'vant';
import { playaudiorule, Songs } from '@/Util/fltter.js';
import { onMounted, reactive, markRaw, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { week } from '@/Util/dayjs.js';
import { useStore } from 'vuex';
import { show } from '@/hooks/status.js';
export default {
  name: 'Findicon',
  setup() {
    const icons = reactive({ icon: [] });
    const router = useRouter();
    const store = useStore();
    onMounted(async () => {
      const { data } = await getindexFind();
      // (data.data);
      icons.icon = markRaw(data.data);
    });
    const torouter = async (index) => {
      if (index === 3) {
        return router.push('/ranking');
      } else if (index === 1) {
        let list = [];
        const { data } = await geDM();
        data.data;
        data.data.forEach((item) => {
          list.push(new Songs({ picUrl: item.album.picUrl }, item.name, [{ name: item.artists[0].name }], item.id));
        });
        playaudiorule(index, store, nextTick, Toast, list, show);
        return;
      }
      Notify({ type: 'warning', message: '功能暂未开发' });
    };
    return {
      icons,
      week,
      Notify,
      torouter,
      router,
    };
  },
};
</script>

<style lang="less" scoped>
.icons {
  overflow: auto;
  display: flex;
  .item {
    position: relative;
    margin-right: 15px;
    text-align: center;
    img {
      margin-bottom: 5px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: red;
      background-size: cover;
    }
  }
  .data {
    font-size: 15px;
    font-weight: bold;
    color: red;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
  }
}
</style>

<template>
  <div class="icons auto">
    <div class="item" v-for="(item, index) in icons.icon" :key="item.id" @click="torouter(index)">
      <img :src="item.iconUrl" alt="" />
      <span class="title">{{ item.name }}</span>
      <div v-if="index === 0" class="data">
        {{ week(Date.parse(new Date())) }}
      </div>
    </div>
  </div>
</template>
