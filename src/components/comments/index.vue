<script>
import { comment, sendcomment, sendcommentlike } from '@/api/commnts.js';
import { data } from '@/Util/dayjs.js';
import { Toast, Dialog } from 'vant';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { reactive } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { playCount } from '@/Util/fltter.js';

export default {
  name: 'commentsid',
  setup(props, { attrs }) {
    const placeholder = ref('听说爱评论的粉丝很多~');
    const router = useRouter();
    const loading = ref(false);
    const finished = ref(false);
    const message = ref('');
    const store = useStore();
    const show = ref(false);

    const comments = reactive({
      comment: [],
      total: 0,
      offset: 1,
    });

    const onClickLeft = () => {
      router.back();
    };
    const ahplay = (item) => {
      show.value = !show.value;
      placeholder.value = `回复:${item}`;
    };
    const commentdata = () => {
      show.value = !show.value;
      placeholder.value = `说点好听的把~`;
    };
    const sendcommit = async () => {
      if (!JSON.parse(localStorage.getItem('cookie'))) {
        return router.push('/login');
      }
      const { data } = await sendcomment({
        t: 1,
        type: store.state.flag,
        id: attrs.id,
        content: message.value,
      });

      if (data.code === 200) {
        show.value = !show.value;
        message.value = '';
        comments.comment.unshift(data.comment);
        Toast('评论成功');
      } else {
        show.value = !show.value;
        message.value = '';
        Dialog.alert({
          title: data.data.dialog.title,
          message: data.data.dialog.subtitle,
          confirmButtonText: data.data.dialog.buttonMsg,
        }).then(() => {
          window.location = data.data.dialog.buttonUrl;
        });
      }
    };
    const onClickright = () => {
      Toast('分享事件');
    };
    const islike = async (item) => {
      if (!JSON.parse(localStorage.getItem('cookie'))) {
        return router.push('/login');
      }
      const { data } = await sendcommentlike({
        id: item.user.userId,
        cid: attrs.id,
        t: item.liked ? 0 : 1,
        type: store.state.flag,
      });
      if (!item.liked) {
        item.liked = !item.liked;
        item.likedCount++;
      } else {
        item.liked = !item.liked;
        item.likedCount--;
      }
    };
    const onLoad = async () => {
      const { data } = await comment({
        limit: 10,
        id: attrs.id,
        offset: (comments.offset - 1) * 20,
      });

      comments.total = data.total;
      comments.comment.push(...data.comments);

      loading.value = false;

      if (data.comments.length) {
        comments.offset++;
      } else {
        finished.value = true;
      }
    };
    return {
      comments,
      onClickLeft,
      onClickright,
      data,
      onLoad,
      loading,
      finished,
      playCount,
      show,
      store,
      message,
      sendcommit,
      islike,
      ahplay,
      placeholder,
      commentdata,
      router,
    };
  },
};
</script>

<style lang="less" scoped>
.comments {
  overflow-y: auto;
  width: 100vw;
  height: 100vh;
  z-index: 3000;
  position: absolute;
  .fiexd {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 3000;
  }
  ::v-deep(.van-nav-bar__title) {
    color: #000;
    font-size: 13px;
  }

  .title,
  .item {
    padding: 10px 0;
    width: 95vw;
    margin: 0 auto;
  }
  .conaim {
    width: 95vw;
    height: auto;
    margin: 100px auto 0;

    padding-bottom: 50px;
    .item {
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
  .btn {
    width: 100%;
    height: 8%;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
}
</style>

<template>
  <div class="comments">
    <div class="fiexd">
      <van-nav-bar :title="`评论(${comments.total})`" @click-left="onClickLeft" :border="false">
        <template #left>
          <van-icon name="arrow-left" color="#ccc" size="25" />
        </template>
        <template #right>
          <van-icon name="share-o" color="#ccc" size="25" @click="onClickright" />
        </template>
      </van-nav-bar>

      <div class="void"></div>
      <div class="title">评论区</div>
    </div>
    <div class="conaim">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="item" v-for="(item, index) in comments.comment" :key="index">
          <van-image width="30px" height="30px" round fit="cover" :src="item.user.avatarUrl">
            <template v-slot:loading> <van-loading type="spinner" size="10" color="#000" /> </template
          ></van-image>
          <div class="content">
            <div class="top">
              <div class="left">
                <div
                  class="name"
                  @click="
                    router.push({
                      name: 'user',
                      params: {
                        id: item.user.userId,
                      },
                    })
                  "
                >
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
        </div>
      </van-list>
    </div>
    <van-popup v-model:show="show" position="bottom" :style="{ height: '10%' }"
      ><van-cell-group inset>
        <van-field
          v-model="message"
          rows="1"
          autosize
          clickable
          type="textarea"
          @click-right-icon="sendcommit"
          :placeholder="placeholder"
          ><template #right-icon>
            <van-button size="small" type="primary" hairline round>评论</van-button>
          </template></van-field
        >
      </van-cell-group></van-popup
    >
    <div class="btn">
      <van-button type="primary" size="large" hairline round @click="commentdata">听说爱评论的粉丝很多</van-button>
    </div>
  </div>
</template>
