<script>
import { getuserdata, getfollow } from '@/api/user.js';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { reactive, onMounted, ref } from 'vue';
import Content from './components/content.vue';
import UserData from './components/userData.vue';
import { Toast } from 'vant';
import { filtterArea } from '@/Util/fltter.js';
export default {
  components: { Content, UserData },
  name: 'userid',
  setup(props, { attrs }) {
    const user = reactive({
      profile: {},
      level: null,
      createDays: 0,
      createTime: 0,
      listenSongs: 0,
      city: null,
      province: null,
    });
    const show = ref(false);
    const router = useRouter();
    const route = useRoute();
    const onClickLeft = () => {
      router.back();
    };
    const changeShow = () => {
      show.value = !show.value;
    };
    const store = useStore();

    onMounted(async () => {
      const { data } = await getuserdata({
        uid: attrs.id,
      });

      if (data.code === 200) {
        user.profile = data.profile;
        user.level = data.level;
        user.createDays = data.createDays;
        user.createTime = data.createTime;
        user.listenSongs = data.listenSongs;
        user.city = data.profile.city;
        user.province = data.profile.province;
      }
    });
    const usefollow = async () => {
      const { data } = await getfollow({
        id: attrs.id,
        t: user.profile.followed ? 2 : 1,
      });
      if (data.code === 200) {
        user.profile.followed = !user.profile.followed;

        user.profile.followed ? Toast.success('关注成功') : Toast.fail('取消关注成功');
      }
    };
    return {
      router,
      route,
      onClickLeft,
      user,
      attrs,
      store,
      show,
      changeShow,
      getfollow,
      usefollow,
      filtterArea,
    };
  },
};
</script>

<style lang="less" scoped>
.user {
  width: 100%;

  ::v-deep(.van-nav-bar) {
    background: transparent;
  }

  .userdata {
    position: relative;
    width: 95vw;
    height: auto;
    border-radius: 15px;

    margin: 0 auto;
    z-index: 1;
    border-radius: 15px;
    text-align: center;
    ::v-deep(.van-image) {
      position: absolute;
      top: -26%;
      left: 50%;
      transform: translate(-50%);
    }
    .name {
      margin: 20px 5px;
      vertical-align: middle;
    }
    .title {
      margin: 20px 10px;
      font-size: 12px;
      color: #bfbfbf;
    }
    .editor {
      margin: 10px auto;
      ::v-deep(.van-button) {
        margin-right: 10px;
        vertical-align: middle;
        border: 1px solid #bfbfbf;
      }
    }
  }
}
</style>

<template>
  <div class="user">
    <van-nav-bar :border="false" @click-left="onClickLeft" fixed>
      <template #left><van-icon name="arrow-left" size="25" color="#323233" /> </template>
    </van-nav-bar>
    <van-image width="100vw" height="42vh" :src="user.profile.backgroundUrl" />
    <div class="userdata">
      <van-image
        width="60"
        height="60"
        round
        fit="cover"
        class=" animate__animated animate__zoomInUp"
        :src="user.profile.avatarUrl"
      />
      <br />
      <span class="name" style="font-size: 16px; font-weight: bold; font-size: 16px">{{ user.profile.nickname }}</span
      ><van-icon class="name" name="vip-card-o" :color="user.profile.vipType === 0 ? '#c0c0c0' : 'red'" size="25"
        ><span style="font-size: 13px; vertical-align: top">
          {{ user.profile.vipType }}
        </span></van-icon
      ><br />
      <div style="margin-bottom:20px;">
        <van-button type="primary" color="#07c160" size="mini" round>{{ filtterArea(user.province) }}</van-button>
        <van-button type="primary" color="#07c160" size="mini" round>{{ filtterArea(user.city) }}</van-button>
      </div>
      <div>
        <span class="title">{{ user.profile.follows }} 关注</span>
        <span class="title">{{ user.profile.followeds }} 粉丝</span>
        <span class="title"> Lv.{{ user.level }}</span>
      </div>
      <div class="editor">
        <van-button
          v-if="attrs.id == store.state.profile.userId"
          type="primary"
          size="mini"
          round
          hairline
          @click="show = !show"
          >编辑资料</van-button
        >
        <div v-else>
          <van-button
            type="primary"
            :color="user.profile.followed ? '#07c160' : 'red'"
            size="mini"
            :icon="user.profile.followed ? '' : 'add-o'"
            round
            @click="usefollow"
            >{{ user.profile.followed ? user.profile.followTime : '关注' }}</van-button
          >
          <van-button type="primary" color="#323233" size="mini" round
            ><span style="padding:10px;">聊天</span></van-button
          >
        </div>

        <van-icon name="arrow-down" size="20" />
      </div>
    </div>
    <Content
      :user="{
        profile: user.profile,
        createDays: user.createDays,
        createTime: user.createTime,
        listenSongs: user.listenSongs,
        id: attrs.id,
      }"
    />
    <van-popup v-model:show="show" position="top" :style="{ height: '110%', width: '100%' }"
      ><UserData @changeShow="changeShow"
    /></van-popup>
  </div>
</template>
