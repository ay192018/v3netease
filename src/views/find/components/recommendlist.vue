<script>
import { getrecommendlist } from '@/api/songsheet.js';
import { playCount } from '@/Util/fltter.js';
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const songsheet = reactive({ songs: [] });
    onMounted(async () => {
      const { data } = await getrecommendlist({ limit: 30 });
      songsheet.songs = data.result;
      //   console.log(songsheet);
    });
    const DynamicRouter = useRouter();

    const router = (id) => {
      DynamicRouter.push({
        name: 'songsdetails',
        params: { id: id },
      });
    };

    return {
      songsheet,
      playCount,
      router,
      DynamicRouter,
    };
  },
};
</script>

<style lang="less" scoped>
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
  }
}
</style>

<template>
  <div class="Recommendlist auto">
    <div class="item" v-for="item in songsheet.songs" :key="item.id">
      <van-image width="100" height="100" radius="15" fit="cover" :src="item.picUrl" @click="router(item.id)">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" color="#000" />
        </template>
      </van-image>

      <div class="title van-multi-ellipsis--l2">{{ item.name }}</div>
      <span class="count">{{ playCount(item.playCount) }}</span>
    </div>
  </div>
</template>
