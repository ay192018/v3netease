<template>
  <div class="my animate__fadeIn animate__animated">
    <van-nav-bar :border="false" fixed>
      <template #left>
        <van-icon name="bars" size="32" color="#646566" @click="sideShow = !sideShow" />
      </template>
      <template #right>
        <van-icon name="search" size="32" color="#646566" @click="router.push('/search')" />
      </template>
    </van-nav-bar>
    <van-pull-refresh loosing-text=" " loading-text=" " @refresh="onRefresh">
      <div class="userdata">
        <van-image
          width="60"
          height="60"
          round
          fit="cover"
          class="img animate__animated animate__zoomInUp"
          @click="!cookie ? router.push('/login') : (show = true)"
          :src="cookie ? users.avatarUrl : 'http://p3.music.126.net/tBTNafgjNnTL1KlZMt7lVA==/18885211718935735.jpg'"
        />
        <br />
        <span class="name" style="font-size: 16px; font-weight: bold; font-size: 16px" :class="!cookie ? 'temp' : ''">{{
          cookie ? users.nickname : '立即登录'
        }}</span
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
          <span class="title">{{ user.profile.follows }} 关注</span>
          <span class="title">{{ user.profile.followeds }} 粉丝</span>
          <span class="title">Lv. {{ user.level }} </span>
        </div>
      </div>

      <Grid />
      <Userplaylist />
    </van-pull-refresh>
    <van-action-sheet
      v-model:show="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @cancel="show = false"
      @select="select"
      teleport="body"
    />
  </div>
  <van-popup
    v-model:show="sideShow"
    class="popup"
    position="left"
    :style="{ height: '100%', width: '80%' }"
    teleport="body"
    ><Sider />
  </van-popup>
</template>

<script>
import Grid from './grid.vue';
import { useStore } from 'vuex';
import { ref } from 'vue';
import { sideShow } from '@/hooks/status.js';
import { getuserdata, getlogout } from '@/api/user.js';
import { onMounted } from '@vue/runtime-core';
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import Userplaylist from './Userplaylist.vue';
import { Toast } from 'vant';
import Sider from '../find/components/sider.vue';
export default {
  components: {
    Grid,
    Userplaylist,
    Sider,
  },
  name: 'my',
  setup() {
    const store = useStore();

    const router = useRouter();
    const user = reactive({
      profile: {},
      level: null,
    });
    const show = ref(false);
    const actions = [{ name: '个人资料' }, { name: '查看好友' }, { name: '退出登录', color: '#ee0a24' }];
    const select = async (index) => {
      if (index.name === '个人资料') {
        router.push({
          name: 'user',
          params: {
            id: store.state.profile.userId,
          },
        });
      } else if (index.name === '查看好友') {
        return;
      } else {
        const { data } = await getlogout();
        if (data.code === 200) {
          localStorage.clear();
          store.dispatch('setprofile', {});
          router.push('/');
          Toast.success('退出成功');
        }
      }
    };
    const cookie = JSON.parse(localStorage.getItem('cookie'));
    const loading = ref(false);
    const onRefresh = () => {
      cookie !== null
        ? router.push({
            name: 'user',
            params: {
              id: store.state.profile.userId,
            },
          })
        : router.push('/login');
    };
    const users = computed(() => {
      return JSON.parse(localStorage.getItem('profile'));
    });
    onMounted(async () => {
      const { data } = await getuserdata({
        uid: store.state.profile.userId,
      });
      if (data.code === 200) {
        user.profile = data.profile;
        user.level = data.level;

        store.dispatch('setprofile', data.profile);
        // (data);
      }
    });
    return {
      cookie,
      store,
      user,
      router,
      users,
      loading,
      onRefresh,
      show,
      actions,
      select,
      sideShow,
    };
  },
};
</script>

<style lang="less" scped>
.my {
  width: 100%;
  height: 87vh;
  padding: 5px;
  box-sizing: border-box;
  .userdata {
    position: relative;

    height: 15vh;
    border-radius: 15px;
    /*   background: #fefefe; */
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
::v-deep(.van-cell,
  .van-cell--borderless) {
    background: #f0f0f0 !important;
  }
  .temp {
    position: absolute;
    left: 40%;
  }
}
::v-deep(.van-nav-bar__content) {
  background: #f0f0f0 !important;
}
</style>
