<script>
import { getcloudsearch } from '@/api/search.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'singer',
  setup(props, { attrs }) {
    const artists = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const router = useRouter();
    const offset = ref(1);
    const onLoad = async () => {
      attrs.attrs.value;
      const { data } = await getcloudsearch({
        keywords: attrs.attrs.value,
        type: 100,
        offset: (offset.value - 1) * 20,
      });

      artists.value.push(...data.result.artists);
      loading.value = false;
      data.result.artists;
      if (data.result.artists.length) {
        offset.value++;
      } else {
        finished.value = true;
      }
    };

    return {
      attrs,
      artists,
      onLoad,
      loading,
      finished,
      router,
    };
  },
};
</script>

<style lang="less" scoped>
.singer {
  padding-bottom: 20px;
  height: 80vh;
  overflow-y: auto;
  .content {
    margin-left: 15px;
    .title {
      margin-right: 4px;
      vertical-align: middle;
      text-overflow: ellipsis;
      white-space: nowrap;

      width: 80vw;
    }
    .describe {
      font-size: 13px;
      color: #dedede;
    }
  }
}
</style>

<template>
  <div class="singer">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        v-for="(item, index) in artists"
        :key="index"
        clickable
        @click="
          router.push({
            name: 'user',
            params: {
              id: item.id,
            },
          })
        "
      >
        <template #icon>
          <van-image width="50" height="50" radius="15" :src="item.img1v1Url" />
        </template>
        <template #title>
          <div class="content">
            <span class="title" style="overflow: hidden">{{ item.name }}</span>

            <span class="title" style="overflow: hidden" v-for="(item, index) in item.alias" :key="index">{{
              item
            }}</span>
          </div>
        </template>
        <template #right-icon>
          <van-button
            type="primary"
            :color="item.followed ? '#ccc' : 'red'"
            size="mini"
            :disabled="item.followed ? true : false"
            :icon="item.followed ? 'success' : 'add-o'"
            round
            >{{ item.followed ? '已关注' : '关注' }}</van-button
          >
        </template>
      </van-cell>
    </van-list>
  </div>
</template>
