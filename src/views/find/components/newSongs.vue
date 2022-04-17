<template>
  <div class="Random auto">
    <van-tabs v-model:active="active" animated shrink>
      <van-tab title="新歌">
        <div class="content">
          <van-swipe class="my-swipe" indicator-color="white" :show-indicators="false" :width="325" :loop="false">
            <van-swipe-item v-for="(item, index) in newsong" :key="index">
              <div class="item" v-for="(resource, indexs) in item.resources" :key="indexs" @click="play(resource)">
                <div class="left">
                  <div class="img">
                    <van-image
                      width="40"
                      height="40"
                      fit="cover"
                      radius="15"
                      :src="resource.resourceExtInfo.songData.album.picUrl"
                    />
                  </div>

                  <div class="songdata">
                    <div class="name van-ellipsis">
                      {{ resource.resourceExtInfo.songData.name }}
                      <span class="singer van-ellipsis">-{{ resource.resourceExtInfo.songData.artists[0].name }}</span>
                    </div>
                    <div class="singer">{{ resource.uiElement.subTitle.title }}</div>
                  </div>
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div></van-tab
      >
      <van-tab title="新碟">
        <div class="content">
          <van-swipe class="my-swipe" indicator-color="white" :show-indicators="false" :width="325" :loop="false">
            <van-swipe-item v-for="(item, index) in newdisc" :key="index">
              <div class="item" v-for="(resource, indexs) in item.resources" :key="indexs">
                <div class="left">
                  <div class="img">
                    <van-image
                      width="40"
                      height="40"
                      fit="cover"
                      radius="15"
                      :src="resource.uiElement.image.imageUrl"
                    />
                  </div>

                  <div class="songdata">
                    <div class="name van-ellipsis">
                      {{ resource.uiElement.mainTitle.title }}
                      <span class="singer van-ellipsis">-{{ resource.resourceExtInfo.artists[0].name }}</span>
                    </div>
                    <div class="singer">{{ resource.uiElement.subTitle.title }}</div>
                  </div>
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div></van-tab
      >
      <van-tab title="数字专辑">
        <div class="content">
          <van-swipe class="my-swipe" indicator-color="white" :show-indicators="false" :width="325" :loop="false">
            <van-swipe-item v-for="(item, index) in numalbum" :key="index">
              <div class="item" v-for="(resource, indexs) in item.resources" :key="indexs">
                <div class="left">
                  <div class="img">
                    <van-image
                      width="40"
                      height="40"
                      fit="cover"
                      radius="15"
                      :src="resource.uiElement.image.imageUrl"
                    />
                  </div>

                  <div class="songdata">
                    <div class="name van-ellipsis">
                      {{ resource.uiElement.mainTitle.title }}
                      <span class="singer van-ellipsis">-{{ resource.resourceExtInfo.artists[0].name }}</span>
                    </div>
                    <div class="singer">{{ resource.uiElement.subTitle.title }}</div>
                  </div>
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div></van-tab
      >
    </van-tabs>
    <div class="recommend ">
      <van-button type="primary" class="btn" hairline round size="mini">
        <template #icon> 更多<van-icon name="arrow" /> </template>
      </van-button>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchPostEffect, reactive, toRefs, nextTick } from 'vue';
import { playaudiorule, Songs } from '@/Util/fltter.js';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Toast } from 'vant';
import { show } from '@/hooks/status.js';

export default {
  setup(props, { attrs }) {
    const active = ref(0);
    const songs = reactive({
      newsong: [],
      newdisc: [],
      numalbum: [],
    });
    const store = useStore();
    const router = useRouter();
    const list = ref([]);
    watchPostEffect(() => {
      attrs.NewSongs.forEach((element) => {
        if (element.uiElement.mainTitle.title === '新歌') {
          songs.newsong.push(element);
        } else if (element.uiElement.mainTitle.title === '新碟') {
          songs.newdisc.push(element);
        } else {
          songs.numalbum.push(element);
        }
      });
    });
    const play = (items) => {
      let i = null;
      songs.newsong
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
      active,
      ...toRefs(songs),
      play,
      router,
    };
  },
};
</script>

<style lang="less" scoped>
.Random {
  position: relative;
  .recommend {
    position: absolute;
    top: 5px;
    right: 3px;
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
