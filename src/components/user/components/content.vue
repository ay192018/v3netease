<template>
  <div class="content">
    <nut-tabs v-model="state.tab11value" type="smile">
      <nut-tabpane title="主页">
        <div class="user">
          <div class="data">
            <p class="basic">基本信息</p>
            <div>
              村岭:{{ parseInt(attrs.user.createDays / 365) }}年({{
                createTime(attrs.user.createTime)
              }}注册)
            </div>
            <div>性别:{{ attrs.user.profile.gender === 1 ? "男" : "女" }}</div>
            <div>
              年龄:{{ `${datalbum(attrs.user.profile.birthday).at(3)}0` }}后
            </div>
            <div class="van-hairline--bottom"></div>
          </div>
          <div class="view">查看全部<van-icon name="arrow" /></div>
        </div>
        <div class="Rank">
          <div class="data">
            <p class="basic">音乐品味</p>
            <van-cell
              title="听歌排行"
              :label="`累计听歌${attrs.user.listenSongs}首`"
              clickable
            ></van-cell>
            <van-cell
              title="我喜欢的音乐"
              @click="
                router.push({
                  name: 'songsdetails',
                  params: {
                    id: like.id,
                  },
                })
              "
              :label="`${like.trackCount}首，播放${like.playCount}次`"
              clickable
            ></van-cell>
          </div>
        </div>
        <div class="ceated ceateds">
          <div class="trackCount gedan">创建歌单({{ user.length }}个)</div>
          <div
            class="item"
            v-for="(item, index) in user"
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
        <div class="ceated ceateds padding">
          <div class="trackCount gedan">
            收藏歌单 ({{ collection.length }}个)
          </div>
          <div
            class="item"
            v-for="(item, index) in collection"
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
        <nut-backtop :bottom="150" :right="50" :duration="3000"></nut-backtop>
      </nut-tabpane>
      <nut-tabpane title="动态">
        Tab 2
      </nut-tabpane>
      <nut-tabpane title="视频">
        Tab 2
      </nut-tabpane>
    </nut-tabs>
  </div>
</template>

<script>
import { createTime, datalbum } from "@/Util/dayjs.js";
import { getuserplaylist } from "@/api/user.js";
import { onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  setup(props, { attrs }) {
    const state = reactive({
      tab11value: "0",
    });
    const playlist = reactive({
      user: [],
      collection: [],
      like: [],
    });
    const router = useRouter();
    onMounted(async () => {
      const { data } = await getuserplaylist({
        uid: attrs.user.id,
      });
      playlist.like = data.playlist[0];
      data.playlist.filter((item) => {
        if (item.userId == attrs.user.id) {
          playlist.user.push(item);
        } else {
          playlist.collection.push(item);
        }
      });
      playlist.user.shift();
      console.log(playlist);
    });
    return {
      state,
      attrs,
      createTime,
      datalbum,
      ...toRefs(playlist),
      router,
    };
  },
};
</script>

<style lang="less" scoped>
.content {
  ::v-deep(.nut-tabpane) {
    margin: 0 auto;
    background: transparent;
  }
  .user,
  .Rank {
    width: 100%;
    border-radius: 15px;
    background: #fff;
    height: auto;
  }

  .user {
    .data {
      & div {
        margin-top: 5px;
        color: #323233;
        font-size: 13px;
      }
    }
    .view {
      text-align: center;
      color: #323233;
    }
  }
  .Rank {
    height: auto;
  }
  .basic {
    margin: 10px auto;
    font-weight: bold;
    font-size: 15px;
  }
  .data {
    margin: 15px 5px;
  }
  .ceated {
    margin: 10px auto;
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
  .ceateds {
    background: #fefefe;

    height: auto;
  }
  .trackCount {
    font-size: 8px;
    color: #bfbfbf;
  }
  .gedan {
    margin: 5px auto;
    padding: 5px;
  }
  .names {
    width: 60vw;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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
  .padding {
    padding-bottom: 200px;
  }
}
</style>
