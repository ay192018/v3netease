<script>
import { getsonglyric, getcheck } from '@/api/songsheet.js';
import { realFormatSecond, debounce, lyrics } from '@/Util/fltter.js';
import { nextTick, ref, watch, reactive, computed } from 'vue';
import { Toast, Notify } from 'vant';

import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { watchEffect } from '@vue/runtime-core';
export default {
  setup(props, { attrs, emit }) {
    const store = useStore();
    const value = ref(0);
    const lyric = reactive({
      value: null,
      key: [],
    });
    const router = useRouter();
    const playId = computed(() => {
      return store.state.songlist[store.state.curret].id;
    });
    const lyricsshow = ref(false);
    const tocommnts = () => {
      store.dispatch('setflag', 0);
      router.push({
        name: 'comments',
        params: {
          id: store.state.songlist[store.state.curret].id,
        },
      });
    };

    watch(
      () => playId,
      async (newval, oldval) => {
        const { data } = await getcheck({
          id: newval.value,
        });
        try {
        } catch (error) {}
      },
      { deep: true },
    );
    const changeshow = () => {
      //传递给父组件的弹出层状态
      emit('changeshow', !attrs.show);
    };

    watch(
      //监听接收过来的当前播放时间来给绑定进度条的值进行赋值
      () => attrs.currentTime,
      () => {
        value.value = Number(attrs.currentTime);
        if (document.querySelector('.actives')) {
          document.querySelector('.lyrics').scrollTop = document.querySelector('.actives').offsetTop - 150;
        }
      },
    );
    watch(
      /**
       * @param {Object} 监听id索引的变化来请求当前id的歌词进行数据抽离
       * @return {Promise} 数据
       */

      () => playId.value,
      async (val) => {
        const { data } = await getsonglyric({
          id: val,
        });

        const result = lyrics(data);

        lyric.value = result.result;
        lyric.key = result.key;
      },
      { immediate: true },
    );
    /**
     * @param {Number} 传入1||-1来决定上下首
     *
     */
    const switchsong = (index) => {
      if (store.state.songlist.length === store.state.curret + index) {
        Notify({
          background: '#7232dd',
          message: '没有下一首咯',
        });
        return;
      } else if (0 > store.state.curret + index) {
        Notify({
          background: '#7232dd',
          message: '没有上一首咯',
        });
        documenM;
        return;
      }
      store.dispatch('setsetcurret', store.state.curret + index);
      nextTick(() => {
        store.state.audio.play();
      });
    };
    const playstyle = () => {
      if (store.state.playmodel === 0) {
        store.dispatch('setplaymodel', 1);
        Notify({
          background: 'pink',
          message: '随机播放',
        });
      } else if (store.state.playmodel === 1) {
        store.dispatch('setplaymodel', 2);
        store.state.audio.loop = true;
        Notify({
          background: '#ff6700',
          message: '循环播放',
        });
      } else if (store.state.playmodel === 2) {
        store.state.audio.loop = false;
        store.dispatch('setplaymodel', 3);
        Notify({
          background: '#ff6700',
          message: '心动模式',
        });
      } else {
        store.dispatch('setplaymodel', 0);
        Notify({
          background: '#ff6700',
          message: '列表循环',
        });
      }
    };
    const onClickRight = () => {
      Toast('分享事件');
    };
    const modelvalue = (val) => {
      //拖动实时更新进度条的start
      // attrs.currentTime = val;
    };
    const onChange = (value) => {
      store.state.audio.currentTime = value;
    };

    return {
      playstyle,
      changeshow,
      onClickRight,
      attrs,
      store,
      value,
      onChange,
      router,
      attrs,
      realFormatSecond,
      switchsong,
      modelvalue,
      lyricsshow,
      lyric,
      debounce,
      tocommnts,
      emit,
      playId,
    };
  },
};
</script>

