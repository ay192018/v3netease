<script>
import { watchEffect } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import { playaudiorule, Songs } from '@/Util/fltter.js';
import { nextTick } from 'vue';
import { useStore } from 'vuex';
import { Toast } from 'vant';
import { show } from '@/hooks/status.js';
export default {
  name: 'banner',
  setup(props, { attrs }) {
    const router = useRouter();
    const store = useStore();
    watchEffect(() => {
      console.log(attrs.banner);
    });
    const herf = (item) => {
      if (item.typeTitle === '歌单') {
        /*   console.log(item); */
        router.push({
          name: 'songsdetails',
          params: { id: item.encodeId },
        });
      } else if (item.typeTitle === '新歌首发') {
        return;
        /*  let list = [];

        list.unshift(
          new Songs({ picUrl: item.song.al.picUrl }, item.song.name, [{ name: item.song.ar[0].name }], item.song.id),
        );
        console.log(
          new Songs({ picUrl: item.song.al.picUrl }, item.song.name, [{ name: item.song.ar[0].name }], item.song.id),
        );
        playaudiorule(0, store, nextTick, Toast, item.song, show); */
      }
    };
    return {
      attrs,
      herf,
    };
  },
};
</script>

<style lang="less" scoped>
.my-swipe {
  height: 150px;
  border-radius: 15px;
  & img {
    width: 100%;
    height: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>

<template>
  <van-swipe class="my-swipe auto" :autoplay="2000" indicator-color="white">
    <van-swipe-item v-for="(item, index) in attrs.banner" :key="index" style="font-size:0" @click="herf(item)">
      <van-image radius="15" fit="cover" :src="item.pic">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" color="#000" />
        </template>
      </van-image>
      <template #indicator>
        <div class="custom-indicator">1111</div>
      </template></van-swipe-item
    >
  </van-swipe>
</template>
