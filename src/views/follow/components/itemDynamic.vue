<template>
  <div class="dynamic">
    <van-nav-bar :border="false" @click-left="emit('changeshow')">
      <template #left>
        <van-icon name="arrow-left" color="#233233" size="25" />
      </template>
      <template #title>
        <van-image width="30" height="30" fit="cover" round class="img" :src="attrs.item.user.avatarUrl" />{{
          attrs.item.user.nickname
        }}
      </template>
    </van-nav-bar>
    <div class="center">
      <Item :item="attrs.item" />
      <van-tabs v-model:active="active" animated>
        <van-tab>
          <template #title>
            <div>评论 {{ attrs.item.info.commentCount }}</div>
          </template>
          <div class="itemCenter">
            <div class="title">最新评论 {{ attrs.item.info.commentCount }}</div>
            <div class="itemComments" v-for="(item, index) in comments" :key="index">
              <div>
                <van-image width="30px" height="30px" round fit="cover" :src="item.user.avatarUrl">
                  <template v-slot:loading> <van-loading type="spinner" size="10" color="#000" /> </template
                ></van-image>
              </div>
              <div class="content">
                <div class="top">
                  <div class="left">
                    <div class="name">
                      {{ item.user.nickname }}
                    </div>
                    <div class="time">{{ data(item.time) }}</div>
                  </div>
                  <div class="right">
                    {{ playCount(item.likedCount) }}
                    <van-icon :name="item.liked ? 'good-job' : 'good-job-o'" size="25" @click="islike(item)" />
                  </div>
                </div>
                <div class="bottom" @click="ahplay(item.user.nickname)">
                  {{ item.content }}
                </div>
              </div>
              <div class="van-hairline--bottom"></div>
            </div></div
        ></van-tab>

        <van-tab title="转发">
          <template #title>
            <div>转发 {{ attrs.item.info.shareCount }}</div>
          </template>
        </van-tab>
        <van-tab title="赞">
          <template #title>
            <div>赞 {{ attrs.item.info.likedCount }}</div>
          </template>
        </van-tab>
      </van-tabs>
    </div>
    <div class="commit">
      <div class="info">
        <van-button
          type="primary"
          size="mini"
          round
          text="发表评论"
          color="#b0b0b0"
          class="btn"
          @click="openpl"
        ></van-button
        ><van-icon name="good-job-o" size="25" />
        <van-icon name="revoke" size="25" />
      </div>
      <div class="viod"></div>
    </div>
    <van-popup v-model:show="changeplshow" position="bottom" :style="{ height: '8%' }"
      ><van-cell-group inset clickable autofocus>
        <van-field v-model="value" :placeholder="placeholder">
          <template #button>
            <van-button size="small" type="primary" round @click="send">发 送</van-button>
          </template></van-field
        >
      </van-cell-group></van-popup
    >
  </div>
</template>

<script>
import { data } from '@/Util/dayjs.js';
import { playCount } from '@/Util/fltter.js';
import Item from './item.vue';
import { ref, watchEffect } from 'vue';
import { getusercommit } from '@/api/user.js';
import { sendcomment } from '@/api/commnts.js';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
export default {
  components: { Item },
  name: 'itemDynamic',
  setup(props, { emit, attrs }) {
    const comments = ref([]);
    const active = ref(0);
    const placeholder = ref('发表评论~');
    const changeplshow = ref(false);
    const value = ref('');
    const router = useRouter();

    watchEffect(async () => {
      const { data } = await getusercommit({
        threadId: attrs.item.info.threadId,
      });
      comments.value = data.comments;
    });
    const ahplay = (name) => {
      changeplshow.value = !changeplshow.value;
      placeholder.value = `回复:${name}`;
    };
    const openpl = () => {
      changeplshow.value = !changeplshow.value;
      placeholder.value = `发表评论~`;
    };
    const send = async () => {
      if (!JSON.parse(localStorage.getItem('cookie'))) {
        return router.push('/login');
      }
      if (value.value === '') return Toast('不能为空！');
      const { data } = await sendcomment({
        t: 1,
        type: 6,
        threadId: attrs.item.info.threadId,
        content: value.value,
      });

      if (data.code === 200) {
        Toast.success('评论成功');
        value.value = '';
        changeplshow.value = !changeplshow.value;
        comments.value.unshift(data.comment);
      } else {
        Toast.fail('评论失败');
      }
    };
    return {
      emit,
      attrs,
      active,
      comments,
      data,
      playCount,
      changeplshow,
      value,
      send,
      sendcomment,
      ahplay,
      placeholder,
      openpl,
    };
  },
};
</script>

<style lang="less" scoped>
.dynamic {
  position: relative;
  .center {
    padding: 10px;
    position: fixed;
    left: 0;
    right: 0;
    top: 50px;
    overflow-y: auto;
    height: 80vh;

    .itemCenter {
      padding: 5px;
      width: 100;
      margin-bottom: 500px;
      .itemComments {
        margin: 5px 0;
        display: flex;
        .content {
          margin-left: 8px;
          width: 95vw-10px;
          .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .name {
              padding-bottom: 5px;
              font-size: 13px;
            }
            .time {
              font-size: 10px;
              color: #dedede;
            }
          }
          .bottom {
            margin: 8px 0;
          }
        }
      }
    }
  }
  .img {
    vertical-align: middle;
    margin-right: 5px;
  }
  .commit {
    position: fixed;
    width: 100%;
    height: 10vh;
    left: 0;
    right: 0;
    bottom: 0;

    .info {
      height: 80%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .btn {
        width: 70vw;
      }
    }
    .viod {
      height: auto;
      width: 100%;
    }
  }
}
</style>
