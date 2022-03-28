<script>
import { getrecommendlist } from '@/api/songsheet.js';
import { playCount } from '@/Util/fltter.js';
import Songlist from './songlist.vue';
import { useRouter } from 'vue-router';
import { scenariotitle, scenariobtn } from '@/hooks/reactive';
export default {
  name: 'scenario',
  components: { Songlist },
  setup(props, { attrs }) {
    return {
      scenariotitle,
      scenariobtn,
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
  <div class="recommend auto">
    <h3>{{ scenariotitle }}</h3>
    <van-button type="primary" class="btn" hairline round size="mini">
      <template #icon> {{ scenariobtn }}<van-icon name="arrow" /> </template>
    </van-button>
  </div>
  <Songlist :playlist="attrs.playlist" />
</template>
