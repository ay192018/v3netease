<template>
  <div class="search">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        :placeholder="placeholder"
        @update:model-value="values"
        @search="onSearch"
        shape="round"
        @cancel="onCancel"
        @focus="isresultshow = false"
      />
    </form>

    <Results v-if="isresultshow" :value="value" />
    <Advice v-else-if="value" :suggestlist="suggestlist" :onSearch="onSearch" />
    <History
      v-else
      :historylist="historylist"
      @reset="reset"
      :onSearch="onSearch"
    />
    <Hotsearch
      :onSearch="onSearch"
      :hotsearch="hotsearch"
      v-if="isresultshow === false"
    />
  </div>
</template>

<script>
import { debounce } from "@/Util/fltter.js";
import Hotsearch from "./hotsearch.vue";
import { ref, reactive, onMounted } from "vue";
import History from "./history.vue";
import Advice from "./advice.vue";
import Results from "./results.vue";
import { useRouter } from "vue-router";
import {
  getcloudsearch,
  getsearchdefault,
  gethotsearch,
  getsuggest,
} from "@/api/search.js";
export default {
  components: {
    History,
    Results,
    Advice,
    Hotsearch,
  },
  setup(props, { expose }) {
    const value = ref("");
    const placeholder = ref("");
    const isresultshow = ref(false); //搜索结果的显示状态
    const router = useRouter();
    const historylist = ref([]); //历史搜索列表
    const hotsearch = ref([]); //热搜列表
    const suggestlist = ref([]);

    onMounted(async () => {
      const { data } = await getsearchdefault();
      const res = await gethotsearch();
      hotsearch.value = res.data.data;
      placeholder.value = data.data.showKeyword;
    });

    const onSearch = async (val) => {
      value.value = val;
      if (val === "") {
        value.value = placeholder.value;
      }
      /**
       * @params 判断每次追加的元素在原来的数组中是否有，如果有直接删除有的那个元素在追加到首位
       */
      // console.log(historylist.value.indexOf(value.value));
      if (historylist.value.indexOf(value.value) !== -1) {
        historylist.value.splice(historylist.value.indexOf(value.value), 1);
      }
      historylist.value.unshift(value.value);
      localStorage.setItem("historylist", JSON.stringify(historylist.value));
      isresultshow.value = true;
    };
    const reset = () => {
      historylist.value = [];
    };

    const values = async (val) => {
      if (val.length === 0) return;
      const { data } = await getsuggest({
        type: "mobile",
        keywords: val,
      });
      suggestlist.value = data.result.allMatch;
    };

    const onCancel = () => router.back();
    return {
      value,
      router,
      onSearch,
      reset,
      onCancel,
      historylist,
      isresultshow,
      placeholder,
      values,
      suggestlist,
      hotsearch,
      debounce,
    };
  },
};
</script>

<style lang="less" scoped>
.search {
}
</style>
