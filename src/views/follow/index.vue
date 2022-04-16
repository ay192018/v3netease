<script>
import Reuse from './components/reuse.vue';
import { computed, nextTick, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
import { Dynamiclist } from '@/hooks/container.js';
import { checked } from '@/hooks/status.js';
import { getresource } from '@/api/dynamic.js';
import { getrecord } from '@/api/user.js';
import Recentplay from '@/components/Recentplay/';
export default {
  name: 'follow',
  components: {
    Reuse,
    Recentplay,
  },
  setup(props, { attrs }) {
    const router = useRouter();
    const showPopover = ref(false);
    const show = ref(false);
    const ChooseMusic = ref(false);
    const message = ref('');
    const value = ref('');
    const onload = ref(null);
    const store = useStore();
    const list = ref([]);
    const song = ref([]);
    // 通过 actions 属性来定义菜单选项
    const actions = [
      { text: '发图文', icon: 'newspaper-o' },
      { text: '发视频', icon: 'play-circle-o' },
      { text: '录声音', icon: 'bullhorn-o' },
    ];
    const onClickLeft = () => (show.value = !show.value);
    const onClickRight = async () => {
      if (message.value === '' || song.value.length === 0) {
        return Toast('歌曲或内容不能为空哦');
      }
      const { data } = await getresource({
        id: song.value[0].song.id,
        msg: message.value,
      });
      data.event;
      Dynamiclist.value.unshift(data.event);
      Dynamiclist.value;

      Toast.success('发布成功');

      /*    onload.value.onload();
       */
      show.value = !show.value;
      message.value = '';
      song.value = [];
    };
    const onSelect = (action) => {
      if (action.text === '发图文') {
        show.value = !show.value;
      }
    };
    const openMusic = async () => {
      ChooseMusic.value = !ChooseMusic.value;
      const { data } = await getrecord({
        uid: store.state.profile.userId,
        type: 0,
      });

      if (data.code === 200) {
        list.value = data.allData;
      }
    };
    const cancel = () => {
      ChooseMusic.value = !ChooseMusic.value;
    };
    const cookie = computed(() => {
      return JSON.parse(localStorage.getItem('cookie'));
    });
    const push = (item) => {
      song.value.push(item);
    };
    const close = () => {
      ChooseMusic.value = !ChooseMusic.value;
    };
    return {
      cookie,
      router,
      actions,
      onSelect,
      showPopover,
      checked,
      show,
      onClickLeft,
      onClickRight,
      message,
      ChooseMusic,
      openMusic,
      cancel,
      value,
      list,
      song,
      push,
      close,
      onload,
    };
  },
};
</script>

<style lang="less" scoped>
.follow {
  box-sizing: border-box;
  .bottom-button {
    width: 160px;
    height: 40px;
  }
}
.release {
  width: 45px;
  height: 25px;
}
.Release-bottom {
  width: 100%;
  height: 15vh;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  .top {
    height: 50%;
    display: flex;
    justify-content: space-around;
    .topic {
      height: 25px;
      color: #7591b9;
      border: #7591b9 1px solid;
    }
  }
  .bottom {
    .icons {
      width: 50%;

      display: flex;
      justify-content: space-around;
    }
  }
  ::v-deep(.van-cell__title) > span {
    overflow: hidden;
    white-space: nowrap;
  }
}
.Recentlyitem {
  padding: 5px;
  margin-top: 3px;
  display: flex;
  align-items: center;
}
</style>

<template>
  <div class="follow animate__fadeIn animate__animated">
    <van-nav-bar title="动态" :border="false">
      <template #right>
        <van-popover
          v-model:show="showPopover"
          :theme="checked ? 'dark' : 'light'"
          :offset="[-40, 0]"
          :actions="actions"
          @select="onSelect"
        >
          <template #reference><van-icon name="add" color="red" size="30" /> </template>
        </van-popover>
      </template>
    </van-nav-bar>
    <Reuse v-if="cookie" ref="onload" />
    <van-empty description="请登录" v-else>
      <van-button round type="danger" class="bottom-button" @click="router.push('/login')">登录</van-button>
    </van-empty>
  </div>
  <van-popup v-model:show="show" position="bottom" :style="{ height: '100%' }">
    <van-nav-bar
      title="发图文"
      left-text="取消"
      right-text="按钮"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :border="false"
    >
      <template #right>
        <van-button round type="primary" class="release" size="20" color="red">发布</van-button>
      </template>
    </van-nav-bar>
    <van-cell-group inset>
      <van-field v-model="message" rows="1" autosize type="textarea" placeholder="和村民们分享你的生活把" />
    </van-cell-group>
    <div class="Recentlyitem" v-for="(item, index) in song" :key="index">
      <div>
        <van-image width="50" height="50" fit="cover" radius="15" :src="item.song.al.picUrl" />
      </div>
      <van-cell :title="item.song.name" :label="item.song.ar[0].name" />
    </div>
    <div class="Release-bottom">
      <div class="top">
        <van-button plain hairline round type="primary" class="topic" size="mini">
          <template #icon> 话题 <van-icon name="arrow" size="15" /> </template>
        </van-button>
        <van-button plain hairline round type="primary" class="topic" size="mini">
          <template #icon> 话题 <van-icon name="arrow" size="15" /> </template>
        </van-button>
        <van-button plain hairline round type="primary" class="topic" size="mini">
          <template #icon> 话题 <van-icon name="arrow" size="15" /> </template>
        </van-button>
        <van-button plain hairline round type="primary" class="topic" size="mini">
          <template #icon> 话题 <van-icon name="arrow" size="15" /> </template>
        </van-button>
      </div>
      <div class="van-hairline--top"></div>
      <div class="bottom">
        <div class="icons">
          <van-icon size="25" name="music-o" @click="openMusic" />
          <van-icon size="25" name="photo-o" />
          <van-icon size="25" name="bullhorn-o" />
          <van-icon size="25" name="question-o" />
        </div>
      </div>
    </div>
  </van-popup>
  <van-popup v-model:show="ChooseMusic" position="bottom" :style="{ height: '100%' }">
    <van-nav-bar title="选择音乐" left-text="取消" @click-left="cancel" :border="false"> </van-nav-bar>
    <van-search v-model="value" placeholder="搜索用户" />
    <Recentplay :list="list" @push="push" @close="close" />
  </van-popup>
</template>
