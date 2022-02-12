<template>
  <div class="user">
    <van-nav-bar :border="false" @click-left="onClickLeft" fixed>
      <template #left
        ><van-icon name="arrow-left" size="25" color="#323233" />
      </template>
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
      <span
        class="name"
        style="font-size: 16px; font-weight: bold; font-size: 16px"
        >{{ user.profile.nickname }}</span
      ><van-icon
        class="name"
        name="vip-card-o"
        :color="user.profile.vipType === 0 ? '#c0c0c0' : 'red'"
        size="25"
        ><span style="font-size: 13px; vertical-align: top">
          {{ user.profile.vipType }}
        </span></van-icon
      ><br />

      <div>
        <span class="title">{{ user.profile.followeds }} 关注</span>
        <span class="title">{{ user.profile.follows }} 粉丝</span>
        <span class="title">{{ user.level }} Lv</span>
      </div>
      <div class="editor">
        <van-button
          v-if="attrs.id == store.state.profile.userId"
          type="primary"
          size="mini"
          round
          hairline
          color="#ccc"
          >编辑资料</van-button
        >
        <div v-else>
          <van-button type="primary" color="red" size="mini" icon="add-o" round
            >关注</van-button
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
  </div>
</template>

<script>
import { getuserdata } from "@/api/user.js";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { reactive, onMounted } from "vue";
import Content from "./components/content.vue";
export default {
  components: { Content },
  setup(props, { attrs }) {
    const user = reactive({
      profile: {},
      level: null,
      createDays: 0,
      createTime: 0,
      listenSongs: 0,
    });

    const router = useRouter();
    const route = useRoute();
    const onClickLeft = () => {
      router.back();
    };

    const store = useStore();
    console.log(attrs.id == store.state.profile.userId);
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
      }
    });
    return {
      router,
      route,
      onClickLeft,
      user,
      attrs,
      store,
    };
  },
};
</script>

<style lang="less" scoped>
.user {
  width: 100%;
  background: #f0f0f0;
  ::v-deep(.van-nav-bar) {
    background: transparent;
  }

  .userdata {
    position: relative;
    width: 95vw;
    height: auto;
    border-radius: 15px;
    background: #fefefe;
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
