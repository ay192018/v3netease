<template>
  <div class="video">
    <van-nav-bar :border="false" @click-left="router.back()">
      <template #left
        ><van-icon name="arrow-left" color="#fff" size="24" /> </template
    ></van-nav-bar>

    <VueDanmaku
      :danmus="danmus"
      ref="danmaku"
      autoplay
      :loop="true"
      class="Danmaku"
      :right="4"
      :speeds="100"
      :debounce="1000"
    />

    <video :src="url" class="controls" controls ref="video"></video>
  </div>
</template>

<script>
import { getvideodetail, getvideourl, getvideocomment } from "@/api/video.js";
import { nextTick, onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import VueDanmaku from "vue3-danmaku";
import { ref } from "vue";
export default {
  components: { VueDanmaku },
  setup(props, { attrs }) {
    const data = ref({});
    const url = ref("");
    const video = ref(null);
    const danmaku = ref(null);
    const router = useRouter();

    const danmus = ref([]);

    onMounted(async () => {
      const { data } = await getvideodetail({
        id: attrs.id,
      });
      const res = await getvideourl({
        id: attrs.id,
      });
      const comment = await getvideocomment({
        id: attrs.id,
        limit: 100,
      });

      let arr = [];
      comment.data.comments.forEach((item) => {
        arr.push(item.content);
      });
      danmus.value = arr;

      data.value = data.data;

      url.value = res.data.urls[0].url;
    });
    return {
      data,
      url,
      video,
      router,
      danmus,
      danmaku,
    };
  },
};
</script>

<style lang="less" scoped>
.video {
  background: #fff;
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
    background: #000;
    object-fit: contain;
    position: fixed !important;
    top: 0px !important;
    right: 0px !important;
    bottom: 0px !important;
    left: 0px !important;
    box-sizing: border-box !important;
    min-width: 0px !important;
    max-width: none !important;
    min-height: 0px !important;
    max-height: none !important;
    width: 100% !important;
    height: 100% !important;
    transform: none !important;
    margin: 0px !important;
  }
  /deep/ .van-nav-bar {
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
}
</style>
