<script>
import { getrecommendlist } from '@/api/songsheet.js';
import { playCount } from '@/Util/fltter.js';
import Songlist from './songlist.vue';
import { useRouter } from 'vue-router';
import { text, listtitle } from '@/hooks/reactive';
export default {
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
    <h3>{{ listtitle }}</h3>
    <van-button type="primary" color="red" class="btn" round size="mini">{{ text }}</van-button>
  </div>
  <Songlist :playlist="attrs.playlist" />
</template>
