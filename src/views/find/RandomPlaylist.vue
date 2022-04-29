<template>
  <div class="Random auto">
    <div class="recommend ">
      <h3><van-icon name="replay" size="20" color="#b0b0b0" />{{ Dynamictitle }}</h3>

      <van-button type="primary" class="btn" hairline round size="mini">
        <template #icon> {{ Dynamicbtn }}<van-icon name="arrow" /> </template>
      </van-button>
    </div>
    <div class="content">
      <van-swipe class="my-swipe" indicator-color="white" :show-indicators="false" :width="325" :loop="false">
        <van-swipe-item v-for="(item, index) in Dynamic" :key="index">
          <div class="item" v-for="(items, indexs) in item.resources" :key="indexs" @click="play(items)">
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

              <div class="songdata">
                <div class="name van-ellipsis">
                  {{ items.resourceExtInfo.songData.name }}
                  <span class="singer van-ellipsis">-{{ items.resourceExtInfo.songData.artists[0].name }}</span>
                </div>
                <div class="singer" v-if="items.resourceExtInfo.commentSimpleData">
                  {{ items.resourceExtInfo.commentSimpleData.content }}
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
import { Dynamicbtn, Dynamictitle } from '@/hooks/reactive';
import { playaudiorule, Songs } from '@/Util/fltter.js';
import { inject, markRaw, nextTick, ref } from 'vue';
import { useStore } from 'vuex';
import { Toast } from 'vant';
import { show } from '@/hooks/status.js';
export default {
  name: 'RandomPlaylist',
  setup() {
    const Dynamic = markRaw(inject('Dynamic'));
    const store = useStore();
    const list = ref([]);
    const play = (items) => {
      let i = null;
      Dynamic.value
        .map((item) => {
          return item.resources;
        })
        .flat()
        .forEach((item, index) => {
          if (item.resourceExtInfo.songData.id === items.resourceExtInfo.songData.id) {
            i = index;
          }
          list.value.push(
            new Songs(
              { picUrl: item.resourceExtInfo.songData.album.picUrl },
              item.resourceExtInfo.songData.name,
              [{ name: item.resourceExtInfo.songData.artists[0].name }],
              item.resourceExtInfo.songData.id,
            ),
          );
        });

      playaudiorule(i, store, nextTick, Toast, list.value, show);
    };
    return {
      Dynamicbtn,
      Dynamictitle,
      Dynamic,
      play,
      playaudiorule,
      store,
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
    .btn {
      width: 50px;
    }
  }
  .content {
    width: auto;
    height: auto;
    padding: 5px;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 5px 0;
      .left {
        display: flex;
        align-items: left;
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
        .songdata {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          font-size: 13px;
          width: 250px;
          .name {
            text-align: left !important;
          }
          .singer {
            color: #c8c9cc;
            text-align: left !important;
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
