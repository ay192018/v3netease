<template>
  <div class="userData">
    <van-nav-bar title="我的资料" left-arrow @click-left="onClickLeft" />
    <div class="data">
      <van-cell title="头像" is-link value="内容">
        <template #value>
          <van-uploader :after-read="afterRead">
            <van-image width="40" height="40" fit="cover" round :src="store.state.profile.avatarUrl" />
          </van-uploader>
        </template>
      </van-cell>

      <van-cell title="昵称" is-link value="宇over" @click="changename = !changename" />
      <van-cell title="性别" is-link :value="gender" @click="changeshow = !changeshow" />
      <van-cell title="生日" is-link value="内容" />
      <van-cell title="地区" is-link value="内容" />
    </div>
    <van-popup v-model:show="changeshow" position="bottom" :style="{ height: '50%', width: '100%' }"
      ><van-picker
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
        :default-index="store.state.profile.gender"
      />
    </van-popup>
    <van-popup v-model:show="changename" position="bottom" :style="{ height: '100%', width: '100%' }">
      <van-nav-bar
        title="修改昵称"
        left-text="取消"
        right-text="完成"
        left-arrow
        @click-right="onClickRight"
        @click-left="close"
        :border="false"
      />
      <van-cell-group inset>
        <van-field v-model="value" placeholder="请输入昵称 " clearable />
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { getuserupdate } from '@/api/user.js';
export default {
  name: 'userid',
  setup(props, { emit }) {
    const router = useRouter();
    const value = ref('');

    const store = useStore();
    const columns = ['保密', '男', '女'];
    const onConfirm = async (value, index) => {
      userupdate.value.gender = index;
      const { data } = await getuserupdate();
      data;
      changeshow.value = !changeshow.value;
    };
    const gender = computed(() => {
      if (store.state.profile.gender === 0) {
        return '保密';
      } else if (store.state.profile.gender === 1) {
        return '男';
      } else {
        return '女';
      }
    });
    const userupdate = computed(() => {
      return {
        gender: store.state.profile.gender,
        birthday: store.state.profile.birthday,
        nickname: store.state.profile.birthday,
        province: store.state.profile.province,
        city: store.state.profile.city,
        signature: store.state.profile.signature,
      };
    });

    const onCancel = () => {
      changeshow.value = !changeshow.value;
    };
    const changeshow = ref(false);
    const changename = ref(false);
    const close = () => {
      changename.value = !changename.value;
    };
    const onClickLeft = () => {
      emit('changeShow');
    };

    const onClickRight = () => {
      ('提交');
    };

    const afterRead = (file) => {
      // 此时可以自行将文件上传至服务器
      file;
    };

    return {
      onClickLeft,
      router,
      afterRead,
      changeshow,
      columns,

      onCancel,
      onConfirm,
      changename,
      close,
      value,
      onClickRight,
      userupdate,
      store,
      gender,
      getuserupdate,
    };
  },
};
</script>

<style lang="less" scoped>
.userData {
  .data {
    margin: 5px auto;
  }
  ::v-deep(.van-nav-bar__text) {
    color: #bfbfbf;
  }
}
</style>
