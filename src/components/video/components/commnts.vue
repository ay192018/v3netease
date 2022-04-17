<script>
import { getvideocomment, getmvcomment } from '@/api/video.js';
import { sendcomment, sendcommentlike } from '@/api/commnts.js';
import { data } from '@/Util/dayjs.js';
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
import { playCount } from '@/Util/fltter.js';
export default {
  name: 'videoid',
  setup(props, { attrs }) {
    const loading = ref(false);
    const finished = ref(false);
    const message = ref('');
    const store = useStore();
    const shows = ref(false);
    const router = useRouter();
    const comments = reactive({
      comment: [],
      total: 0,
      offset: 1,
    });
    const sendcommit = async () => {
      if (!JSON.parse(localStorage.getItem('cookie'))) {
        return router.push('/login');
      }
      const { data } = await sendcomment({
        t: 1,
        type: attrs.attrs.attrs.length > 8 ? 5 : 1,
        id: attrs.attrs.attrs,
        content: message.value,
      });
      data;
      if (data.code === 200) {
        shows.value = !shows.value;
        message.value = '';
        comments.comment.unshift(data.comment);
        Toast('评论成功');
      } else {
        shows.value = !shows.value;
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
    const islike = async (item) => {
      if (!JSON.parse(localStorage.getItem('cookie'))) {
        return router.push('/login');
      }
      const { data } = await sendcommentlike({
        id: attrs.attrs.attrs,
        cid: item.commentId,
        t: item.liked ? 0 : 1,
        type: attrs.attrs.attrs.length > 8 ? 5 : 1,
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
      if (attrs.attrs.attrs.length > 8) {
        const { data } = await getvideocomment({
          limit: 10,
          id: attrs.attrs.attrs,
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
      } else {
        const { data } = await getmvcomment({
          limit: 10,
          id: attrs.attrs.attrs,
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
      }
    };
    return {
      loading,
      finished,
      message,
      store,
      shows,
      onLoad,
      comments,
      playCount,
      data,
      sendcommit,
      islike,
      router,
    };
  },
};
</script>

<style lang="less" scoped>
.commnts {
  width: 95vw;
  margin: 15px auto;
  position: relative;
  .title {
    font-size: 13px;
    color: #000;
  }
  .conaim {
    width: 95vw;
    height: 50vh;
    margin: 20px auto;
    position: fixed;
    left: 0;
    right: 0;
    overflow-y: auto;
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
  <div class="commnts">
    <div class="title">评论({{ comments.total }})</div>
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
                <van-icon size="25" :name="item.liked ? 'good-job' : 'good-job-o'" @click="islike(item)" />
              </div>
            </div>
            <div class="bottom" @click="show = !show">{{ item.content }}</div>
          </div>
          <div class="van-hairline--bottom"></div>
        </div>
      </van-list>
    </div>
    <van-popup v-model:show="shows" position="bottom" :style="{ height: '10%' }"
      ><van-cell-group inset>
        <van-field
          v-model="message"
          rows="1"
          autosize
          clickable
          hairline
          type="textarea"
          @click-right-icon="sendcommit"
          placeholder="听说爱评论的粉丝很多"
          ><template #right-icon>
            <van-button size="small" type="primary" round>评论</van-button>
          </template></van-field
        >
      </van-cell-group></van-popup
    >
    <div class="btn">
      <van-button type="primary" size="large" round @click="shows = !shows">听说爱评论的粉丝很多</van-button>
    </div>
  </div>
</template>
