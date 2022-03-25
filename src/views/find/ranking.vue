<template>
  <div class="Random">
    <div class="recommend ">
      <h3>{{ rankingtitle }}</h3>
      <van-button type="primary" color="red" class="btn" round size="mini">{{ rankingbtn }}</van-button>
    </div>
    <div class="content">
      <van-swipe class="my-swipe" indicator-color="white" :show-indicators="false" :width="325" :loop="false">
        <van-swipe-item v-for="(item, index) in attrs.ranking" :key="index"
          ><span class="title">{{ item.uiElement.mainTitle.title }}<van-icon name="arrow"/></span>
          <div class="item" v-for="(items, indexs) in item.resources" :key="indexs" @click="play(item, indexs)">
            <div class="content">
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
                <span class="index">1</span>
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
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { rankingtitle, rankingbtn } from '@/hooks/reactive';
import { playaudiorule } from '@/Util/fltter.js';
import { inject, markRaw, ref, nextTick } from 'vue';
import { useStore } from 'vuex';
import { Toast } from 'vant';
import { show } from '@/hooks/status.js';
export default {
  setup(props, { attrs }) {
    const Dynamic = markRaw(inject('Dynamic'));
    const store = useStore();
    const list = ref([]);
    console.log(attrs.ranking);

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
      rankingtitle,
      rankingbtn,
      Dynamic,
      attrs,
      playaudiorule,
      store,
      play,
    };
  },
};
</script>

<style lang="less" scoped>
.Random {
  border-radius: 15px;
  padding: 3px;
  margin: 15px 0;
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
      text-align: center;
      color: #000;
      background: #fff;
      padding: 5px;
      box-sizing: border-box;
      border-radius: 15px;

      .title {
        font-size: 15px;
        font-weight: bold;
      }
      .item {
        margin: 5px 0;
        .content {
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
              .singer {
                color: #c4c4c4;
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
}
</style>
