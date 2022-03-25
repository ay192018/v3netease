<template>
  <div class="Random">
    <div class="recommend ">
      <h3><van-icon name="replay" size="20" color="#b0b0b0" />{{ Dynamictitle }}</h3>
      <van-button type="primary" color="red" class="btn" round size="mini">{{ Dynamicbtn }}</van-button>
    </div>
    <div class="content">
      <van-swipe class="my-swipe" indicator-color="white" :show-indicators="false" :width="325" :loop="false">
        <van-swipe-item v-for="(item, index) in Dynamic" :key="index">
          <div class="item" v-for="(items, indexs) in item.resources" :key="indexs" @click="play(item, indexs)">
            <div class="left">
              <div class="img">
                <van-icon
                  :name="
                    item.resources.length === 3 && store.state.audio.played && indexs === store.state.curret
                      ? 'stop'
                      : 'play'
                  "
                  size="20"
                  color="#fff"
                  class="icon"
                />
                <van-image
                  width="40"
                  height="40"
                  fit="cover"
                  radius="15"
                  :src="items.resourceExtInfo.songData.album.picUrl"
                />
              </div>

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
            <van-icon name="play-circle-o" class="play" size="25" color="#c4c4c4" />
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { Dynamicbtn, Dynamictitle } from '@/hooks/reactive';
import { playaudiorule } from '@/Util/fltter.js';
import { inject, markRaw, nextTick, ref } from 'vue';
import { useStore } from 'vuex';
import { Toast } from 'vant';
import { show } from '@/hooks/status.js';
export default {
  setup() {
    const Dynamic = markRaw(inject('Dynamic'));
    const store = useStore();
    const list = ref([]);
    const play = (item, index) => {
      let list = [];
      for (let i = 0; i < item.resources.length; i++) {
        let obj = {
          al: {
            picUrl: '',
          },
          name: '',
          ar: [
            {
              name: '',
            },
          ],
          id: 0,
        };
        const ie = item.resources[i];
        obj.al.picUrl = ie.resourceExtInfo.songData.album.picUrl;
        obj.name = ie.resourceExtInfo.songData.name;
        obj.ar[0].name = ie.resourceExtInfo.songData.artists[0].name;
        obj.id = ie.resourceExtInfo.songData.id;
        list.push(obj);
      }
      list.value = list;
      playaudiorule(index, list.value, store, show, nextTick, Toast);
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
  background: #fff;
  border-radius: 15px;
  padding: 3px;
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
    .my-swipe .van-swipe-item {
      color: #000;
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 5px 0;
        .left {
          display: flex;
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
            .singer {
              color: #c4c4c4;
            }
          }
        }
        .play {
          margin-right: 15px;
        }
      }
    }
  }
}
</style>
