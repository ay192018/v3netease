<template>
  <div class="video auto" v-if="cookie">
    <div class="title">
      <h3>精选音乐视频</h3>
      <van-button
        type="primary"
        color="red"
        icon="revoke"
        round
        size="mini"
        @click="replist"
        >换一批</van-button
      >
    </div>
    <div class="videolist">
      <div class="item" v-for="(item, index) in videolist.list" :key="index">
        <van-image
          width="100"
          height="130"
          radius="15"
          fit="cover"
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
          <template v-slot:loading>
            <van-loading type="spinner" size="20" color="#000" />
          </template>
        </van-image>
        <div class="titles van-multi-ellipsis--l2">
          {{ item.data.title }}
        </div>
        <span class="count">{{ playCount(item.data.playTime) }}</span>
      </div>
    </div>
  </div>
  <van-empty image="network" description="请登录" v-else>
    <van-button
      round
      type="danger"
      class="bottom-button"
      @click="router.push('/login')"
      >登录</van-button
    >
  </van-empty>
</template>

<script>
import { playCount } from "@/Util/fltter.js";
import { onMounted, reactive } from "@vue/runtime-core";
import { getvideo } from "@/api/video.js";
import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
  setup() {
    const router = useRouter();
    const videolist = reactive({
      list: [],
      offset: 0,
    });
    const cookie = ref(JSON.parse(window.localStorage.getItem("cookie")));
    onMounted(async () => {
      const { data } = await getvideo({
        offset: videolist.offset,
      });

      videolist.list = data.datas;
    });
    const replist = async () => {
      const { data } = await getvideo({
        offset: videolist.offset++,
      });
      // console.log(data);
      videolist.list = data.datas;
    };
    return {
      videolist,
      playCount,
      replist,
      router,
      ref,
      cookie,
    };
  },
};
</script>

<style lang="less" scoped>
.video {
  padding-bottom: 200px;
  height: auto;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
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
      }
    }
  }
}
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>
