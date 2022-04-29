<script>
import Info from './info.vue';
import { ref, watchEffect, nextTick } from 'vue';
import { useStore } from 'vuex';
import { Toast } from 'vant';
import Playlist from '../playlist/';
import { random } from '@/Util/fltter.js';
import { show } from '@/hooks/status.js';
export default {
  name: 'Audio',
  components: {
    Info,
    Playlist,
  },
  setup(props, { emit }) {
    const audio = ref(null);
    let currentTime = ref(0); //当前播放时间
    let duration = ref(0); //当前歌曲长度
    const store = useStore();
    const playlist = ref(false);
    const showPopup = () => {
      if (store.state.songlist.length) {
        show.value = true;
      }
    };
    const playstate = () => {
      playlist.value = !playlist.value;
    };
    /**
     * @param {Boolean} 接收布尔值改变父级弹出层状态
     */
    const changeshow = (val) => {
      show.value = val;
    };
    const canplay = () => {
      Toast.clear();
    };

    const play = () => {
      store.dispatch('setisplay');
      if (store.state.isplay && store.state.audio.readyState == 4) {
        store.state.audio.play();
      } else {
        store.state.audio.pause();
      }
    };
    const ended = () => {
      nextTick(() => {
        store.dispatch('setisplay');
        store.state.audio.pause();
      });
      if (store.state.songlist.length < store.state.curret + 2) {
        Toast.fail('没有下一首咯');
        return;
      }
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      if (store.state.playmodel === 0) {
        store.commit('setcurret', store.state.curret + 1);
      } else if (store.state.playmodel === 1) {

        store.commit('setcurret', random(0, store.state.songlist.length - 1));
      } else {
        store.commit('setcurret', store.state.curret);
      }
      nextTick(() => {
        store.state.audio.play();
        if (store.state.audio.played) {
          store.dispatch('setisplay');
          Toast.clear({
            clearAll: true,
          });
        }
      });
    };
    const playing = (e) => {
      if (store.state.isplay === false) {
        store.dispatch('setisplay');
      }
    };
    /** @waiting
     * @example 缓冲状态
     */
    const waiting = () => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
    };
    /**
     * @event {事件对象}
     */
    const loadedmetadata = (e) => {
      duration.value = e.target.duration;
    };

    const error = () => {
      if (store.state.songlist.length === 0) {
        return;
      }
      Toast.fail('此歌曲暂不能播放');
      store.dispatch('setisplay');
      nextTick(() => {
        store.state.audio.pause();
      });
      store.dispatch('setsetcurret', store.state.curret + 1);
      store.dispatch('setisplay');
      nextTick(() => {
        store.state.audio.play();
      });
    };
    watchEffect(() => {
      store.dispatch('setaudio', audio);
    });
    const onTimeupdate = (e) => {
      currentTime.value = e.target.currentTime.toFixed(2);
    };

    return {
      play,
      onTimeupdate,
      audio,
      useStore,
      ended,
      random,
      store,
      error,
      currentTime,
      show,
      showPopup,
      changeshow,
      playing,
      waiting,
      loadedmetadata,
      duration,
      playlist,
      canplay,
      playstate,
    };
  },
};
</script>

<style lang="less">
.audio {
  transition: bottom 0.8s;
  z-index: 100;
  border-radius: 15px;
  width: 100%;
  height: 6vh;
  background-color: #f6f7f8;
  position: fixed;
  left: 0;
  right: 0;

  .controls {
    display: flex;
    width: 95vw;
    margin: 0 auto;
    .left,
    .right {
      display: flex;
      align-items: center;
      .songname {
        margin-left: 10px;
        width: 190px;
      }
      & i {
        margin-left: 30px;
      }
    }
  }
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
  .rotateimg {
    animation-name: Rotate;
    animation-iteration-count: infinite;
    animation-play-state: paused;
    animation-timing-function: linear;
    animation-duration: 5s;
  }
  .active {
    animation-play-state: running;
  }
  @keyframes Rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>

<template>
  <div class="audio animate__animated animate__backInDown" @click="showPopup">
    <audio
      ref="audio"
      @timeupdate="onTimeupdate"
      @error="error"
      :src="
        useStore().state.songlist.length !== 0
          ? `https://music.163.com/song/media/outer/url?id=${store.state.songlist[store.state.curret].id}.mp3`
          : ''
      "
      @playing="playing"
      @ended="ended"
      @waiting="waiting"
      @loadedmetadata="loadedmetadata"
      @canplay="canplay"
    ></audio>
    <div class="controls">
      <div class="left">
        <van-image
          width="6vh"
          height="6vh"
          round
          fit="cover"
          class="rotateimg"
          :class="store.state.isplay && store.state.audio.played && store.state.audio.readyState === 4 ? 'active' : ''"
          :src="
            useStore().state.songlist.length !== 0
              ? useStore().state.songlist[useStore().state.curret].al.picUrl
              : 'http://p3.music.126.net/tBTNafgjNnTL1KlZMt7lVA==/18885211718935735.jpg'
          "
        >
          <template v-slot:loading> <van-loading type="spinner" size="10" color="#000" /> </template
        ></van-image>

        <span class="songname van-ellipsis"
          >{{
            useStore().state.songlist.length !== 0
              ? `${store.state.songlist[store.state.curret].name}-${
                  store.state.songlist[store.state.curret].ar[0].name
                }`
              : '网易云音乐'
          }}
        </span>
      </div>
      <div class="right">
        <van-icon
          :name="useStore().state.isplay ? 'pause-circle-o' : 'play-circle-o'"
          size="28"
          @click.stop="play"
        /><van-icon name="bars" size="28" @click.stop="playlist = !playlist" />
      </div>
    </div>
    <van-popup v-model:show="show" position="bottom" :style="{ height: '100%' }" teleport="body">
      <Info
        :show="show"
        @changeshow="changeshow"
        :currentTime="currentTime"
        :duration="duration"
        :play="play"
        v-model="currentTime"
        @playstate="playstate"
    /></van-popup>
    <van-popup
      v-model:show="playlist"
      position="bottom"
      :style="{ height: '70%', width: '95%', margin: '0 0 0 10px' }"
      teleport="body"
      round
    >
      <Playlist
    /></van-popup>
  </div>
</template>
