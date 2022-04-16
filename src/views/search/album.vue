<script>
import { getcloudsearch } from '@/api/search.js';
import { datalbum } from '@/Util/dayjs.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'album',
  setup(props, { attrs }) {
    const album = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const router = useRouter();
    const offset = ref(1);
    const onLoad = async () => {
      attrs.attrs.value;
      const { data } = await getcloudsearch({
        keywords: attrs.attrs.value,
        type: 10,
        offset: (offset.value - 1) * 30,
      });
      if (!data.result.albums) {
        return (finished.value = true);
      }
      album.value.push(...data.result.albums);
      loading.value = false;
      if (data.result.albums.length) {
        offset.value++;
      } else {
        finished.value = true;
      }
    };

    return {
      attrs,
      album,
      onLoad,
      loading,
      finished,
      datalbum,
      router,
    };
  },
};
</script>

<style lang="less" scoped>
.album {
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
  <div class="album">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        v-for="(item, index) in album"
        :key="index"
        clickable
        @click="
          router.push({
            name: 'albumlist',
            params: {
              id: item.id,
            },
          })
        "
      >
        <template #icon>
          <van-image width="50" height="50" radius="15" :src="item.picUrl" />
        </template>
        <template #title>
          <div class="content">
            <span class="title" style="overflow: hidden">{{ item.name }}</span>
            <span class="describe">{{ `${item.artist.name} ${datalbum(item.publishTime)}` }}</span>
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>
