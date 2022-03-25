<template>
  <div class="Recommendlist auto">
    <div class="item" v-for="item in attrs.playlist" :key="item.creativeId">
      <van-image
        width="100"
        height="100"
        radius="15"
        fit="cover"
        :src="item.resources[0].uiElement.image.imageUrl"
        @click="router(item.resources[0].resourceId)"
      >
        <template v-slot:loading>
          <van-loading type="spinner" size="20" color="#000" />
        </template>
      </van-image>

      <div class="title van-multi-ellipsis--l2">{{ item.uiElement.mainTitle.title }}</div>
      <span class="count">{{ playCount(item.resources[0].resourceExtInfo.playCount) }}</span>
    </div>
  </div>
</template>

<script>
import { getrecommendlist } from '@/api/songsheet.js';
import { playCount } from '@/Util/fltter.js';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  setup(props, { attrs }) {
    const DynamicRouter = useRouter();
    const list = ref([]);
    const router = (id) => {
      DynamicRouter.push({
        name: 'songsdetails',
        params: { id: id },
      });
    };
    onMounted(() => {
      list.value = attrs.playlist;
    });

    return {
      playCount,
      router,
      DynamicRouter,
      attrs,
      list,
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
