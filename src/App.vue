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
export default {
  components: { Audio, Layout },
  setup() {
    const route = useRoute();

    watch(route, (val) => {
      console.log(val.path);
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

        default:
          nextTick(() => {
            initaudio();
          });
      }
    });
    return {
      route,
    };
  },
};
</script>
<style lang="less" scoped>
.temp {
  bottom: 0;
}
</style>
