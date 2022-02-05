<template>
  <div class="my animate__fadeIn animate__animated">
    <van-nav-bar :border="false" fixed>
      <template #left>
        <van-icon name="bars" size="25" color="#646566" />
      </template>
      <template #right>
        <van-icon
          name="search"
          size="25"
          color="#646566"
          @click="router.push('/search')"
        />
      </template>
    </van-nav-bar>
    <div class="userdata">
      <van-image
        width="60"
        height="60"
        round
        fit="cover"
        class="img animate__animated animate__zoomInUp"
        @click="!cookie ? router.push('/login') : retrun"
        :src="
          cookie
            ? users.avatarUrl
            : 'http://p3.music.126.net/tBTNafgjNnTL1KlZMt7lVA==/18885211718935735.jpg'
        "
      />
      <br />
      <span
        class="name"
        style="font-size: 16px; font-weight: bold; font-size: 16px"
        :class="!cookie ? 'temp' : ''"
        >{{ cookie ? users.nickname : "立即登录" }}</span
      ><van-icon
        class="name"
        name="vip-card-o"
        v-if="cookie"
        :color="users.vipType === 0 ? '#c0c0c0' : 'red'"
        size="25"
        ><span style="font-size: 13px; vertical-align: top">
          {{ users.vipType }}
        </span></van-icon
      ><br />

      <div v-if="cookie">
        <span class="title">{{ user.profile.followeds }} 关注</span>
        <span class="title">{{ user.profile.follows }} 粉丝</span>
        <span class="title">{{ user.level }} Lv</span>
      </div>
    </div>

    <Grid />
    <Userplaylist />
  </div>
</template>

<script>
import Grid from "./grid.vue";
import { useStore } from "vuex";

import { getuserdata } from "@/api/user.js";
import { onMounted } from "@vue/runtime-core";
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import Userplaylist from "./Userplaylist.vue";
export default {
  components: {
    Grid,
    Userplaylist,
  },
  setup() {
    const store = useStore();

    const router = useRouter();
    const user = reactive({
      profile: {},
      level: null,
    });
    const cookie = computed(() => {
      return JSON.parse(localStorage.getItem("cookie"));
    });
    const users = computed(() => {
      return JSON.parse(localStorage.getItem("profile"));
    });
    onMounted(async () => {
      const { data } = await getuserdata({
        uid: store.state.profile.userId,
      });
      if (data.code === 200) {
        user.profile = data.profile;
        user.level = data.level;

        store.dispatch("setprofile", data.profile);
        // console.log(data);
      }
    });
    return {
      cookie,
      store,
      user,
      router,
      users,
    };
  },
};
</script>

<style lang="less" scped>
.my {
  width: 100%;
  height: 87vh;
  background: #f0f0f0;

  .userdata {
    position: relative;
    width: 95vw;
    height: 15vh;
    border-radius: 15px;
    background: #fefefe;
    margin: 50px auto 0 auto;
    z-index: 1;
    border-radius: 15px;
    text-align: center;
    .img {
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
  }
  /deep/.van-cell,
  .van-cell--borderless {
    background: #f0f0f0 !important;
  }
  .temp {
    position: absolute;
    left: 40%;
  }
}
/deep/ .van-nav-bar__content {
  background: #f0f0f0 !important;
}
</style>
