<script>
import { playCount } from '@/Util/fltter.js';

import { getMlogtovideo } from '@/api/video.js';
import { useRouter } from 'vue-router';
import { recentVideo, Videotext } from '@/hooks/reactive';
import { ref } from 'vue';
export default {
  naem: 'video',
  setup(props, { attrs }) {
    const router = useRouter();

    const cookie = ref(JSON.parse(window.localStorage.getItem('cookie')));

    const send = async (id) => {
      const { data } = await getMlogtovideo({
        id: id,
      });
      router.push({
        name: 'video',
        params: {
          id: data.data,
        },
      });
    };
    return {
      playCount,
      router,
      ref,
      cookie,
      attrs,
      send,
      Videotext,
      recentVideo,
    };
  },
};
</script>

<style lang="less" scoped>
.video {
  height: auto;
  background: #fff;
  padding: 5px;

  .videolist {
    overflow-x: auto;
    overflow-y: hidden;
    height: auto;
    display: flex;
    .item {
      width: 100px;
      position: relative;
      margin-right: 15px;
      height: auto;
      .titles {
        height: auto;
        width: 100%;
        overflow: hidden;
        font-size: 13px;
      }
    }
  }
}
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>

<template>
  <div class="video auto">
    <div class="recommend">
      <h3>{{ recentVideo }}</h3>

      <van-button type="primary" class="btn" hairline round size="mini" @click="router.push('/Videosquare')">
        <template #icon> {{ Videotext }}<van-icon name="revoke" /> </template>
      </van-button>
    </div>
    <div class="videolist">
      <div class="item" v-for="(item, index) in attrs.video" :key="index">
        <van-image
          width="110"
          height="130"
          radius="15"
          fit="cover"
          :src="item.resource.mlogBaseData.coverUrl"
          @click="send(item.resource.mlogBaseData.id)"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" color="#000" />
          </template>
        </van-image>
        <div class="titles van-multi-ellipsis--l2">
          {{ item.resource.mlogBaseData.text }}
        </div>
        <span class="count">{{ playCount(item.resource.mlogExtVO.playCount) }}</span>
      </div>
    </div>
  </div>
  <!--  <van-empty image="network" description="请登录" v-else>
    <van-button
      round
      type="danger"
      class="bottom-button"
      @click="router.push('/login')"
      >登录</van-button
    >
  </van-empty> -->
</template>
