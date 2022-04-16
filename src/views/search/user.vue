<script>
import { getcloudsearch } from '@/api/search.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'user',
  setup(props, { attrs }) {
    const artists = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const router = useRouter();
    const offset = ref(1);
    const onLoad = async () => {
      const { data } = await getcloudsearch({
        keywords: attrs.attrs.value,
        type: 1002,
        offset: (offset.value - 1) * 20,
      });
      if (!data.result.userprofiles) {
        return (finished.value = true);
      }
      artists.value.push(...data.result.userprofiles);
      loading.value = false;
      if (data.result.userprofiles.length) {
        offset.value++;
      } else {
        finished.value = true;
      }
    };

    return {
      attrs,
      artists,
      onLoad,
      loading,
      finished,
      router,
    };
  },
};
</script>

<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  height: 80vh;
  overflow-y: auto;
  .content {
    width: 60vw;
    margin-left: 15px;
    overflow: hidden;
    height: 100%;
    .title {
      margin-right: 4px;
      vertical-align: middle;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
      width: 100%;
      width: 80vw;
    }
    .describe {
      font-size: 13px;
      color: #dedede;
    }
  }
}
</style>

<template>
  <div class="user">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        v-for="(item, index) in artists"
        :key="index"
        clickable
        border
        @click="
          router.push({
            name: 'user',
            params: {
              id: item.userId,
            },
          })
        "
      >
        <template #icon>
          <div>
            <van-image width="50" height="50" radius="15" :src="item.avatarUrl" />
          </div>
        </template>
        <template #title>
          <div class="content">
            <span class="title van-ellipsis" style="overflow: hidden">
              {{ item.nickname }}
            </span>

            <span class="title van-ellipsis" style="overflow: hidden">{{ item.signature }}</span>
          </div>
        </template>
        <template #right-icon>
          <van-button
            type="primary"
            :color="item.subscribed ? '#ccc' : 'red'"
            size="mini"
            :disabled="item.subscribed ? true : false"
            :icon="item.subscribed ? 'success' : 'add-o'"
            round
            >{{ item.subscribed ? '已关注' : '关注' }}</van-button
          >
        </template>
      </van-cell>
    </van-list>
  </div>
</template>
