<script>
import { getcloudsearch } from '@/api/search.js';
import { nextTick, ref } from 'vue';
import { playaudiorule } from '@/Util/fltter.js';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
import { show } from '@/hooks/status.js';
export default {
  name: 'muisclist',
  setup(props, { attrs }) {
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const results = ref([]);
    const offset = ref(1);
    const store = useStore();
    const router = useRouter();
    const onLoad = async () => {
      const { data } = await getcloudsearch({
        keywords: attrs.attrs.value,
        type: 1,
        offset: (offset.value - 1) * 30,
      });
      if (!data.result.songs) {
        return (finished.value = true);
      }
      results.value.push(...data.result.songs);
      loading.value = false;
      if (data.result.songs.length) {
        offset.value++;
      } else {
        finished.value = true;
      }
    };
    const play = (index) => {
      playaudiorule(index, store, nextTick, Toast, results.value, show);
    };
    return {
      attrs,
      list,
      onLoad,
      loading,
      finished,
      results,
      offset,
      store,
      play,
      router,
      playaudiorule,
    };
  },
};
</script>

<style lang="less" scoped>
.list {
  padding-bottom: 20px;
  height: 80vh;
  overflow-y: auto;
  .songslist {
    margin: 0 auto;

    width: 95vw;
    bottom: 50;
    left: 0;
    padding-bottom: 17px;
    right: 0;
    .item {
      margin-bottom: 10px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .data {
        max-width: 40vw;
        margin-left: 10px;
        .songname {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 10px;
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

  .icons {
    .tv {
      margin-right: 15px;
    }
  }
  .title {
    padding: 10px;
    display: flex;
    color: #000;
    font-size: 14px;
    align-items: center;
    box-sizing: border-box;

    .playallinfo {
      margin-left: 10px;
    }
  }
}
</style>

<template>
  <div class="list">
    <div class="title" style="padding: 10px;">
      <van-icon name="play-circle-o" size="28" color="red" />
      <div class="playallinfo">播放全部</div>
    </div>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="songslist">
        <div class="item" v-for="(item, index) in results" :key="item" @click="play(index)">
          <div class="left">
            <div class="index">{{ index + 1 }}</div>

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

        <div class="van-hairline--bottom"></div>
      </div>
    </van-list>
  </div>
</template>
