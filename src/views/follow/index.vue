<script>
import Reuse from './components/reuse.vue';
export default {
  name: 'follow',
  components: {
    Reuse,
  },
};
</script>

<style lang="less" scoped>
.follow {
  background: #fff;
}
</style>

<template>
  <div class="follow animate__fadeIn animate__animated">
    <van-nav-bar title="动态" :border="false" />
    <Reuse />
  </div>
</template>
