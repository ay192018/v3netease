<template>
  <div class="sider">
    <div class="siders">
      <van-nav-bar left-text="返回" class="users">
        <template #left>
          <div
            class="user"
            @click="
              !store.state.profile.userId
                ? router.push('/login')
                : router.push({
                    name: 'user',
                    params: {
                      id: store.state.profile.userId,
                    },
                  })
            "
          >
            <van-image
              width="30"
              height="30"
              round
              :src="
                store.state.profile.userId
                  ? store.state.profile.avatarUrl
                  : 'http://p3.music.126.net/tBTNafgjNnTL1KlZMt7lVA==/18885211718935735.jpg'
              "
            />
            &nbsp <span>{{ store.state.profile.userId ? store.state.profile.nickname : '立即登录' }}</span
            >&nbsp<van-icon name="arrow" size="15" color="#b0b0b0" />
          </div>
        </template>
        <template #right>
          <van-icon name="scan" size="23" color="#b0b0b0" />
        </template>
      </van-nav-bar>
      <div></div>
      <div class="content">
        <div class="messageCenter">
          <van-cell title="消息中心" icon="comment-o" class="item" is-link clickable @click="router.push('/mymessage')">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <div class="count">81</div>
          </van-cell>
          <van-cell title="云贝中心" icon="diamond-o" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
          <van-cell title="创作者中心" icon="manager-o" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
        </div>
        <div class="messageCenter">
          <div class="service">
            音乐服务
            <div class="van-hairline--bottom"></div>
          </div>
          <van-cell title="演出" icon="comment-o" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
          <van-cell title="商城" icon="diamond-o" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
          <van-cell title="Beat专区" icon="smile-o" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
          <van-cell title="口袋彩铃" icon="volume-o" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
          <van-cell title="游戏专区" icon="medal-o" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
        </div>
        <div class="messageCenter">
          <div class="service">
            其他
            <div class="van-hairline--bottom"></div>
          </div>
          <van-cell title="设置" icon="comment-o" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
          <van-cell title="夜间模式" icon="bulb-o" class="item">
            <template #value>
              <van-switch
                v-model="checked"
                @change="change"
                size="22"
                active-color="#ee0a24"
                inactive-color="#dcdee0"
              />
            </template>
          </van-cell>
          <van-cell title="定时关闭" icon="underway-o" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
          <van-cell title="个性装扮" icon="manager-o" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
          <van-cell title="边听边存" icon="service-o" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
          <van-cell title="在线听歌免流量" icon="bag-o" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
          <van-cell title="添加Siri捷径" icon="cluster-o" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
          <van-cell title="音乐黑名单" icon="todo-list-o" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
          <van-cell title="青少年模式" icon="shield-o" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
          <van-cell title="音乐闹钟" icon="clock-o" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
        </div>
        <div class="messageCenter">
          <van-cell title="我的客服" icon="service-o" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
          <van-cell title="我的订单" icon="description" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
          <van-cell title="优惠券" icon="paid" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
          <van-cell title="分享网易云音乐" icon="share-o" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
          <van-cell title="个人信息收集与使用清单" icon="revoke" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
          <van-cell title="个人信息第三方共享清单" icon="label-o" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
          <van-cell title="个人信息与隐私保护" icon="cluster-o" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
          <van-cell title="关于" icon="info-o" class="item" is-link clickable>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          </van-cell>
        </div>
        <van-button type="primary" class="btn" @click="loginout">退出登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { getlogout } from '@/api/user.js';
import { ref, onMounted, watch } from 'vue';
import { checked } from '@/hooks/status.js';
import { Toast } from 'vant';
export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const cookie = ref(JSON.parse(localStorage.getItem('cookie')));
    const change = () => {
      if (checked.value) {
        document.body.setAttribute('class', 'dark');
        /*   store.dispatch('changetheme', 'dark'); */
        document.documentElement.style.backgroundColor = 'rgb(7, 7, 7)';
      } else {
        /*  store.dispatch('changetheme', 'bright'); */
        document.documentElement.style.backgroundColor = '#f0f0f0';
        /*    document.body.setAttribute('class', 'bright'); */
        document.body.removeAttribute('class', 'dark');
      }
    };
    const loginout = async () => {
      if (!cookie.value) {
        return;
      }
      const { data } = await getlogout();
      if (data.code === 200) {
        localStorage.clear();
        store.dispatch('setprofile', {});
        router.push('/');
        Toast.success('退出成功');
      }
    };
    return {
      store,
      cookie,
      router,
      checked,
      checked,
      change,
      loginout,
    };
  },
};
</script>

<style lang="less" scoped>
.sider {
  width: 100%;

  background: #f0f0f0;

  .siders {
    padding: 10px;
    box-sizing: border-box;

    .users {
      border-radius: 15px;
      .user {
        display: flex;
        align-items: center;
        & {
          margin-right: 51px;
        }
        span {
          white-space: nowrap;
        }
      }
    }

    .messageCenter {
      width: 100%;
      box-sizing: border-box;

      border-radius: 15px;
      margin: 10px 0;
      ::v-deep(.van-cell__value) {
        .count {
          width: 35px;
          background: red;
          text-align: center;
          position: absolute;
          top: 0;
          border-radius: 15px;
          font-size: 10px;
        }
      }
      .service {
        padding: 15px;
        box-sizing: border-box;
        color: #b0b0b0;
      }
      .item {
        white-space: nowrap;
        border-radius: 15px;
        .custom-title {
          margin-right: 4px;
          vertical-align: middle;
        }

        .search-icon {
          font-size: 16px;
          line-height: inherit;
        }
      }
    }
  }
  .btn {
    width: 95%;
    margin: 0 6px;

    border-radius: 15px;
    color: red;
    border: none;
  }
  .content {
    width: 100%;
    padding: 5px;
    height: 89vh;
    box-sizing: border-box;
    overflow-y: auto;
  }
}
</style>
