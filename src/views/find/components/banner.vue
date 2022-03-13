<template>
  <van-swipe class="my-swipe auto" :autoplay="2000" indicator-color="white">
    <van-swipe-item
      v-for="(item, index) in state.banners"
      :key="index"
      style="font-size:0"
    >
      <van-image
        width="100%"
        height="100%"
        radius="15"
        fit="cover"
        :src="item.pic"
      >
        <template v-slot:loading>
          <van-loading type="spinner" size="20" color="#000" />
        </template> </van-image
    ></van-swipe-item>
  </van-swipe>
</template>

<script>
import { getbanner } from "@/api/banner.js";
import { onMounted, reactive, markRaw } from "vue";
export default {
  setup() {
    const state = reactive({
      banners: [],
    });
    onMounted(async () => {
      const { data } = await getbanner({
        type: 2,
      });
      state.banners = markRaw(data.banners);
    });

    return {
      state,
    };
  },
};
</script>

<style lang="less" scoped>
.my-swipe {
  width: 100%;
  height: 150px;
  border-radius: 15px;
  & img {
    width: 100%;
    height: 100%;
  }
}
</style>
