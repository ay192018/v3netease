<template>
  <div class="Random auto">
    <div class="recommend ">
      <h3>{{ rankingtitle }}</h3>

      <van-button type="primary" class="btn" hairline round size="mini">
        <template #icon> {{ rankingbtn }}<van-icon name="arrow" /> </template>
      </van-button>
    </div>
    <div class="content">
      <van-swipe class="my-swipe" indicator-color="white" :show-indicators="false" :loop="false">
        <van-swipe-item v-for="(item, index) in attrs.ranking" :key="index"
          ><span class="title" @click="send(item)">{{ item.uiElement.mainTitle.title }}<van-icon name="arrow"/></span>
          <div class="item" v-for="(items, indexs) in item.resources" :key="indexs" @click="play(item, indexs)">
            <div class="contents">
              <div class="left">
                <div class="img">
                  <!-- <van-icon
                    :name="
                      item.resources.length === 3 && store.state.audio.played && indexs === store.state.curret
                        ? 'stop'
                        : 'play'
                    "
                    size="20"
                    color="#fff"
                    class="icon"
                  /> -->
                  <van-image
                    width="40"
                    height="40"
                    fit="cover"
                    radius="15"
                    :src="items.resourceExtInfo.songData.album.picUrl"
                  />
                </div>
                <span class="index">{{ indexs + 1 }}</span>
                <div class="songdata">
                  <div class="van-ellipsis">
                    {{ items.resourceExtInfo.songData.name }}
                    <span class="singer van-ellipsis">-{{ items.resourceExtInfo.songData.artists[0].name }}</span>
                  </div>
                  <div class="singer" v-if="items.resourceExtInfo.commentSimpleData">
                    {{ items.resourceExtInfo.commentSimpleData.content }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { rankingtitle, rankingbtn } from '@/hooks/reactive';
import { playaudiorule, Songs } from '@/Util/fltter.js';
import { inject, markRaw, ref, nextTick, computed } from 'vue';
import { useStore } from 'vuex';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
import { show } from '@/hooks/status.js';
import { getallsongs } from '@/api/songsheet.js';

export default {
  name: 'ranking',
  setup(props, { attrs }) {
    const Dynamic = markRaw(inject('Dynamic'));
    const store = useStore();
    const router = useRouter();

    const playId = computed(() => {
      return store.state.songlist[store.state.curret].id;
    });
    /* item.creativeExtInfoVO.topListOriginId */
    const play = async (item, index) => {
      const { data } = await getallsongs({
        ids: item.creativeExtInfoVO.topListSongIds.join(),
      });
      playaudiorule(index, store, nextTick, Toast, data.songs, show);
    };
    const send = (item) => {
      if (!item.creativeExtInfoVO.topListOriginId) {
        return Toast('没有此歌单的ID');
      }
      router.push({
        name: 'songsdetails',
        params: { id: item.creativeExtInfoVO.topListOriginId },
      });
    };
    return {
      rankingtitle,
      rankingbtn,
      Dynamic,
      attrs,
      playaudiorule,
      store,
      play,
      playId,
      getallsongs,
      router,
      send,
    };
  },
};
</script>

<style lang="less" scoped>
.Random {
  .recommend {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    .btn {
      width: 50px;
    }
  }
  .content {
    width: auto;
    height: auto;
    padding: 5px;

    .title {
      font-size: 15px;
      font-weight: bold;
    }
    .item {
      margin: 5px 0;
      .contents {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          justify-content: space-between;

          .img {
            margin-right: 5px;
            position: relative;
            .icon {
              position: absolute;
              left: 27%;
              top: 27%;
              z-index: 1;
            }
          }
          .index {
            line-height: 50px;
            margin: 0 5px;
            font-size: 13px;
            font-weight: bold;
          }
          .songdata {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            text-align: left;
            font-size: 13px;
            .singer {
              color: #c4c4c4;
              font-size: 12px;
            }
          }
        }
      }
      .play {
        margin-right: 15px;
      }
    }
  }
}
</style>
