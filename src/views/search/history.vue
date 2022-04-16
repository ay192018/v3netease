<script>
import { computed } from 'vue';
import { Dialog } from 'vant';
export default {
  name: 'history',
  setup(props, { attrs, emit }) {
    const historylist = computed(() => {
      return JSON.parse(localStorage.getItem('historylist'));
    });
    const reset = () => {
      Dialog.confirm({
        message: '确定要清空历史内容吗',
      })
        .then(() => {
          emit('reset');
          localStorage.removeItem('historylist');
        })
        .catch(() => {
          // on cancel
        });
    };

    return {
      attrs,
      historylist,
      reset,
    };
  },
};
</script>

<style lang="less" scoped>
.history {
  display: flex;
  justify-content: space-around;
  height: 5vh;
  align-items: center;
  .left,
  .item {
    font-size: 13px;
  }
  .content {
    width: 75vw;
    height: 100%;
    display: flex;
    align-items: center;
    overflow-x: auto;
    .item {
      border-radius: 15px;
      margin-left: 5px;
      width: auto;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      .style {
        padding: 5px;
        border: 1px solid #000;
        border-radius: 8px;
        margin-top: 5px;
      }
    }
  }
}
</style>

<template>
  <div class="history" v-if="historylist">
    <div class="left">历史</div>
    <div class="content">
      <div class="item" v-for="(item, index) in historylist" :key="index" @click="attrs.onSearch(item)">
        <span class="style"> {{ item }}</span>
      </div>
    </div>
    <van-icon name="delete-o" size="20" @click="reset" />
  </div>
</template>
