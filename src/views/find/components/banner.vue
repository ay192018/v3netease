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
    /*   watchEffect(() => {
      (attrs.banner);
    }); */
    const herf = (item) => {
      if (item.typeTitle === '歌单') {
        /*   (item); */
        router.push({
          name: 'songsdetails',
          params: { id: item.encodeId },
        });
      } else if (item.typeTitle === '新歌首发') {
          
         /* let list = [];

        list.unshift(
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
.Swipe {
  overflow: hidden;
}
</style>

<template>
  <div class="Swipe auto">
    <van-swipe :autoplay="2000" :duration="300" indicator-color="white">
      <van-swipe-item v-for="(item, index) in attrs.banner" :key="index" @click="herf(item)">
        <van-image width="100%" height="100%" radius="15" :src="item.pic">
          <template v-slot:loading> <van-loading type="spinner" size="20" color="#000" /> </template
        ></van-image>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
