<script>
import Layout from './views/layout/';
import Audio from '@/components/audio/';
import { nextTick, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useWindowSize } from '@vant/use';
import { Toast } from 'vant';
import { changeaudio, initaudio, debounce } from '@/Util/fltter.js';
import { useStore } from 'vuex';
import {watchEffect} from "@vue/runtime-core";
export default {
  components: { Audio, Layout },
  name: 'App',
  setup() {
    const route = useRoute();

    const store = useStore();
    const { width } = useWindowSize();
    const fail = () => {
      Toast.fail('请切换手机模式浏览！！！');
    };



    watch(
      () => width.value,
      (val) => {
        if (val > 500) {
          debounce(fail, 500);
        }
      },
      {
        immediate: true,
      },
    );
    watch(route, (val) => {
      if (store.state.isplay) {
        if ((val.path.at(1) === 'v' && val.path.at(5) === 'o') || val.path === '/login') {
          store.dispatch('setisplay', !store.state.isplay);
          store.state.audio.pause();
        }
      }

      switch (val.path) {
        case '/':
          nextTick(() => {
            changeaudio();
          });
          break;
        case '/login':
          break;

        case '/my':
          nextTick(() => {
            changeaudio();
          })
          break;
        case '/follow':
          changeaudio();

          break;
        case '/Videosquare':
          changeaudio();

          break;

        default:
          nextTick(() => {
            initaudio();
          });
      }
    });
    return {
      route,
      store,
      width,
    };
  },
};
</script>
<style lang="less" scoped>
.temp {
  bottom: 0;
}
</style>
<template>
  <router-view v-slot="{ Component }">
    <transition name="slide-fade">
      <keep-alive v-if="route.meta.keepAlive" :max="5" include="">
        <component class="child-view" :is="Component"> </component>
      </keep-alive>

      <component v-else class="child-view" :is="Component"> </component>
    </transition>
    <keep-alive v-if="route.path !== '/login'">
      <component is="Audio"> </component>
    </keep-alive>
  </router-view>
</template>
