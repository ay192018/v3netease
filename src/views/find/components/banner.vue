<script>
export default {
  setup(props, { attrs }) {
    console.log(attrs.banner);
    return {
      attrs,
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

<template>
  <van-swipe class="my-swipe auto" :autoplay="2000" indicator-color="white">
    <van-swipe-item v-for="(item, index) in attrs.banner" :key="index" style="font-size:0">
      <van-image width="100%" height="100%" radius="15" fit="cover" :src="item.pic">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" color="#000" />
        </template> </van-image
    ></van-swipe-item>
  </van-swipe>
</template>
