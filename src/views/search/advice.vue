<script>
export default {
  name: 'advice',
  setup(props, { attrs }) {
    return {
      attrs,
    };
  },
};
</script>

<style lang="less" scoped>
.advice {
}
</style>

<template>
  <div class="advice">
    <van-cell
      :title="item.keyword"
      icon="search"
      v-for="(item, index) in attrs.suggestlist"
      :key="index"
      @click="attrs.onSearch(item.keyword)"
    />
  </div>
</template>
