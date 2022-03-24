<script>
import { getevent, gettopic, gettopics } from '@/api/user.js';
import Item from './item.vue';
import { Dynamiclists } from '@/Util/dayjs.js';
import { switchtype } from '@/Util/fltter.js';
import { onMounted } from '@vue/runtime-core';
import { ImagePreview } from 'vant';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
export default {
  setup(props, { attrs }) {
    const router = useRouter();

    const item = computed(() => {
      return attrs.item;
    });
    const json = computed(() => {
      return JSON.parse(attrs.item.json);
    });

    const Preview = (item) => {
      console.log(json.value);
      ImagePreview({
        images: [item.originUrl],
      });
    };
    return {
      attrs,
      switchtype,
      Dynamiclists,
      Preview,
      router,
      item,
      json,
    };
  },
};
</script>

<style lang="less" scoped>
.item {
  .items {
    margin-top: 15px;
    width: 100%;
    display: flex;
    .img {
      vertical-align: top;
      margin-right: 5px;
    }
    .content {
      width: 86vw;
      height: auto;
      display: inline-block;
      .text {
        margin: 5px 0;
        line-height: 18px;
      }
      .data {
        margin: 5px 0;
        .type {
          font-size: 12px;
          color: #bfbfbf;
        }
        .time {
          margin-top: 5px;
          color: #bfbfbf;
        }
      }
      .title {
        margin: 5px 0;
      }
      .imgcollection {
        border-radius: 15px !important;
        ::v-deep(.van-grid-item__content) {
          padding: 0;
        }
        .item {
          box-sizing: border-box;
        }
      }
      .song {
        border-radius: 8px;
        background: rgba(rgb(121, 116, 116), green, blue, alpha);
        display: flex;
        justify-content: space-around;
        align-items: center;

        .data {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 80%;
          overflow: hidden;
          & span {
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="item">
    <div class="items">
      <van-image
        width="40"
        height="40"
        round
        fit="cover"
        :src="item.user.avatarUrl"
        class="img"
        @click="
          router.push({
            name: 'user',
            params: {
              id: item.user.userId,
            },
          })
        "
      />
      <div class="content">
        <div
          class="data"
          @click="
            router.push({
              name: 'user',
              params: {
                id: item.user.userId,
              },
            })
          "
        >
          {{ item.type }}
          <span>{{ item.user.nickname }}</span>
          <span class="type">{{ switchtype(item.type) }}</span
          ><br />
          <span class="time">{{ Dynamiclists(item.eventTime) }} </span>
        </div>
        <div class="text" v-html="JSON.parse(item.json).msg.replace(/[\r\n]/g, '<br />')"></div>
        <div v-if="item.type === 57">
          <van-image
            width="280"
            height="140"
            radius="15"
            fit="cover"
            :src="json.resource.mlogBaseData.coverUrl"
            @click="send(json.resource.mlogBaseData.id)"
          />
        </div>
        <div class="imgcollection">
          <van-grid :column-num="3" :gutter="1" square :border="false">
            <van-grid-item v-for="(item, index) in item.pics" :key="index" class="item">
              <van-image @click="Preview(item)" width="100" height="100" fit="cover" :src="item.originUrl"
            /></van-grid-item>
          </van-grid>
        </div>
        <div class="song" v-if="item.type === 35 && json.song">
          <van-image width="40" height="40" radius="15" fit="cover" :src="json.song.album.picUrl" class="img" />

          <div class="data">
            <span class="van-ellipsis name">{{ json.song.name }}</span
            ><br />
            <span style="color:#bfbfbf" class="van-ellipsis">{{ json.song.artists[0].name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
