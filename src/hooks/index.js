import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
const myHooks = () => {
  const router = useRouter();
  const route = useRoute();
  const store = useStore();
  return {
    router,
    route,
    store,
  };
};
export default myHooks;
