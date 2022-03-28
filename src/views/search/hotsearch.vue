<script>
export default {
  name: 'hotsearch',
  setup(propm, { attrs }) {
    return {
      attrs,
    };
  },
};
</script>

<style lang="less" scoped>
.hotsearch {
  width: 95vw;

  margin: 15px auto;
  border-radius: 15px;
  height: 55vh;
  .item {
    width: 40%;
    padding: 10px;
    float: left;
    .name {
      font-size: 13px;
    }
  }
  .active {
    font-weight: bold;
  }
  .actives {
    color: red;
  }
}
</style>

<template>
  <div class="hotsearch">
    <div class="item" v-for="(item, index) in attrs.hotsearch" :key="index" @click="attrs.onSearch(item.searchWord)">
      <span class="name" :class="{ active: index < 3 }"
        ><span :class="{ actives: index < 3 }">{{ index + 1 }}</span
        >&nbsp;{{ item.searchWord }}</span
      >
      <van-icon name="fire" color="red" size="10" v-if="index === 0" />
    </div>
  </div>
</template>
