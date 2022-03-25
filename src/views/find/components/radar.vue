<script>
import Songlist from './songlist.vue';

import { radartitle, radarbtn } from '@/hooks/reactive';
export default {
  components: { Songlist },
  setup(props, { attrs }) {
    return {
      radartitle,
      radarbtn,
      attrs,
    };
  },
};
</script>

<style lang="less" scoped>
.recommend {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btn {
    width: 50px;
  }
}
</style>

<template>
  <div class="recommend auto">
    <h3>{{ radartitle }}</h3>
    <van-button type="primary" color="red" class="btn" round size="mini">{{ radarbtn }}</van-button>
  </div>
  <Songlist :playlist="attrs.playlist" />
</template>
