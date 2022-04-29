<script>
import Playall from './components/playall.vue';
import { getsongsdetail, getsubscribe } from '@/api/songsheet.js';

import { onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { playCount } from '@/Util/fltter.js';
import { useRouter, useRoute } from 'vue-router';
import { Toast, Dialog } from 'vant';

export default {
  name: 'playlistid',
  components: { Playall },
  setup(props, { attrs }) {
    const songsdata = reactive({
      songs: {},
      creator: {},
      trackIds: [],
      length: 0,
      time: null,
      tags: [],
      description: '',
    });
    const show = ref(false);
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const title = ref(false);
    const cookie = JSON.parse(localStorage.getItem('profile'));
    const issubscrib = async () => {
      if (songsdata.songs.subscribed) {
        Dialog.confirm({
          confirmButtonText: '取消收藏',
          message: '确定要取消收藏该歌单吗?',
        })
          .then(async () => {
            const { data } = await getsubscribe({
              t: songsdata.songs.subscribed ? 2 : 1,
              id: songsdata.creator.userId,
            });
            songsdata.songs.subscribed = !songsdata.songs.subscribed;
            if (songsdata.songs.subscribed) {
              Toast('歌单已收藏');
            } else {
              Toast('取消收藏');
            }
          })
          .catch(() => {
            // on cancel
          });
      } else {
        const { data } = await getsubscribe({
          t: songsdata.songs.subscribed ? 2 : 1,
          id: songsdata.creator.userId,
        });

        songsdata.songs.subscribed = !songsdata.songs.subscribed;
        if (songsdata.songs.subscribed) {
          Toast('歌单已收藏');
        } else {
          Toast('取消收藏');
        }
      }
    };
    const scroll = (e) => {
      if (e.target.scrollTop > 80) {
        title.value = true;
      } else {
        title.value = false;
      }
    };
    const tocommnts = async () => {
      store.dispatch('setflag', 2);

      router.push({
        name: 'comments',
        params: {
          id: attrs.id,
        },
      });
    };

    const onClickLeft = () => {
      router.back();
    };
    const length = (length) => {
      songsdata.length = length;
    };
    onMounted(async () => {
      store.dispatch('setplaylistID', attrs.id);

      const { data } = await getsongsdetail({
        id: attrs.id,
        offset: 1,
      });

      try {
        songsdata.songs = data.playlist;

        songsdata.creator = data.playlist.creator;
        songsdata.trackIds = data.playlist.trackIds;
        songsdata.tags = data.playlist.tags;
        if (!data.playlist.description) {
          return;
        }
        songsdata.description = data.playlist.description.split('\n');
      } catch (error) {
        Toast.fail('加载失败,歌曲也许太多了');
      }
    });

    return {
      onClickLeft,
      songsdata,
      playCount,
      router,
      route,
      scroll,
      store,
      length,
      attrs,
      tocommnts,
      show,
      cookie,
      issubscrib,
      title,
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
  position: relative;
  .img {
    width: 100%;
    height: 100%;
    position: absolute;
    filter: blur(30px);
  }
  .Songcontent {
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
      .userdatas {
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
.params {
  width: 270px;
  height: 40px;
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
  padding: 10px;
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
.index {
  width: 100vw;
  height: 100vh;
  overflow: auto;
}
::v-deep(.van-nav-bar) {
  backdrop-filter: blur(30px);
}
</style>

<template>
  <transition name="slide-fade">
    <div class="index" @scroll="scroll">
      <van-nav-bar :border="false" fixed @click-left="onClickLeft" :title="title ? songsdata.songs.name : '歌单'">
        <template #left>
          <van-icon name="arrow-left" size="23" color="#ccc" />
        </template>
        <template #right>
          <van-icon name="ellipsis" size="23" color="#ccc" />
        </template>
      </van-nav-bar>
      <!-- :style="`background-image: url(${songsdata.songs.coverImgUrl})`" -->
      <div class="songdata">
        <img class="img" :src="songsdata.songs.coverImgUrl" alt="" />
        <div class="Songcontent">
          <div class="left">
            <van-image width="130" height="130" radius="15" :src="songsdata.songs.coverImgUrl" @click="show = true">
              <template v-slot:loading>
                <van-loading type="spinner" size="20" color="#000" />
              </template>
            </van-image>
            <span class="count">{{ playCount(songsdata.songs.playCount) }}</span>
          </div>
          <div class="right info">
            <div class="titless" @click="show = true">
              {{ songsdata.songs.name }}
            </div>
            <div class="userdatas">
              <van-image width="25" height="25" fit="cover" radius="50%" :src="songsdata.creator.avatarUrl">
                <template v-slot:loading> <van-loading type="spinner" size="10" color="#000" /> </template
              ></van-image>
              <p
                class="username"
                @click="
                  router.push({
                    name: 'user',
                    params: {
                      id: songsdata.creator.userId,
                    },
                  })
                "
              >
                {{ songsdata.creator.nickname }}
              </p>
              <van-button
                type="primary"
                color="red"
                size="mini"
                icon="add-o"
                round
                v-if="songsdata.creator.userId !== store.state.profile.userId"
                >关注</van-button
              >
            </div>
            <div class="describe van-ellipsis" @click="show = true">
              {{ songsdata.songs.description }}
            </div>
          </div>
        </div>
      </div>
      <div class="params">
        <div>
          <van-button
            type="primary"
            :disabled="songsdata.creator.userId === store.state.profile.userId ? true : false"
            size="mini"
          >
            <van-icon
              :name="
                songsdata.songs.subscribed || songsdata.creator.userId === store.state.profile.userId
                  ? 'success'
                  : 'add-o'
              "
              type="primary"
              @click="issubscrib"
              color="#323233"
              size="20"
          /></van-button>

          <div>{{ playCount(songsdata.songs.subscribedCount) }}</div>
        </div>
        <div @click="tocommnts">
          <van-icon name="chat-o" size="20" />
          <div>{{ playCount(songsdata.songs.commentCount) }}</div>
        </div>
        <div>
          <van-icon name="share-o" size="20" />
          <div>{{ playCount(songsdata.songs.shareCount) }}</div>
        </div>
      </div>
      <div class="title">
        <van-icon name="play-circle-o" size="28" color="red" />
        <div class="playallinfo">播放全部</div>
        <div>({{ playCount(songsdata.length) }}首)</div>
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
                :src="songsdata.songs.coverImgUrl"
              /><br />
              <span class="titless"> {{ songsdata.songs.name }} </span><br />
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
            >
              标签:
              <span class="label" v-for="(item, index) in songsdata.tags" :key="index">{{ item }}</span>
            </div>
            <p v-for="(item, index) in songsdata.description" :key="index" style="color: #dfdfdf; margin-left: 10px">
              {{ item }}
            </p>
          </div>
        </div>
      </van-overlay>
      <Playall :songsdata="songsdata" @length="length" />
    </div>
  </transition>
</template>
