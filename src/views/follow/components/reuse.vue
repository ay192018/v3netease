<script>
import { getevent, gettopic, gettopics } from '@/api/user.js';
import Item from './item.vue';
import { Dynamiclist } from '@/hooks/container.js';
import { onMounted } from '@vue/runtime-core';
import ItemDynamic from './itemDynamic.vue';
import { getdelates } from '@/api/dynamic.js';
import { ref, provide } from 'vue';
import { useStore } from 'vuex';
import { Toast } from 'vant';
export default {
  components: { Item, ItemDynamic },
  name: 'reuse',
  setup(props, { expose }) {
    const loading = ref(false);
    const finished = ref(false);
    const store = useStore();
    const showShare = ref(false);
    const show = ref(false);
    const itemActive = ref(null);
    const lasttime = ref(-1);
    const options = ref([
      [
        { name: '微信', icon: 'wechat' },
        { name: '朋友圈', icon: 'wechat-moments' },
        { name: '微博', icon: 'weibo' },
        { name: 'QQ', icon: 'qq' },
      ],
      [
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster', index: null, id: null },
        { name: '二维码', icon: 'qrcode' },
        { name: '小程序码', icon: 'weapp-qrcode' },
      ],
    ]);

    onMounted(async () => {
      const { data } = await gettopic();
      const res = await gettopics();
    });
    const onLoad = async () => {
      const { data } = await getevent({
        pagesize: 5,
        lasttime: lasttime.value,
      });
      for (let i in data.event) {
        Object.defineProperties(data.event[i], {
          json: {
            value: JSON.parse(data.event[i].json),
          },
        });
      }

      Dynamiclist.value.push(...data.event);

      loading.value = false;

      if (data.event.length) {
        lasttime.value = data.lasttime;
      } else {
        finished.value = true;
      }
    };
    expose({
      onLoad,
    });
    const changeshow = () => (show.value = !show.value);
    const activeItem = (item) => {
      itemActive.value = item;
      show.value = !show.value;
    };
    const deletes = (item, index) => {
      if (item.user.userId === store.state.profile.userId) {
        options.value.flat()[5].name = '删除';
        options.value.flat()[5].index = index;
        options.value.flat()[5].id = item.id;
        options.value.flat()[5].icon =
          'https://img1.baidu.com/it/u=2198873381,3249768272&fm=253&fmt=auto&app=138&f=JPG?w=500&h=500';
      } else {
        options.value.flat()[5].name = '分享海报';
        options.value.flat()[5].icon = 'poster';
        options.value.flat()[5].index = null;
      }

      showShare.value = !showShare.value;
    };
    const select = async (name) => {
      if (name.name === '删除') {
        const { data } = await getdelates({
          evId: name.id,
        });
        if (data.code === 200) {
          Toast('删除成功');
        }
        Dynamiclist.value.splice(name.index, 1);
        showShare.value = !showShare.value;
      }
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
      Dynamiclist,
      deletes,
      select,
    };
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  padding: 5px;
  height: 83vh;
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

        <!--    <div class="">{{ item.json.song }}</div> -->
        <div class="ziliao">
          <div class="bottomitem"><van-icon size="15" class="icon" name="revoke" />转发</div>
          <div class="bottomitem">
            <van-icon size="18" class="icon" name="chat-o" @click="activeItem(item)" />{{ item.info.commentCount }}
          </div>
          <div class="bottomitem"><van-icon size="18" class="icon" name="good-job-o" />{{ item.info.likedCount }}</div>
          <van-icon name="ellipsis" size="20" @click.stop="deletes(item, index)" />
        </div>
        <div class="van-hairline--bottom"></div>
      </div>
      <van-share-sheet
        v-model:show="showShare"
        title="立即分享给好友"
        @select="select"
        :options="options"
        teleport="body"
      />
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
