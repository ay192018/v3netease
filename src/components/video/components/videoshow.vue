<template>
  <van-popup v-model:show="videoshow" position="top" :style="{ height: '100%' }" teleport="body" />
  <Index />
  <van-popup />
</template>

<script>
import Index from '../index.vue';
import { videoshow } from '@/hooks/status.js';
export default {
  name: 'videoid',
  components: { Index },
  setup() {
    return {
      videoshow,
    };
  },
};
</script>

<style></style>
