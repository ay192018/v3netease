<template>
  <div class="song" @click="play">
    <div>
      <van-image width="50" height="50" fit="cover" radius="15" :src="attrs.song.album.picUrl" />
    </div>
    <van-cell clickable :title="attrs.song.name" :label="attrs.song.album.artists[0].name" />
  </div>
</template>

<script>
import { playaudiorule, Songs } from '@/Util/fltter.js';
import { useStore } from 'vuex';
import { Toast } from 'vant';
import { nextTick } from 'vue';
import { show } from '@/hooks/status.js';
export default {
  setup(props, { attrs }) {
    const store = useStore();
    const play = () => {
      playaudiorule(
        0,
        store,
        nextTick,
        Toast,
        [
          new Songs(
            { picUrl: attrs.song.album.picUrl },
            attrs.song.name,
            [{ name: attrs.song.album.artists[0].name }],
            attrs.song.id,
          ),
        ],
        show,
      );
    };
    return {
      attrs,
      play,
    };
  },
};
</script>

<style lang="less" scoped>
.song {
  display: flex;
  align-items: center;
  width: 100%;
}
</style>
