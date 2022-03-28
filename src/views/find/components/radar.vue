<script>
import Songlist from './songlist.vue';

import { radartitle, radarbtn } from '@/hooks/reactive';
export default {
  name: 'radar',
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
  padding: 5px;
  .btn {
    width: 50px;
  }
}
</style>

<template>
  <div class="recommend auto">
    <h3>{{ radartitle }}</h3>

    <van-button type="primary" class="btn" hairline round size="mini">
      <template #icon> {{ radarbtn }}<van-icon name="arrow" /> </template>
    </van-button>
  </div>
  <Songlist :playlist="attrs.playlist" />
</template>
