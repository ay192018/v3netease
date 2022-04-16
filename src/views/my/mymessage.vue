<template>
  <div class="mymessage">
    <van-nav-bar title="我的消息" @click-left="onClickLeft">
      <template #left>
        <van-icon name="arrow-left" color="#b0b0b0" size="18" />
      </template>
    </van-nav-bar>
    <van-search v-model="value" placeholder="搜索用户" />
    <div class="icons">
      <div class="items">
        <van-icon name="friends" size="40" color="#e9445a" />
        <span>粉丝</span>
      </div>
      <div class="items">
        <van-icon name="comment" size="40" color="#71b3e2" />
        <span>评论</span>
      </div>
      <div class="items">
        <van-icon name="question" size="40" color="#e77357" />
        <span>@我</span>
      </div>
      <div class="items">
        <van-icon name="bell" size="40" color="#f4be49" />
        <span>通知</span>
      </div>
    </div>
    <div class="content">
      <van-swipe-cell v-for="(item, index) in list" :key="index">
        <template #right>
          <van-button square type="danger" text="删除" />
        </template>

        <div class="item">
          <div>
            <van-image round width="45" height="45" fit="cover" :src="item.fromUser.avatarUrl" />
          </div>
          <div class="data">
            <div class="name">{{ item.fromUser.nickname }}</div>
            <div class="label van-ellipsis">{{ JSON.parse(item.lastMsg).msg }}</div>
          </div>
          <div class="right">
            <div class="date">{{ Dynamiclists(item.lastMsgTime) }}</div>
            <div class="counts" v-if="item.newMsgCount">{{ item.newMsgCount }}</div>
          </div>
        </div>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import { getusermsg } from '@/api/user.js';
import { onMounted, ref } from 'vue';
import { Dynamiclists } from '@/Util/dayjs.js';
export default {
  setup() {
    const onClickLeft = () => history.back();
    const list = ref([]);
    const value = ref('');

    onMounted(async () => {
      const { data } = await getusermsg();
      if (data.code === 200) {
        list.value = data.msgs;
        data.msgs;
      }
    });

    return {
      onClickLeft,
      list,
      Dynamiclists,
      value,
    };
  },
};
</script>

<style lang="less" scoped>
.mymessage {
  .content {
    width: 100%;
    padding: 5px;
    height: 86vh;

    box-sizing: border-box;
    overflow-y: auto;
    .item {
      width: 100%;
      height: 50px;
      padding: 5px;
      box-sizing: border-box;
      display: flex;
      margin-top: 5px;
      .data {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 0 5px;
        width: 230px;
        .name {
          font-size: 14px;
          font-weight: bold;
        }
        .label {
          color: #b0b0b0;
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .date {
          color: #b0b0b0;
        }
        .counts {
          padding: 2px;
          width: 20px;
          background: red;
          text-align: center;
          color: #fff;
          border-radius: 15px;
          font-size: 10px;
          margin-left: 30px;
        }
      }
    }
  }
  .icons {
    display: flex;
    padding: 5px;
    justify-content: space-around;

    height: 60px;
    margin: 5px 0;
    text-align: center;
    .items {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      & span {
        font-size: 12px;
        color: #b0b0b0;
      }
    }
  }
}
</style>
