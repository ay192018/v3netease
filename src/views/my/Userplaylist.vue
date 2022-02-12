<template>
  <div class="Userplaylist">
    <div
      class="like"
      @click="
        router.push({
          name: 'songsdetails',
          params: {
            id: playlist.like.id,
          },
        })
      "
    >
      <div class="left">
        <van-image
          width="40"
          height="40"
          radius="15"
          :src="playlist.like.coverImgUrl"
        />
        <div class="describe">
          <span class="name">{{ playlist.like.name }}</span
          ><br />
          <span class="trackCount"
            >{{ cookie ? playlist.like.trackCount : 0 }} 首</span
          >
        </div>
      </div>
      <van-button round size="mini" icon="like-o" class="btn"
        >心动模式</van-button
      >
    </div>

    <van-tabs v-model:active="active" scrollspy sticky>
      <van-tab :title="playlist.user ? '创建歌单' : ''">
        <div class="ceated ceateds" v-if="cookie">
          <div class="trackCount gedan">
            创建歌单({{ playlist.user.length }}个)
          </div>
          <div
            class="item"
            v-for="(item, index) in playlist.user"
            :key="index"
            @click="
              router.push({
                name: 'songsdetails',
                params: {
                  id: item.id,
                },
              })
            "
          >
            <van-image
              class="itemimg"
              width="40"
              height="40"
              radius="15"
              :src="item.coverImgUrl"
            />
            <div class="describe">
              <span class="name names">{{ item.name }}</span
              ><br />
              <span class="trackCount"
                >{{ item.trackCount }} 首 {{ item.creator.nickname }}
              </span>
              <div class="van-hairline--bottom"></div>
            </div>
          </div>
        </div>
        <van-empty v-else />
      </van-tab>

      <van-tab :title="playlist.collection ? '收藏歌单' : ''">
        <div class="ceated ceateds padding" v-if="cookie">
          <div class="trackCount gedan">
            收藏歌单 ({{ playlist.collection.length }}个)
          </div>
          <div
            class="item"
            v-for="(item, index) in playlist.collection"
            :key="index"
            @click="
              router.push({
                name: 'songsdetails',
                params: {
                  id: item.id,
                },
              })
            "
          >
            <van-image
              class="itemimg"
              width="40"
              height="40"
              radius="15"
              :src="item.coverImgUrl"
            />
            <div class="describe">
              <span class="name names">{{ item.name }}</span
              ><br />
              <span class="trackCount"
                >{{ item.trackCount }} 首 {{ item.creator.nickname }}</span
              >
            </div>
          </div>
        </div>
        <van-empty v-else />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getuserplaylist } from "@/api/user.js";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const active = ref(0);
    const playlist = reactive({
      user: [],
      collection: [],
      like: [],
    });

    const cookie = JSON.parse(localStorage.getItem("cookie"));
    const router = useRouter();
    onMounted(async () => {
      if (cookie) {
        const { data } = await getuserplaylist({
          uid: JSON.parse(localStorage.getItem("profile")).userId,
        });

        playlist.like = data.playlist[0];
        data.playlist.filter((item) => {
          if (
            item.creator.nickname ===
            JSON.parse(localStorage.getItem("profile")).nickname
          ) {
            playlist.user.push(item);
          } else {
            playlist.collection.push(item);
          }
        });
        playlist.user.shift();
      } else {
        return;
      }
    });

    return {
      active,
      playlist,
      router,
      cookie,
    };
  },
};
</script>

<style lang="less" scoped>
.Userplaylist {
  width: 95vw;
  margin: 20px auto;
  .like {
    width: 100%;
    height: 10vh;
    margin: 20px auto;
    background: #fefefe;
    border-radius: 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      margin-left: -30px;
    }
    .btn {
      margin-right: -30px;
    }
  }
  /deep/ .van-tabs__wrap {
    border-radius: 15px;
  }
  /deep/ .van-tabs__nav {
    background: transparent;
  }

  .ceated {
    width: 95vw;
    margin: 0 auto;
    height: auto;
    border-radius: 15px;
    background: #fefefe;
    .item {
      width: 100%;
      display: flex;
      padding: 5px 0;
      .itemimg {
        margin-left: 15px;
      }
    }
  }
  .describe {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 10px;
    .name {
      font-size: 12px;
    }
  }
  .ceateds {
    margin-top: 15px;
    width: 95vw;
    background: #fefefe;

    height: auto;
  }
  .names {
    width: 60vw;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .trackCount {
    font-size: 8px;
    color: #bfbfbf;
  }
  .gedan {
    width: 94%;
    margin: 5px auto;
    padding: 5px;
  }
  ::v-deep(.van-empty) {
    height: 20vh;
  }
  .padding {
    padding-bottom: 200px;
  }
}
</style>
