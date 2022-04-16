<script>
import { ref } from 'vue';
import { getlogin } from '@/api/user.js';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
  name: 'login',
  setup() {
    const phone = ref('15949665034');
    const password = ref('wjy0.0.0');
    const router = useRouter();
    const onClickLeft = () => {
      router.back();
    };
    const store = useStore();
    const onSubmit = async () => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      const { data } = await getlogin({
        phone: phone.value,
        password: password.value,
      });
      data;
      if (data.code === 200) {
        store.dispatch('setprofile', data.profile);
        localStorage.setItem('cookie', JSON.stringify(data.cookie));
        localStorage.setItem('profile', JSON.stringify(data.profile));
        Toast.clear();
        Toast.success('登录成功');

        router.push('/');
      } else {
        Toast.fail('登录失败,请检查手机号密码是否有误');
      }
    };

    return {
      router,
      phone,
      password,
      onClickLeft,
      onSubmit,
      store,
    };
  },
};
</script>

<style lang="less" scoped>
.login {
  position: absolute;
  z-index: 9999;
 ::v-deep(.van-nav-bar ){
    background: red;
  }
::v-deep(.van-form) {
    margin-top: 30px;
  }
::v-deep(.van-nav-bar__title) {
    color: #fff;
  }
}
</style>

<template>
  <div class="login">
    <van-nav-bar title="登录" @click-left="onClickLeft" :border="false">
      <template #left>
        <van-icon name="arrow-left" color="#ccc" size="25" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <!-- 通过 pattern 进行正则校验 -->
        <van-field
          v-model="phone"
          name="phone"
          placeholder="请输入手机号"
          label="手机号"
          :rules="[{ pattern: /^1\d{10}$/, message: '请输入11位手机号' }]"
        />

        <van-field
          v-model="password"
          name="password"
          label="密码"
          type="password"
          placeholder="请输入密码"
          :rules="[
            {
              pattern: /^.{8,20}/,
              message: '请输入8-20位字符',
            },
          ]"
        />
        <!-- 通过 validator 返回错误提示 -->
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block color="red" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>
