<template>
  <div class="content">
    <van-tabs v-model:active="active" animated>
      <van-tab title="主页">
        <div class="grid">
          <div class="like">
            <p class="basic">基本信息</p>
            <div class="item">
              村岭:{{ parseInt(attrs.user.createDays / 365) }}年({{ createTime(attrs.user.createTime) }}注册)
            </div>
            <div class="item">性别:{{ attrs.user.profile.gender === 1 ? '男' : '女' }}</div>
            <div class="item">年龄:{{ `${datalbum(attrs.user.profile.birthday).at(3)}0` }}后</div>
            <div class="van-hairline--bottom"></div>
          </div>
          <div class="view">查看全部<van-icon name="arrow" /></div>
        </div>
        <div class="Rank">
          <div class="data">
            <p class="basic">音乐品味</p>
            <van-cell title="听歌排行" :label="`累计听歌${attrs.user.listenSongs}首`" clickable></van-cell>
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
            <van-image class="itemimg" width="40" height="40" radius="15" :src="item.coverImgUrl" />
            <div class="describe">
              <span class="name names">{{ item.name }}</span
              ><br />
              <span class="trackCount">{{ item.trackCount }} 首 {{ item.creator.nickname }} </span>
              <div class="van-hairline--bottom"></div>
            </div>
          </div>
        </div>
        <div class="ceated ceateds padding">
          <div class="trackCount gedan">收藏歌单 ({{ collection.length }}个)</div>
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
            <van-image class="itemimg" width="40" height="40" radius="15" :src="item.coverImgUrl" />
            <div class="describe">
              <span class="name names">{{ item.name }}</span
              ><br />
              <span class="trackCount">{{ item.trackCount }} 首 {{ item.creator.nickname }}</span>
            </div>
          </div>
        </div>
        <nut-backtop :bottom="150" :right="50" :duration="3000"></nut-backtop>
      </van-tab>
      <van-tab title="动态"> <UserResuse :id="attrs.user.id"/></van-tab>
      <van-tab title="视频">
        Tab 2
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { createTime, datalbum } from '@/Util/dayjs.js';
import { getuserplaylist, getuserevent } from '@/api/user.js';
import { onMounted, reactive, toRefs, provide, ref } from 'vue';
import { useRouter } from 'vue-router';
import UserResuse from './userReuse.vue';
export default {
  components: {
    UserResuse,
  },
  name: 'userid',
  setup(props, { attrs }) {
    const active = ref(0);
    const playlist = reactive({
      user: [],
      collection: [],
      like: [],
    });
    provide('id', attrs.user.id);
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
      playlist;
      const res = await getuserevent({
        uid: attrs.user.id,
      });
      res;
    });
    return {
      active,
      attrs,
      createTime,
      datalbum,
      ...toRefs(playlist),
      router,
      getuserevent,
    };
  },
};
</script>

<style lang="less" scoped>
.content {
  padding: 10px;
  .grid,
  .Rank {
    border-radius: 15px;

    height: auto;
    padding: 10px;
    margin: 10px 0;
  }

  .user {
    .like {
      .item {
        margin-top: 5px;
        font-size: 13px;
      }
    }
  }
  .like {
    .item {
      margin-top: 10px;

      font-size: 13px;
    }
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
    height: auto;
    border-radius: 15px;
  }
  .trackCount {
    font-size: 8px;
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
      font-size: 13px;
    }
  }
  .padding {
    padding-bottom: 200px;
  }
  .view {
    line-height: 20px;
    text-align: center;
  }
}
</style>
