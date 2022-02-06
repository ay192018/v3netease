<template>
  <div class="Videosquare follow animate__fadeIn animate__animated">
    <van-nav-bar
      title="视频广场"
      left-arrow
      @click-left="onClickLeft"
      :border="false"
    >
      <template #left
        ><van-icon name="arrow-left" size="24" color="#323233" />
      </template>
    </van-nav-bar>
    <van-tabs v-model:active="active" animated>
      <van-tab v-for="(item, index) in tab" :key="index" :title="item.name">
        <Item :item="item.id" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getvideogroup, getvideocategory } from "@/api/video.js";
import { onMounted } from "@vue/runtime-core";
import Item from "./item.vue";
import { ref } from "vue";
export default {
  components: { Item },
  setup() {
    const tab = ref([]);
    onMounted(async () => {
      const { data } = await getvideogroup();
      const res = await getvideocategory();

      tab.value = data.data;
      console.log(tab.value, res);
    });
    const onClickLeft = () => history.back();
    return {
      onClickLeft,
      tab,
    };
  },
};
</script>

<style></style>
