<script>
import Recommendlist from './components/recommendlist.vue';
import Search from './components/search.vue';
import Video from './components/video.vue';
import Banner from './components/banner.vue';
import Findicon from './components/Findicon.vue';
import RandomPlaylist from './RandomPlaylist.vue';
import Radar from './components/radar.vue';
import Scenario from './components/scenario.vue';
import Ranking from './ranking.vue';
import NewSongs from './components/newSongs.vue';
import {
  text,
  looktitle,
  lookbtn,
  listtitle,
  Dynamicbtn,
  Videotext,
  Dynamictitle,
  recentVideo,
  playlist,
  radartitle,
  radarbtn,
  scenariotitle,
  scenariobtn,
  rankingtitle,
  rankingbtn,
} from '@/hooks/reactive';
import Look from './components/live.vue';
import { reactive, ref } from '@vue/reactivity';
import { Toast } from 'vant';
import { getfindinfo } from '@/api/banner.js';
import { onMounted, provide } from '@vue/runtime-core';
export default {
  components: {
    Search,
    Banner,
    Findicon,
    Recommendlist,
    Video,
    Look,
    RandomPlaylist,
    Radar,
    Scenario,
    Ranking,
    NewSongs,
  },
  name: 'find',
  setup() {
    const loading = ref(false);
    const refreshing = ref(false);
    const finished = ref(false);
    const banner = ref([]);
    const video = ref([]);
    const Radar = ref([]);
    const scenario = ref([]);
    const ranking = ref([]);
    const extInfo = ref([]);
    const cursor = ref('');
    const Dynamic = ref([]);
    const NewSongs = ref([]);
    const cookie = JSON.parse(localStorage.getItem('cookie'));
    provide('Dynamic', Dynamic);
    const onLoad = async () => {
      const { data } = await getfindinfo({
        cursor: cursor.value,
      });

      data.data.blocks.forEach((item) => {
        if (item.blockCode === 'HOMEPAGE_BANNER') {
          banner.value = item.extInfo.banners;
          // ^轮播图
        } else if (item.blockCode === 'HOMEPAGE_BLOCK_PLAYLIST_RCMD') {
          playlist.value = item.creatives;
          text.value = item.uiElement.button.text;
          listtitle.value = item.uiElement.subTitle.title;

          // ^推荐歌单
        } else if (item.blockCode === 'HOMEPAGE_BLOCK_LISTEN_LIVE') {
          extInfo.value = item.extInfo;
          lookbtn.value = item.uiElement.button.text;
          looktitle.value = item.uiElement.subTitle.title;

          // ^LOOK直播
        } else if (item.blockCode === 'HOMEPAGE_BLOCK_STYLE_RCMD') {
          Dynamic.value = item.creatives;
          Dynamicbtn.value = item.uiElement.button.text;
          Dynamictitle.value = item.uiElement.subTitle.title;
          // ^动态歌单
        } else if (item.blockCode === 'HOMEPAGE_MUSIC_MLOG') {
          // ^精选音乐视频
          video.value = item.extInfo;
          recentVideo.value = item.uiElement.subTitle.title;
          Videotext.value = item.uiElement.button.text;
        } else if (item.blockCode === 'HOMEPAGE_BLOCK_TOPLIST') {
          // ^排行榜

          ranking.value = item.creatives;
          rankingtitle.value = item.uiElement.subTitle.title;
          rankingbtn.value = item.uiElement.button.text;
        } else if (item.blockCode === 'HOMEPAGE_BLOCK_MGC_PLAYLIST') {
          // ^雷达歌单

          Radar.value = item.creatives;
          radartitle.value = item.uiElement.subTitle.title;
          radarbtn.value = item.uiElement.button.text;
        } else if (item.blockCode === 'HOMEPAGE_VOICELIST_RCMD') {
          // ^"热门播客"
          return;
          /* video.value = item.extInfo;
          rankingtitle.value = item.uiElement.subTitle.title;
          Videotext.value = item.uiElement.button.text; */
        } else if (item.blockCode === 'HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST') {
          // ^专属场景歌单
          scenario.value = item.creatives;
          scenariotitle.value = item.uiElement.subTitle.title;
          scenariobtn.value = item.uiElement.button.text;
        } else if (item.blockCode === 'HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG') {
          //&新歌新碟数字专辑
          NewSongs.value = item.creatives;
        } else {
          console.log(item);
        }
      });
      loading.value = false;
      if (data.data.hasMore) {
        cursor.value = data.data.cursor;
      } else {
        finished.value = true;
      }
    };
    const onRefresh = async () => {
      const { data } = await getfindinfo({
        refresh: true,
      });

      cursor.value = data.data.cursor;

      if (data.code === 200) {
        for (let i = 0; i < data.data.blocks.length; i++) {
          if (data.data.blocks[i].blockCode === 'HOMEPAGE_BANNER') {
            banner.value = data.data.blocks[i].extInfo.banners;
          } else if (data.data.blocks[i].blockCode === 'HOMEPAGE_BLOCK_PLAYLIST_RCMD') {
            playlist.value = data.data.blocks[i].creatives;
          } else if (data.data.blocks[i].blockCode === 'HOMEPAGE_BLOCK_LISTEN_LIVE') {
            extInfo.value = data.data.blocks[i].extInfo;
          } else if (data.data.blocks[i].showType === 'HOMEPAGE_BLOCK_STYLE_RCMD') {
            Dynamic.value = data.data.blocks[i].creatives;
            Dynamictitle.value = data.data.blocks[i].uiElement.subTitle.title;
          }
        }
        refreshing.value = false;
        Toast('刷新成功');
      }
    };

    return {
      refreshing,
      loading,
      onRefresh,
      playlist,
      cursor,
      ranking,
      finished,
      onLoad,
      video,
      Radar,
      banner,
      scenario,
      extInfo,
      cookie,
      NewSongs,
    };
  },
};
</script>

<style lang="less" scoped>
.findconent {
  scroll-behavior: hidden;
  margin: 0 auto;
  overflow-y: auto;
  margin-top: 46px;
  height: 85.5vh;
  padding-bottom: 100px;
  .indexTop {
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
  }
}
</style>

<template>
  <div class="animate__fadeIn animate__animated ">
    <Search />
    <div class="findconent">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" success-text="刷新成功" :animation-duration="1000">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          :offset="800"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="indexTop">
            <Banner :banner="banner" />
            <Findicon />
            <div class="van-hairline--bottom auto"></div>
            <Recommendlist :playlist="playlist" />
          </div>

          <Look :extInfo="extInfo" v-if="cookie && extInfo" />

          <RandomPlaylist />
          <Video v-if="video" :video="video" />
          <Ranking v-if="cookie && ranking" :ranking="ranking" />
          <Radar :playlist="Radar" v-if="Radar.length" />
          <Scenario :playlist="scenario" v-if="scenario.length" />
          <NewSongs :NewSongs="NewSongs" v-if="NewSongs" />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
