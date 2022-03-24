<script>
import Reuse from './components/reuse.vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
export default {
  name: 'follow',
  components: {
    Reuse,
  },
  setup() {
    const router = useRouter();
    const cookie = computed(() => {
      return JSON.parse(localStorage.getItem('cookie'));
    });
    return {
      cookie,
      router,
    };
  },
};
</script>

<style lang="less" scoped>
.follow {
  background: #fff;
  .bottom-button {
    width: 160px;
    height: 40px;
  }
}
</style>

<template>
  <div class="follow animate__fadeIn animate__animated">
    <van-nav-bar title="动态" :border="false" />
    <Reuse v-if="cookie" />
    <van-empty description="请登录" v-else>
      <van-button round type="danger" class="bottom-button" @click="router.push('/login')">登录</van-button>
    </van-empty>
  </div>
</template>
