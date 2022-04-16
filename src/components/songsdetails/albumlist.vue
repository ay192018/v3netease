<template>
  <transition name="slide-fade">
    <div>
      <van-nav-bar :border="false" fixed @click-left="onClickLeft" title="专辑">
        <template #left>
          <van-icon name="arrow-left" size="23" color="#ccc" />
        </template>
        <template #right>
          <van-icon name="ellipsis" size="23" color="#ccc" />
        </template>
      </van-nav-bar>
      <div class="songdata" :style="`background-image: url(${songsdata.album.picUrl})`">
        <div class="content">
          <div class="left">
            <van-image width="130" height="130" radius="15" :src="songsdata.album.picUrl" @click="show = true">
              <template v-slot:loading>
                <van-loading type="spinner" size="20" color="#000" />
              </template>
            </van-image>
          </div>
          <div class="right info">
            <div class="titless" @click="show = true">
              {{ songsdata.album.name }}
            </div>
            <div class="userdata">
              <p class="username">歌手: {{ songsdata.artist.name }}</p>
            </div>
            <div class="describe van-ellipsis" @click="show = true">
              发行时间：{{ datalbum(songsdata.album.publishTime) }}
              <div>{{ songsdata.album.description }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div>
          <van-icon :name="songsdata.info.liked ? 'success' : 'add-o'" size="20" />
          <div>{{ playCount(songsdata.info.subscribedCount) }}</div>
        </div>
        <div @click="tocommnts">
          <van-icon name="chat-o" size="20" />
          <div>{{ playCount(songsdata.info.commentCount) }}</div>
        </div>
        <div>
          <van-icon name="share-o" size="20" />
          <div>{{ playCount(songsdata.info.shareCount) }}</div>
        </div>
      </div>

      <div class="title">
        <van-icon name="play-circle-o" size="20" color="red" />
        <div>播放全部</div>
        <div>({{ playCount(songlist.length) }}首)</div>
      </div>

      <div class="songlist">
        <div class="items" v-for="(item, index) in songlist" :key="index" @click="play(index)">
          <div class="left">
            <div class="index">{{ index + 1 }}</div>
            <!-- <van-image width="40" height="40" radius="15" :src="item.al.picUrl" /> -->
            <div class="data">
              <div class="songname van-ellipsis">{{ item.name }}</div>
              <div class="songtitle van-ellipsis">{{ item.ar[0].name }}</div>
            </div>
          </div>
          <div class="icons">
            <van-icon
              name="tv-o"
              size="20"
              class="tv"
              v-if="item.mv"
              @click.stop="
                router.push({
                  name: 'video',
                  params: {
                    id: item.mv,
                  },
                })
              "
            />
            <van-icon name="ellipsis" size="20" />
          </div>
        </div>
      </div>
      <van-overlay :show="show" @click="show = false" z-index="9999" :lock-scroll="false">
        <div class="wrapper">
          <div class="block">
            <div style="text-align: center">
              <van-image
                width="100vw"
                height="100vh"
                style="
                  filter: blur(40px);
                  left: 0;
                  position: absolute;
                  z-index: -1;
                "
                fit="cover"
                :src="songsdata.songs.coverImgUrl"
              />
              <van-image
                width="130"
                height="130"
                radius="15"
                style="margin-top: 80px; margin-bottom: 30px"
                :src="songsdata.album.picUrl"
              /><br />
              <span class="titless"> {{ songsdata.album.name }} </span><br />
              <div
                class="van-hairline--bottom"
                style="
                  width: 95vw;
                  margin: 0 auto;
                  margin-top: 30px;
                  margin-bottom: 20px;
                "
              ></div>
            </div>
            <div
              style="
                width: 95vw;
                height: auto;
                margin: 0 auto;
                margin-top: 50px;
                margin-bottom: 20px;
                color: #dfdfdf;
              "
            ></div>
            <p
              v-for="(item, index) in songsdata.descr"
              :key="index"
              style="color: #dfdfdf; margin-left: 10px"
              v-html="item.resource"
            ></p>
          </div>
        </div>
      </van-overlay>
    </div>
  </transition>
</template>

<script>
import Playall from './components/playall.vue';
import { getsongsdetail, getalbum, getalbumdetail } from '@/api/songsheet.js';

import { onMounted, reactive, ref, watchEffect, nextTick } from 'vue';
import { useStore } from 'vuex';
import { playCount, playaudiorule } from '@/Util/fltter.js';
import { datalbum } from '@/Util/dayjs.js';
import { useRouter, useRoute } from 'vue-router';

import { Toast } from 'vant';

export default {
  name: 'playlistid',
  components: { Playall },
  setup(props, { attrs }) {
    const songsdata = reactive({
      songs: {},
      album: {},
      artist: {},
      info: {},
      length: 0,
      descr: [],
    });
    const songlist = ref([]);
    const show = ref(false);
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const cookie = JSON.parse(localStorage.getItem('profile'));
    const tocommnts = async () => {
      store.dispatch('setflag', 6);

      router.push({
        name: 'comments',
        params: {
          id: attrs.id,
        },
      });
    };
    const play = (index) => {
      playaudiorule(index, songlist.value, store, show, nextTick, Toast);
    };
    const onClickLeft = () => {
      router.back();
    };
    const length = (length) => {
      songsdata.length = length;
    };
    onMounted(async () => {
      const { data } = await getsongsdetail({
        id: attrs.id,
        offset: 1,
      });

      const res = await getalbum({
        id: attrs.id,
      });

      songsdata.album = res.data.album;
      songsdata.artist = res.data.album.artist;
      songsdata.info = res.data.album.info;
      songlist.value = res.data.songs;

      try {
        songsdata.songs = data.playlist;
        songsdata.tags = data.playlist.tags;
        songsdata.description = data.playlist.description.split('\n');
      } catch (error) {
        Toast.fail('加载失败,歌曲也许太多了');
      }
    });
    watchEffect(async () => {
      const { data } = await getalbumdetail({
        id: attrs.id,
      });
      let arr = [];
      data.product.descr.forEach((item, index) => {
        if (item.resource !== '<br>') {
          arr.push(item);
        }
      });

      songsdata.descr = arr;
    });

    return {
      onClickLeft,
      songsdata,
      playCount,
      router,
      route,
      songlist,
      store,
      length,
      attrs,
      tocommnts,
      show,
      cookie,
      datalbum,
      play,
    };
  },
};
</script>

<style lang="less" scoped>
::v-deep(.van-nav-bar, .van-nav-bar__content, .van-nav-bar--fixed) {
  background: transparent;
}
::v-deep(.van-image__img) {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: -1;
}
.songdata {
  width: 100%;
  height: 33vh;
  background-size: cover;

  .content {
    width: 95vw;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .left,
    .right {
      position: relative;
      margin-top: 50px;
      z-index: 5;
    }
    .title {
      width: 100%;
      color: #dfdfdf;
      font-size: 14px;
    }
    .info {
      width: 200px;
      height: 130px;
      .userdata {
        display: flex;
        align-items: center;
        .username {
          color: #dfdfdf;
          margin-left: 5px;
          margin-right: 5px;
        }
      }
      .describe {
        color: #dfdfdf;
        width: 100%;
        position: absolute;
        bottom: 0;
      }
    }
  }
}
.item {
  width: 270px;
  height: 40px;
  background-color: #e8e8e8;
  border-radius: 25px;
  position: absolute;
  top: 30vh;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  justify-content: space-around;
  align-items: center;
  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & div {
      margin-left: 5px;
    }
  }
}
::v-deep(.van-nav-bar__title) {
  color: #dfdfdf;
  font-size: 12px;
}
.title {
  margin-top: 5vh;
  display: flex;
  align-items: center;
  & van-icon,
  div {
    font-size: 14px;
    color: #414142;
    font-weight: bold;
    margin-left: 5px;
  }
}
.titless {
  overflow-x: hidden;
  font-size: 13px;
  color: #f0f0f0;
}
.wrapper {
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 100vw;
  height: 100vh;
}
.label {
  margin-left: 5px;
}
.songlist {
  padding: 5px;
  height: auto;
  width: 100%;
  box-sizing: border-box;
  .items {
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
  .icons {
    .tv {
      margin-right: 15px;
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
</style>
