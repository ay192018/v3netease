<template>
  <div class="animate__fadeIn animate__animated">
    <Search />
    <div class="findconent">
      <Banner /><Findicon /><Recommend /><Recommendlist />
    </div>
  </div>
</template>

<script>
import Recommendlist from "./components/recommendlist.vue";
import Search from "./components/search.vue";
import Banner from "./components/banner.vue";
import Findicon from "./components/Findicon.vue";
import Recommend from "./components/recommend.vue";

export default {
  components: { Search, Banner, Findicon, Recommend, Recommendlist },
};
</script>

<style lang="less" scoped>
.findconent {
  scroll-behavior: hidden;
  width: 95vw;
  margin: 0 auto;
  overflow-y: auto;
  margin-top: 46px;
  height: 85.5vh;
}
</style>
