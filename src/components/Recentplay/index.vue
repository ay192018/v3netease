<template>
  <div class="Recentplay">
    最近播放
    <div class="Recentlyitem" @click="pushDynamic(item)" v-for="(item, index) in attrs.list" :key="index">
      <div>
        <van-image width="50" height="50" fit="cover" radius="15" :src="item.song.al.picUrl" />
      </div>
      <van-cell :title="item.song.name" :label="item.song.ar[0].name" />
    </div>
  </div>
</template>

<script>
export default {
  setup(props, { attrs, emit }) {
    const pushDynamic = (item) => {
      emit('push', item);
      emit('close');
    };
    return {
      attrs,
      pushDynamic,
      emit,
    };
  },
};
</script>

<style lang="less" scoped>
.Recentplay {
  height: 84vh;
  overflow-y: auto;

  padding: 5px;
  .Recentlyitem {
    margin-top: 3px;
    display: flex;
    align-items: center;
  }
}
</style>
