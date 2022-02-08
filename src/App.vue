<template>
  <router-view v-slot="{ Component }">
    <transition name="slide-fade">
      <component class="child-view" :is="Component"> </component>
    </transition>

    <Audio v-if="route.path !== '/login'" ref="Audio" />
  </router-view>
</template>

<script>
import Layout from "./views/layout/";
import Audio from "@/components/audio/";
import { nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import { changeaudio, initaudio } from "@/Util/fltter.js";
import { useStore } from "vuex";
export default {
  components: { Audio, Layout },
  setup() {
    const route = useRoute();
    const store = useStore();
    watch(route, (val) => {
      if (store.state.isplay) {
        if (val.path.at(1) === "v" && val.path.at(5) === "o") {
          store.dispatch("setisplay", !store.state.isplay);
          store.state.audio.pause();
        }
      }

      switch (val.path) {
        case "/":
          nextTick(() => {
            changeaudio();
          });
          break;
        case "/login":
          break;
        case "/my":
          nextTick(() => {
            changeaudio();
          });

          break;
        case "/follow":
          changeaudio();

          break;
        case "/Videosquare":
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
    };
  },
};
</script>
<style lang="less" scoped>
.temp {
  bottom: 0;
}
</style>
