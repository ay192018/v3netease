<script>
import { ref, reactive } from 'vue';
import Muisclist from './muisclist.vue';
import Album from './album.vue';
import Singer from './singer.vue';
import Playlist from './playlist.vue';
import User from './user.vue';
import Video from './video.vue';
import Mv from './mv.vue';
export default {
  components: {
    Muisclist,
    Album,
    Singer,
    Playlist,
    User,
    Video,
    Mv,
  },
  name: 'results',
  setup(props, { attrs }) {
    // 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手,
    // 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频,
    const active = ref(0);

    const params = reactive([
      {
        type: 1,
        title: '单曲',
      },
      {
        type: 10,
        title: '专辑',
      },
      {
        type: 100,
        title: '歌手',
      },
      {
        type: 1000,
        title: '歌单',
      },
      {
        type: 1002,
        title: '用户',
      },
      {
        type: 1004,
        title: 'MV',
      },
      {
        type: 1006,
        title: '歌词',
      },
      {
        type: 1009,
        title: '电台',
      },
      {
        type: 1014,
        title: '视频',
      },
    ]);
    return {
      active,
      params,
      attrs,
    };
  },
};
</script>

<style lang="less" scoped>
.results {
}
</style>

<template>
  <div class="results">
    <van-tabs v-model:active="active" animated>
      <van-tab title="单曲"> <Muisclist :attrs="attrs"/></van-tab>
      <van-tab title="专辑"> <Album :attrs="attrs"/></van-tab>
      <van-tab title="视频"> <Video :attrs="attrs"/></van-tab>
      <van-tab title="歌手"> <Singer :attrs="attrs"/></van-tab>
      <van-tab title="歌单"> <Playlist :attrs="attrs"/></van-tab>
      <van-tab title="用户"> <User :attrs="attrs"/></van-tab>
      <van-tab title="MV"> <Mv :attrs="attrs"/></van-tab>
      <van-tab title="歌词"> <Muisclist :attrs="attrs"/></van-tab>
    </van-tabs>
  </div>
</template>
