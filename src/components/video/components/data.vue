<script>
import Commnts from './commnts.vue';
import { playCount, jobCount } from '@/Util/fltter.js';
import { ref, watchEffect, reactive, inject } from 'vue';
import MyHooks from '@/hooks/index.js';
export default {
  name: 'videoid',
  components: {
    Commnts,
  },
  setup(props, { attrs }) {
    const show = ref(false);

    const { router, store } = MyHooks();
    const artists = reactive({
      creator: {},
      followed: {},
    });

    watchEffect(() => {
      if (attrs.attrs.length > 8) {
        artists.creator = attrs.data.creator;
      } else {
        artists.followed = attrs.data.artists;
        attrs.data.artists;
      }
      // (artists.followed);
    });
    const tocommnts = () => {
      store.dispatch('setflag', 5);
      show.value = true;
      // router.push({
      //   name: "comments",
      //   params: {
      //     id: attrs.attrs,
      //   },
      // });
    };
    return {
      attrs,
      playCount,
      store,
      router,
      tocommnts,
      show,
      jobCount,
      artists,
      MyHooks,
    };
  },
};
</script>

<style lang="less" scoped>
.data {
  width: 95vw;
  height: 35vh;
  margin: 15px auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 2vh;
  .describe {
    width: 100%-10vh;
    height: 45%;

    position: absolute;
    bottom: 0;
    .user {
      display: flex;
      align-items: center;
      .username {
        margin: 0 5px;
      }
    }
    .title {
      margin: 10px 0;
    }
  }
  .icons {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 10vw;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .item {
      text-align: center;
    }
  }
  .number {
    padding-top: 5px;
    font-size: 13px;
    color: #fff;
  }
}
</style>

<template>
  <div class="data">
    <div class="describe">
      <div class="user">
        <van-image
          width="40"
          height="40"
          round
          fit="cover"
          :src="attrs.attrs.length > 8 ? attrs.data.creator.avatarUrl : attrs.data.data.cover"
        />
        <span
          class="number username"
          @click="
            router.push({
              name: 'user',
              params: {
                id: attrs.data.creator.userId,
              },
            })
          "
          >{{ attrs.attrs.length > 8 ? attrs.data.creator.nickname : attrs.data.data.artistName }}</span
        >
        <van-button
          type="primary"
          :color="attrs.data.creator.followed ? '#ccc' : 'red'"
          size="mini"
          :disabled="attrs.data.creator.followed ? true : false"
          :icon="attrs.data.creator.followed ? 'success' : 'add-o'"
          round
          >{{ attrs.data.creator.followed ? '已关注' : '关注' }}</van-button
        >
      </div>
      <div class="number van-multi-ellipsis--l2 title">
        {{ attrs.attrs.length > 8 ? attrs.data.data.title : attrs.data.data.name }}
      </div>
      <span class="number"
        >{{ playCount(attrs.attrs.length > 8 ? attrs.data.data.playTime : attrs.data.data.playCount) }}次观看</span
      >
    </div>
    <div class="icons">
      <div class="item">
        <van-icon name="good-job" color="#fff" size="35" class="play" /><span class="number">{{
          jobCount(attrs.attrs.length > 8 ? attrs.data.data.praisedCount : attrs.data.data.subCount)
        }}</span>
      </div>
      <div class="item">
        <van-icon name="chat" color="#fff" size="35" class="play" @click="tocommnts" /><span class="number">{{
          jobCount(attrs.data.data.commentCount)
        }}</span>
      </div>
      <div class="item">
        <van-icon name="share" color="#fff" size="35" class="play" /><span class="number">{{
          jobCount(attrs.data.data.shareCount)
        }}</span>
      </div>
      <div class="item">
        <van-icon name="add" color="#fff" size="35" class="play" /><span class="number">收藏</span>
      </div>
    </div>
    <van-popup v-model:show="show" position="bottom" :style="{ height: '70%' }" round
      ><Commnts :attrs="attrs"
    /></van-popup>
  </div>
</template>
