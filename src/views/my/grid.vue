<template>
  <div class="grid">
    <van-grid :gutter="10" :border="false" clickable>
      <van-grid-item v-for="(item, index) in application.app" :key="index"
        ><template #text>
          <span class="title">{{ item.title }}</span>
        </template>
        <template #icon>
          <van-image width="40" height="40" radius="15px" fit="cover" :src="item.url"
            ><template v-slot:loading> <van-loading type="spinner" size="10" color="#000" /> </template
          ></van-image>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { reactive } from 'vue';
export default {
  name: 'grid',
  setup() {
    const application = reactive({
      app: [
        {
          url: require('../../assets/1.png'),
          title: '最近播放',
        },
        {
          url: require('../../assets/2.png'),
          title: '本地下载',
        },
        {
          url: require('../../assets/3.png'),
          title: '云盘',
        },
        {
          url: require('../../assets/4.png'),
          title: '已购',
        },
        {
          url: require('../../assets/5.png'),
          title: '我的好友',
        },
        {
          url: require('../../assets/6.png'),
          title: '收藏和赞',
        },
        {
          url: require('../../assets/7.png'),
          title: '我的播客',
        },
        {
          url: require('../../assets/8.png'),
          title: '音乐罐子',
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
  box-sizing: border-box;
  border-radius: 15px;
  margin: 20px auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .title {
    margin-top: 5px;
    color: #bababa;
    font-size: 13px;
  }
}
</style>
