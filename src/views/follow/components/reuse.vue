<script>
import { getevent, gettopic, gettopics } from '@/api/user.js';
import Item from './item.vue';

import { onMounted } from '@vue/runtime-core';
import ItemDynamic from './itemDynamic.vue';
import { ref } from 'vue';
export default {
  components: { Item, ItemDynamic },
  setup() {
    const loading = ref(false);
    const finished = ref(false);
    const Dynamiclist = ref([]);
    const showShare = ref(false);
    const show = ref(false);
    const itemActive = ref(null);
    const lasttime = ref(-1);
    const options = [
      { name: '微信', icon: 'wechat' },
      { name: '微博', icon: 'weibo' },
      { name: '复制链接', icon: 'link' },
      { name: '分享海报', icon: 'poster' },
      { name: '二维码', icon: 'qrcode' },
    ];
    onMounted(async () => {
      const { data } = await gettopic();
      const res = await gettopics();
    });
    const onLoad = async () => {
      const { data } = await getevent({
        pagesize: 5,
        lasttime: lasttime.value,
      });

      Dynamiclist.value.push(...data.event);
      loading.value = false;

      if (data.event.length) {
        lasttime.value = data.lasttime;
      } else {
        finished.value = true;
      }
    };
    const changeshow = () => (show.value = !show.value);
    const activeItem = (item) => {
      itemActive.value = item;
      show.value = !show.value;
    };
    return {
      getevent,
      Dynamiclist,
      options,
      showShare,
      onLoad,
      loading,
      finished,
      lasttime,
      show,
      changeshow,
      itemActive,
      activeItem,
    };
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  padding: 5px;
  height: 80vh;
  box-sizing: border-box;
  overflow-y: auto;
  .itemmargin {
    margin: 35px 0;
    .ziliao {
      width: 86vw;
      float: right;
      margin: 5px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .bottomitem {
        color: #bfbfbf;
        font-size: 13px;
        .icon {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="content">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
      ><div v-for="(item, index) in Dynamiclist" :key="index" class="itemmargin">
        <Item :item="item" />
        <div class="ziliao">
          <div class="bottomitem"><van-icon size="15" class="icon" name="revoke" />转发</div>
          <div class="bottomitem">
            <van-icon size="18" class="icon" name="chat-o" @click="activeItem(item)" />{{ item.info.commentCount }}
          </div>
          <div class="bottomitem"><van-icon size="18" class="icon" name="good-job-o" />{{ item.info.likedCount }}</div>
          <van-icon name="ellipsis" size="20" @click.stop="showShare = !showShare" />
        </div>
      </div>
      <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" teleport="body" />
      <van-popup
        v-model:show="show"
        position="right"
        safe-area-inset-top
        :style="{ height: '100%', width: '100%' }"
        teleport="body"
        ><ItemDynamic @changeshow="changeshow" :item="itemActive"
      /></van-popup>
    </van-list>
  </div>
</template>
