<script>
import {
  getvideodetail,
  getvideourl,
  getvideocomment,
  getmvcomment,
  getvideorelated,
  getmvdetail,
  getmvurl,
} from '@/api/video.js';
import { nextTick, onMounted } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import VueDanmaku from 'vue3-danmaku';
import { ref, reactive, provide } from 'vue';
import Data from './components/data.vue';

export default {
  name: 'videoid',
  components: { VueDanmaku, Data },
  setup(props, { attrs }) {
    const datas = reactive({
      data: {},
      creator: {},
      vid: '',
      artists: null,
    });

    const value = ref(0);
    const onChange = (value) => {
      video.value.currentTime = value;
    };
    const url = ref('');
    const video = ref(null);
    const danmaku = ref(null);
    const router = useRouter();
    const icon = ref(false);
    const danmus = ref([]);
    const duration = ref(0);

    const playstatus = () => {
      //播放状态
      if (video.value.paused && video.value.readyState === 4) {
        nextTick(() => {
          video.value.play();
          icon.value = !icon.value;
          danmaku.value.play();
        });
      } else {
        nextTick(() => {
          video.value.pause();
          icon.value = !icon.value;
          danmaku.value.pause();
        });
      }
    };
    const ended = () => {
      icon.value = !icon.value;
      nextTick(() => {
        danmaku.value.stop();
      });
    };
    const loadedmetadata = (e) => {
      duration.value = e.target.duration;
      // (duration.value);
    };
    const play = () => {
      nextTick(() => {
        video.value.play();
      });
      icon.value = !icon.value;
    };
    const onTimeupdate = (e) => {
      value.value = e.target.currentTime;
    };

    onMounted(async () => {
      if (attrs.id.length > 8) {
        const { data } = await getvideodetail({
          //视频详情
          id: attrs.id,
        });
        // (data);
        const res = await getvideourl({
          //视频地址
          id: attrs.id,
        });
        const comment = await getvideocomment({
          //视频评论弹幕
          id: attrs.id,
          limit: 20,
        });
        let arr = [];
        comment.data.comments.forEach((item) => {
          arr.push(item.content);
        });
        danmus.value = arr;

        datas.data = data.data;
        datas.creator = data.data.creator;
        datas.vid = data.data.vid;
        url.value = res.data.urls[0].url;
        url;
      } else {
        const data = await getmvdetail({
          //mv
          mvid: attrs.id,
        });
        const res = await getmvurl({
          //视频地址
          id: attrs.id,
        });
        const comment = await getmvcomment({
          //视频评论弹幕
          id: attrs.id,
          limit: 100,
        });
        // (data.data.data);
        datas.data = data.data.data;
        url.value = res.data.data.url;
        url.value;
        let arr = [];
        comment.data.comments.forEach((item) => {
          arr.push(item.content);
        });
        danmus.value = arr;

        datas.vid = data.data.vid;

        datas.artists = data.data.data.artists[0];

        datas;
      }
    });
    return {
      datas,
      url,
      video,
      router,
      danmus,
      danmaku,
      playstatus,
      icon,
      play,
      onChange,
      value,
      onTimeupdate,
      loadedmetadata,
      duration,
      attrs,
      ended,
    };
  },
};
</script>

<style lang="less" scoped>
.video {
  background: #000 !important;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 3000;
  width: 100%;
  height: 100%;
  .controls {
    z-index: -1;
    width: 100%;
    position: fixed;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-70%);
  }
  ::v-deep(.van-nav-bar) {
    background: transparent;
  }
  .Danmaku {
    width: 100%;
    height: 20vh;
    position: fixed;
    left: 0;
    top: 10vh;
    right: 0;
  }
  .play {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -150%);
  }
  .slider {
    position: absolute;
    left: 0;
    bottom: 3vh;
  }
}
</style>

<template>
  <div class="video">
    <van-nav-bar :border="false" @click-left="router.back()">
      <template #left><van-icon name="arrow-left" color="#fff" size="24" /> </template
    ></van-nav-bar>

    <VueDanmaku
      :danmus="danmus"
      ref="danmaku"
      :loop="true"
      class="Danmaku"
      :right="4"
      :speeds="100"
      :debounce="1000"
      :randomChannel="true"
    />

    <video
      :src="url"
      class="controls"
      ref="video"
      autoplay
      @click="playstatus"
      @timeupdate="onTimeupdate"
      @loadedmetadata="loadedmetadata"
      @ended="ended"
    />
    <van-icon name="play" @click="play" color="#fff" size="50" class="play" v-if="icon" />
    <Data :data="datas" :attrs="attrs.id" />
    <van-slider
      v-model="value"
      @change="onChange"
      active-color="red"
      button-size="15"
      class="slider"
      min="0"
      :max="duration"
    />
  </div>
</template>
