<template>
  <div class="content">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="items " v-for="(item, index) in Dynamiclist" :key="index">
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
            <span>{{ item.user.nickname }}</span>
            <span class="type">{{ switchtype(item.type) }}</span
            ><br />
            <span class="time">{{ Dynamiclists(item.eventTime) }} </span>
          </div>
          <div class="text">
            {{ JSON.parse(item.json).msg }}
          </div>

          <div class="imgcollection">
            <van-grid :column-num="3" :gutter="1" square :border="false">
              <van-grid-item
                v-for="(item, index) in item.pics"
                :key="index"
                class="item"
              >
                <van-image
                  @click="Preview(item)"
                  width="100%"
                  height="100%"
                  fit="cover"
                  :src="item.originUrl"
              /></van-grid-item>
            </van-grid>
          </div>
          <div class="song">
            <!--    <van-image
              width="40"
              height="40"
              radius="15"
              fit="cover"
              :src="JSON.parse(item.json).song.album.picUrl"
              class="img"
            />

            <div class="data">
              <span class="van-ellipsis name">{{
                JSON.parse(item.json).song.name
              }}</span
              ><br />
              <span style="color:#bfbfbf" class="van-ellipsis">{{
                JSON.parse(item.json).song.artists[0].name
              }}</span>
            </div> -->
          </div>
          <div class="ziliao">
            <div class="bottomitem">
              <van-icon size="15" class="icon" name="revoke" />转发
            </div>
            <div class="bottomitem">
              <van-icon size="18" class="icon" name="chat-o" />{{
                item.info.commentCount
              }}
            </div>
            <div class="bottomitem">
              <van-icon size="18" class="icon" name="good-job-o" />{{
                item.info.likedCount
              }}
            </div>
            <van-icon
              name="ellipsis"
              size="20"
              @click.stop="showShare = !showShare"
            />
          </div>
        </div>
      </div>
    </van-list>

    <van-share-sheet
      v-model:show="showShare"
      title="立即分享给好友"
      :options="options"
      teleport="body"
    />
  </div>
</template>

<script>
import { getuserevent } from "@/api/user.js";
import { Dynamiclists } from "@/Util/dayjs.js";
import { switchtype } from "@/Util/fltter.js";
import { onMounted } from "@vue/runtime-core";
import { ImagePreview } from "vant";
import { useRouter } from "vue-router";
import { ref, inject } from "vue";
export default {
  setup(props, { attrs }) {
    const loading = ref(false);
    const finished = ref(false);
    const Dynamiclist = ref([]);
    const showShare = ref(false);
    const lasttime = ref(-1);
    const router = useRouter();
    const options = [
      { name: "微信", icon: "wechat" },
      { name: "微博", icon: "weibo" },
      { name: "复制链接", icon: "link" },
      { name: "分享海报", icon: "poster" },
      { name: "二维码", icon: "qrcode" },
    ];

    const id = inject("id");
    const onLoad = async () => {
      const { data } = await getuserevent({
        limit: 5,
        lasttime: lasttime.value,
        uid: id,
      });

      /*    if (!data.events.length) {
        return (finished.value = true);
      } */

      Dynamiclist.value.push(...data.events);
      loading.value = false;
      if (data.events.length) {
        lasttime.value = data.lasttime;
      } else {
        finished.value = true;
      }
    };
    const Preview = (item) => {
      ImagePreview({
        images: [item.originUrl],
      });
    };

    return {
      Dynamiclist,
      Dynamiclists,
      switchtype,
      Preview,
      options,
      showShare,
      attrs,
      onLoad,
      loading,
      finished,
      lasttime,
      router,
    };
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  padding: 5px;
  /*   height: 80vh;
  box-sizing: border-box; */
  overflow-y: auto;
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
      .ziliao {
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
}
</style>