<style lang="less" scoped>
.info {
  width: 100vw;
  height: 100vh;
  position: relative;
  ::v-deep(.van-nav-bar__title, .van-ellipsis) {
    font-size: 12px;
    color: gray;
  }
  ::v-deep(.van-nav-bar, .van-nav-bar--fixed) {
    background: transparent;
  }
  .bgimg {
    filter: blur(15px);
    z-index: -99;
  }
  .rotateimg {
    position: absolute;
    left: 25%;
    top: 25%;

    animation-name: Rotate;
    animation-iteration-count: infinite;
    animation-play-state: paused;
    animation-timing-function: linear;
    animation-duration: 16s;
  }
  .lyrics {
    overflow-y: auto;
    text-align: center;
    position: fixed;
    left: 10%;

    top: 12%;
    width: 80vw;
    color: #ccc;
    height: 55vh;
    scroll-behavior: smooth;
    & {
      font-size: 15px;
    }
  }
  .actives {
    transform: rotateX(360deg);
    color: #ff6700;
    text-shadow: 2px 2px 4px #fbd0db;
    transition: all 1s;
    font-size: 18px;
    transition: all 0.5s;
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
  .components {
    width: 100vw;
    height: 35vh;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    li {
      display: flex;
      justify-content: space-around;
      align-content: center;
      width: 100%;
      height: 33.3%;
      text-align: center;

      ::v-deep(.van-badge__wrapper, .van-icon, .van-icon-down) {
        margin: auto 0;
      }
      ::v-deep(.van-slider) {
        width: 80vw;
        margin: 0 20px;
      }
      .time {
        margin: auto 0;
      }
    }
  }
}
</style>

<template>
  <div class="info">
    <van-nav-bar
      :border="false"
      :fixed="true"
      :title="`${store.state.songlist[store.state.curret].name}-${store.state.songlist[store.state.curret].ar[0].name}`"
      @click-left="changeshow"
      @click-right="onClickRight"
    >
      <template #left>
        <van-icon name="arrow-down" color="#323233" size="32" />
      </template>
      <template #right> <van-icon name="share-o" size="32" color="#323233" /> </template
    ></van-nav-bar>
    <van-image
      width="100vw"
      height="100vh"
      fit="cover"
      class="bgimg"
      :src="store.state.songlist[store.state.curret].al.picUrl"
    />
    <van-image
      width="200px"
      height="200px"
      round
      fit="cover"
      class="rotateimg"
      :class="store.state.isplay && store.state.audio.played && store.state.audio.readyState == 4 ? 'active' : ''"
      :src="store.state.songlist[store.state.curret].al.picUrl"
      v-show="!lyricsshow"
      @click="lyricsshow = !lyricsshow"
    >
      <template v-slot:loading> <van-loading type="spinner" size="20" color="#000" /> </template
    ></van-image>
    <div class="lyrics" v-show="lyricsshow" @click="lyricsshow = !lyricsshow">
      <p
        v-for="(item, index) in lyric.value"
        :key="index"
        :class="attrs.currentTime >= lyric.key[index] && attrs.currentTime < lyric.key[index + 1] ? 'actives' : ''"
      >
        {{ item[1] }}
      </p>
    </div>
    <ul class="components">
      <li>
        <van-icon name="like-o" size="32" color="rgb(50,50,51)" /><van-icon
          name="down"
          size="28"
          color="rgb(50,50,51)"
        /><van-icon name="chat-o" size="32" color="rgb(50,50,51)" @click="tocommnts" /><van-icon
          name="ellipsis"
          size="32"
          color="rgb(50,50,51)"
        />
      </li>
      <li>
        <div class="time">{{ realFormatSecond(attrs.currentTime) }}</div>
        <van-slider
          class="time"
          v-model="value"
          @change="onChange"
          button-size="12"
          :min="0"
          :max="attrs.duration"
          @update:model-value="modelvalue"
        />
        <div class="time">{{ realFormatSecond(attrs.duration) }}</div>
      </li>
      <li>
        <van-icon name="replay" size="28" color="rgb(50,50,51)" v-if="store.state.playmodel === 0" @click="playstyle" />
        <van-icon
          name="circle"
          size="32"
          color="rgb(50,50,51)"
          v-else-if="store.state.playmodel === 1"
          @click="playstyle"
        />
        <van-icon
          name="exchange"
          size="32"
          color="rgb(50,50,51)"
          v-else-if="store.state.playmodel === 2"
          @click="playstyle"
        />
        <van-icon name="like-o" size="32" color="rgb(50,50,51)" v-else @click="playstyle" />
        <van-icon name="arrow-left" size="32" color="rgb(50,50,51)" @click="switchsong(-1)" />
        <van-icon
          :name="store.state.isplay ? 'pause-circle-o' : 'play-circle-o'"
          size="52"
          color="rgb(50,50,51)"
          @click="attrs.play()"
        />
        <van-icon name="arrow" size="32" color="rgb(50,50,51)" @click="switchsong(1)" />
        <van-icon name="bars" size="32" color="rgb(50,50,51)" @click.stop="emit('playstate')" />
      </li>
    </ul>
  </div>
</template>
