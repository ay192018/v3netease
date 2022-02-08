<template>
  <div class="grid">
    <van-grid :gutter="10" :border="false" clickable>
      <van-grid-item v-for="(item, index) in application.app" :key="index"
        ><template #text>
          <span class="title">{{ item.title }}</span>
        </template>
        <template #icon>
          <van-image
            width="40"
            height="40"
            radius="15px"
            fit="cover"
            :src="item.url"
            ><template v-slot:loading>
              <van-loading type="spinner" size="10" color="#000" /> </template
          ></van-image>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    const application = reactive({
      app: [
        {
          url: "http://p3.music.126.net/lFFiY-jvO1ENHtK2bZ6eUw==/109951166531420475.jpg",
          title: "最近播放",
        },
        {
          url: "https://p1.music.126.net/XnF_jGR-RLuMjgjfzTM2Yg==/109951166940684877.jpg",
          title: "本地下载",
        },
        {
          url: "https://p2.music.126.net/qrmvVuxPHJsPQcMgRd4N2w==/109951166929961184.jpg",
          title: "云盘",
        },
        {
          url: "https://p1.music.126.net/bRIshzdt9OWH0QvqHwfxjQ==/109951166380164291.jpg",
          title: "已购",
        },
        {
          url: "https://p1.music.126.net/OhIv31cOSwW0LXVg1Vkk7g==/109951166572196484.jpg",
          title: "我的好友",
        },
        {
          url: "https://p1.music.126.net/yN1ke1xYMJ718FiHaDWtYQ==/109951165076380471.jpg",
          title: "收藏和赞",
        },
        {
          url: "https://p1.music.126.net/BMPeBg8b6wRUofmMcfQ--g==/109951165029361219.jpg",
          title: "我的播客",
        },
        {
          url: "https://p1.music.126.net/yxVm_vRFOode6yP67NmMcA==/109951166625738075.jpg",
          title: "音乐罐子",
        },
      ],
    });

    return {
      application,
    };
  },
};
</script>

<style lang="less" scoped>
.grid {
  width: 95vw;
  height: 30vh;
  box-sizing: b;
  border-radius: 15px;
  margin: 20px auto;
  background: #fefefe;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .title {
    margin-top: 5px;
    color: #bababa;
    font-size: 10px;
  }
}
</style>
