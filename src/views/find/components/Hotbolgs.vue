<template>
  <div class="Random auto">
    <div class="recommend ">
      <h3><van-icon name="replay" size="20" color="#b0b0b0" />{{ Dynamictitle }}</h3>

      <van-button type="primary" class="btn" hairline round size="mini">
        <template #icon> <van-icon name="arrow" /> </template>
      </van-button>
    </div>
    <div class="content">
      <van-swipe class="my-swipe" indicator-color="white" :show-indicators="false" :width="325" :loop="false">
        <van-swipe-item>
          <div class="item">
            <div class="left">
              <div class="img">
                <van-image width="40" height="40" fit="cover" radius="15" src="" />
              </div>

              <div class="songdata">
                <div class="name van-ellipsis">
                  <span class="singer van-ellipsis">-{{}}</span>
                </div>
                <div class="singer"></div>
              </div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.Random {
  .recommend {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn {
      width: 50px;
    }
  }
  .content {
    width: auto;
    height: auto;
    padding: 5px;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 5px 0;
      .left {
        display: flex;
        align-items: left;
        .img {
          margin-right: 5px;
          position: relative;
          .icon {
            position: absolute;
            left: 27%;
            top: 27%;
            z-index: 1;
          }
        }
        .songdata {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          font-size: 13px;
          width: 250px;
          .name {
            text-align: left !important;
          }
          .singer {
            color: #c8c9cc;
            text-align: left !important;
          }
        }
      }
      .play {
        margin-right: 15px;
      }
    }
  }
}
</style>
