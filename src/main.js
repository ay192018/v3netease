import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/less/index.less';
import 'lib-flexible';
import Vant from 'vant';
import 'vant/lib/index.css';
import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/style.css';
import { Lazyload } from 'vant';
import 'animate.css';
import './less/bright.less';
import './less/dark.less';

createApp(App)
  .use(store)
  .use(router)
  .use(Vant)
  .use(Lazyload, {
    lazyComponent: true,
  })
  .use(NutUI)
  .mount('#app');
