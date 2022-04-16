<script>
import { computed, nextTick, watch } from 'vue';
import { useStore } from 'vuex';
import { install, Toast, Dialog } from 'vant';
import { playaudiorule } from '@/Util/fltter.js';
export default {
  name: 'playist',
  setup() {
    const store = useStore();
    const playlist = computed(() => {
      return store.state.songlist;
    });
    const playId = computed(() => {
      return store.state.songlist[store.state.curret].id;
    });
    const play = (index) => {
      if (store.state.songlist.length && store.state.audio.played && index === store.state.curret && show.value) {
        return;
      }

      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      if (store.state.audio.paused) {
        store.dispatch('setsetcurret', index);
        show.value = !show.value;
        nextTick(() => {
          store.state.audio.play();
          store.dispatch('setisplay');
          if (store.state.isplay && store.state.audio.readyState == 4) {
            Toast.clear({
              clearAll: true,
            });
          }
        });
      } else {
        nextTick(() => {
          store.dispatch('setisplay');
          store.state.audio.pause();
        });

        store.dispatch('setsetcurret', index);
        nextTick(() => {
          store.state.audio.play();
          if (store.state.audio.played) {
            store.dispatch('setisplay');
            Toast.clear({
              clearAll: true,
            });
          }
        });
      }
    };
    const deletes = () => {
      Dialog.confirm({
        message: '确定要清空播放列表吗？',
      })
        .then(() => {
          // on confirm
          store.dispatch('setsonglist', []);
        })
        .catch(() => {
          // on cancel
        });
    };
    const playstyle = computed(() => {
      if (store.state.playmodel === 0) {
        return '列表循环';
      } else if (store.state.playmodel === 1) {
        return '随机播放';
      } else if (store.state.playmodel === 2) {
        return '单曲循环';
      } else {
        return '心动模式';
      }
    });
    /*     watch(
      //监听接收过来的当前播放时间来给绑定进度条的值进行赋值
      () => playId.value,
      (n) => {
        (document.querySelector('.content').scrollTop, document.querySelector('.active').offsetTop);
        document.querySelector('.content').scrollTop = document.querySelector('.active').offsetTop - 150;
      },
    ); */
    const remove = (index) => {
      store.dispatch('setremove', index);
    };
    return {
      playlist,
      store,
      play,
      remove,
      playstyle,
      deletes,
      playId,
      playaudiorule,
    };
  },
};
</script>

<style lang="less" scoped>
.playlist {
  padding: 5px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  .title {
    .num {
      color: #bfbfbf;
      font-size: 12px;
    }
  }
  .icon {
    margin: 5px 0;
    width: 97%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .list {
      width: 30%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
  .content {
    height: 59vh;

    overflow-y: auto;
    .item {
      max-width: 97%;
      margin: 20px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemtitle {
        max-width: 90%;
        .songname {
          font-size: 13px;
          font-weight: 400;
          margin-left: 5px;
        }
        .singer {
        }
      }
    }
  }
  .active {
    color: red !important;
  }
}
</style>

<template>
  <div class="playlist">
    <h3 class="title">
      播放列表
      <span class="num">({{ playlist.length }}) </span>
    </h3>
    <div class="icon">
      <div class="model">
        <van-icon name="replay" size="15" color="#bfbfbf" v-if="store.state.playmodel === 0" />
        <van-icon name="circle" size="15" color="#bfbfbf" v-else-if="store.state.playmodel === 1" />
        <van-icon name="exchange" size="15" color="#bfbfbf" v-else-if="store.state.playmodel === 2" />
        <van-icon name="like-o" size="15" color="#bfbfbf" v-else />
        {{ playstyle }}
      </div>
      <div class="list">
        <van-icon name="down" size="20" color="#bfbfbf" /><van-icon name="add-o" color="#bfbfbf" size="20" /><van-icon
          name="delete-o"
          size="20"
          color="#bfbfbf"
          @click="deletes"
        />
      </div>
    </div>
    <div class="content">
      <div class="item " v-for="(item, index) in playlist" :key="index" @click="play(index)">
        <div class="van-ellipsis itemtitle" :class="{ active: store.state.curret === index }">
          <van-icon name="music-o" color="red" size="18" v-if="store.state.curret === index" />

          <span class="songname">{{ item.name }}</span
          >-
          <span class="singer" :class="{ active: store.state.curret === index }">{{ item.ar[0].name }}</span>
        </div>
        <van-icon name="cross" color="#bfbfbf" size="20" @click.stop="remove(index)" />
      </div>
    </div>
  </div>
</template>
