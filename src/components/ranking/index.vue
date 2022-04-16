<template>
  <div class="ranking">ranking</div>
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import { ranking, top } from '@/api/qq/ranking.js';
export default {
  name: 'ranking',
  setup() {
    onMounted(async () => {
      const { data } = await ranking();
      const res = await top({
        id: 62,
      });
      data, res;
    });
  },
};
</script>

<style></style>
