<script>
import { getcloudsearch } from '@/api/search.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { playCount } from '@/Util/fltter.js';
export default {
  name: 'mv',
  setup(props, { attrs }) {
    const artists = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const router = useRouter();
    const offset = ref(1);
    const onLoad = async () => {
      // (attrs.attrs.value);
      const { data } = await getcloudsearch({
        keywords: attrs.attrs.value,
        type: 1014,
        offset: (offset.value - 1) * 20,
      });
      if (!data.result.videos) {
        return (finished.value = true);
      }
      artists.value.push(...data.result.videos);
      loading.value = false;

      if (data.result.videos.length) {
        offset.value++;
      } else {
        finished.value = true;
      }
    };
    const tovideo = (vid) => {
      router.push({
        name: 'video',
        params: {
          id: vid,
        },
      });
    };
    return {
      attrs,
      artists,
      onLoad,
      loading,
      finished,
      router,
      playCount,
      tovideo,
    };
  },
};
</script>

<style lang="less" scoped>
.video {
  background: #fff;
  padding-bottom: 20px;
  height: 80vh;
  overflow-y: auto;
  .content {
    width: 100%-31vw;
    margin-left: 15px;
    .title {
      margin-right: 4px;
      font-size: 13px;
      width: 60vw;
    }
    .describe {
      font-size: 13px;
      color: #dedede;
    }
  }
  .user {
    color: #646566;
    font-size: 12px;
    margin-left: 5px;
  }
  .pic {
    position: relative;
  }
  .count {
    z-index: 1;
    font-size: 12px;
  }
}
</style>

<template>
  <div class="video">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item, index) in artists" :key="index" clickable @click="tovideo(item.vid)">
        <template #icon>
          <div class="pic">
            <span class="count">{{ playCount(item.playTime) }}</span>
            <van-image width="30vw" height="10vh" radius="15" :src="item.coverUrl" />
          </div>
        </template>
        <template #title>
          <div class="content">
            <div class="title van-multi-ellipsis--l2" style="overflow: hidden">
              {{ item.title }}
            </div>
            <span class="user">{{ item.creator[0].userName }}</span>
            <span class="user"> {{ playCount(item.playTime) }}播放</span>
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>
