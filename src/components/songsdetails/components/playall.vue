<script>
import { myMixin } from '@/mixin/index.js';
import { playCount, playaudiorule } from '@/Util/fltter.js';
import { getallsongs } from '@/api/songsheet.js';
import { ref, computed, watchEffect, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Toast } from 'vant';
import { show } from '@/hooks/status.js';
export default {
  mixins: [myMixin],
  name: 'playlistid',
  setup(props, { attrs, emit }) {
    const id = ref([]);
    const allsongs = ref([]);
    const router = useRouter();
    const store = useStore();
    const load = ref(false);
    watchEffect(async () => {
      attrs.songsdata.trackIds.forEach((item) => {
        id.value.push(item.id);
      });
      if (ids) {
        const { data } = await getallsongs({ ids: ids.value.join() });
        if (data.code === 200) {
          load.value = true;
          allsongs.value = data.songs;
          // (data.songs);
          emit('length', allsongs.value.length);
        } else {
          Toast.fail('加载失败,也许歌曲太多了');
        }
      }
    });

    /**
     * @param {Number}传入索引
     */
    const play = (index) => {
      playaudiorule(index, store, nextTick, Toast, allsongs.value, show);
    };
    const ids = computed(() => {
      return id.value;
    });
    return {
      allsongs,
      playCount,
      play,
      myMixin,
      load,
      router,
      playaudiorule,
    };
  },
};
</script>

<style lang="less" scoped>
.playall {
  width: 95vw;
  height: 65vh;
  margin: 0 auto;

  .songslist {
    padding-bottom: 6vh;
    .item {
      margin-top: 10px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .data {
        max-width: 40vw;
        margin-left: 10px;
        .songname {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 14px;
        }
        .songtitle {
          font-size: 10px;
          color: #c4c4c4;
        }
      }
    }
  }
  .left {
    display: flex;
    .index {
      line-height: 47.02px;
      margin-right: 8px;
      font-size: 12px;
    }
  }
  .loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .icons {
    .tv {
      margin-right: 15px;
    }
  }
}
</style>
<template>
  <div class="playall">
    <van-loading type="spinner" size="80px" class="loading" v-if="load === false" />
    <div class="songslist auto" v-else>
      <div class="item" v-for="(item, index) in allsongs" :key="index" @click="play(index)">
        <div class="left">
          <div class="index">{{ index + 1 }}</div>
          <!-- <van-image width="40" height="40" radius="15" :src="item.al.picUrl" /> -->
          <div class="data">
            <div class="songname van-ellipsis">
              {{ item.name }}
            </div>
            <div class="songtitle van-ellipsis">
              {{ `${item.ar[0].name}--${item.name}` }}
            </div>
          </div>
        </div>
        <div class="icons">
          <van-icon
            name="tv-o"
            v-if="item.mv"
            size="20"
            @click.stop="
              router.push({
                name: 'video',
                params: {
                  id: item.mv,
                },
              })
            "
            class="tv"
          />
          <van-icon name="ellipsis" size="20" />
        </div>
      </div>
      <nut-backtop :bottom="150" :right="50" :duration="3000"></nut-backtop>
    </div>
  </div>
</template>
