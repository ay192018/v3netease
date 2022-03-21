<script>
import { getindexFind } from '@/api/indexFind.js';
import { Notify } from 'vant';
import { onMounted, reactive, markRaw } from 'vue';
import { useRouter } from 'vue-router';
import { week } from '@/Util/dayjs.js';
export default {
  setup() {
    const icons = reactive({ icon: [] });
    const router = useRouter();
    onMounted(async () => {
      const { data } = await getindexFind();
      // console.log(data.data);
      icons.icon = markRaw(data.data);
    });
    const torouter = (index) => {
      if (index === 3) {
        return router.push('/ranking');
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
