<script>
import { getgroup } from '@/api/video.js';

import { ref, reactive } from 'vue';
import { playCount } from '@/Util/fltter.js';
import { useRouter } from 'vue-router';

export default {
  name: 'itemvideo',
  setup(props, { attrs }) {
    const loading = ref(false);
    const finished = ref(false);
    const videolist = reactive({
      datas: [],
      offset: 0,
    });

    const router = useRouter();

    const onLoad = async () => {
      const { data } = await getgroup({
        id: attrs.item,
        offset: videolist.offset,
      });

      videolist.datas.push(...data.datas);
      loading.value = false;

      if (data.datas.length) {
        videolist.offset++;
      } else {
        finished.value = true;
      }
    };

    return {
      loading,
      finished,
      onLoad,
      videolist,
      playCount,
      router,
    };
  },
};
</script>

<style lang="less" scoped>
.item {
  margin: 0 auto;
  height: 78vh;

  overflow-y: auto;
  .videoitem {
    width: 47%;
    height: auto;

    border-radius: 15px;
    margin: 5px;
    .title {
      margin: 5px;
    }
    .user {
      width: 95%;
      margin: 0 auto;

      display: flex;
      align-items: center;
      & div {
      }
      .title {
        width: 35%;
      }
    }
  }
  ::v-deep(.van-list) {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-bottom: 50px;
  }
  .job {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>

<template>
  <div class="item">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="videoitem" v-for="(item, index) in videolist.datas" :key="index">
        <div>
          <van-image
            width="100%"
            fit="cover"
            radius="15"
            :src="item.data.coverUrl"
            @click="
              router.push({
                name: 'video',
                params: {
                  id: item.data.vid,
                },
              })
            "
          >
            <template v-slot:loading> <van-loading type="spinner" size="20" color="#000" /> </template
          ></van-image>
        </div>
        <div class="title van-multi-ellipsis--l2">
          {{ item.data.title }}
        </div>
        <div class="user">
          <div>
            <van-image width="30" height="30" fit="cover" round :src="item.data.creator.avatarUrl" />
          </div>
          <div class="title van-ellipsis">
            {{ item.data.creator.nickname }}
          </div>
          <div class="job">
            <van-icon name="good-job-o" /><span>{{ playCount(item.data.playTime) }}</span>
          </div>
        </div>
      </div>
      <nut-backtop :bottom="150" :right="50"></nut-backtop>
    </van-list>
  </div>
</template>
