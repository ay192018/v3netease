<template>
  <div class="item">sadas</div>
</template>

<script>
import { getgroup } from "@/api/video.js";
import { onMounted } from "@vue/runtime-core";
export default {
  setup(props, { attrs }) {
    onMounted(async () => {
      const { data } = await getgroup({
        id: attrs.item,
      });
      console.log(data);
    });
  },
};
</script>

<style></style>
