<script>
import { getrecommendlist } from '@/api/songsheet.js';
import { playCount } from '@/Util/fltter.js';
import Songlist from './songlist.vue';
import { useRouter } from 'vue-router';
import { text, listtitle } from '@/hooks/reactive';
export default {
  name: 'recommendlist',
  components: { Songlist },
  setup(props, { attrs }) {
    return {
      text,
      listtitle,
      attrs,
    };
  },
};
</script>

<style lang="less" scoped>
.recommend {
  .btn {
    width: 50px;

  }
}
</style>

<template>
  <div class="recommend ">
    <h3>{{ listtitle }}</h3>
    <van-button type="primary" hairline class="btn" round size="mini">
      <template #icon> {{ text }}<van-icon name="arrow" /> </template>
    </van-button>
  </div>
  <Songlist :playlist="attrs.playlist" />
</template>
