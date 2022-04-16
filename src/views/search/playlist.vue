<script>
import { getcloudsearch } from '@/api/search.js';
import { playCount } from '@/Util/fltter.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'playlist',
  setup(props, { attrs }) {
    const album = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const router = useRouter();
    const offset = ref(1);
    const onLoad = async () => {
      attrs.attrs.value;
      const { data } = await getcloudsearch({
        keywords: attrs.attrs.value,
        type: 1000,
        offset: (offset.value - 1) * 30,
      });
      data;
      album.value.push(...data.result.playlists);
      loading.value = false;
      if (data.result.playlists.length) {
        offset.value++;
      } else {
        finished.value = true;
      }
    };

    return {
      attrs,
      album,
      onLoad,
      loading,
      finished,
      router,
      playCount,
    };
  },
};
</script>

<style lang="less" scoped>
.playlist {
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
  <div class="playlist">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        v-for="(item, index) in album"
        :key="index"
        clickable
        @click="
          router.push({
            name: 'songsdetails',
            params: {
              id: item.id,
            },
          })
        "
      >
        <template #icon>
          <div>
            <van-image width="50" height="50" radius="15" :src="item.coverImgUrl" />
          </div>
        </template>
        <template #title>
          <div class="content">
            <div class="title" style="overflow: hidden">{{ item.name }}</div>
            <div class="describe">
              {{ `${item.trackCount}首音乐  by${item.creator.nickname} 播放${playCount(item.playCount)}次` }}
            </div>
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>
