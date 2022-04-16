<script>
import { getvideogroup, getvideocategory } from '@/api/video.js';
import { onMounted } from '@vue/runtime-core';
import Item from './item.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  components: { Item },
  name: 'videoindex',
  setup() {
    const tab = ref([]);
    const active = ref(0);
    const router = useRouter();
    const cookie = ref(JSON.parse(window.localStorage.getItem('cookie')));
    onMounted(async () => {
      const { data } = await getvideogroup();
      const res = await getvideocategory();

      tab.value = data.data;
      // (tab.value, res);
    });

    return {
      tab,
      active,
      router,
      cookie,
    };
  },
};
</script>

<style lang="less" scoped>
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>

<template>
  <div class="Videosquare  animate__fadeIn animate__animated">
    <van-nav-bar title="视频广场" :border="false"> </van-nav-bar>
    <van-tabs v-model:active="active" animated>
      <van-tab
        v-for="(item, index) in tab"
        :key="index"
        :title="item.name"
        :disabled="item.name === 'MV' ? true : false"
      >
        <Item :item="item.id" />
      </van-tab>
    </van-tabs>
  </div>
  <!--   <van-empty image="network" description="请登录" v-else>
    <van-button
      round
      type="danger"
      class="bottom-button"
      @click="router.push('/login')"
      >登录</van-button
    >
  </van-empty> -->
</template>
