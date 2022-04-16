import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/less/index.less';
import 'lib-flexible';

import {
  Button,
  Cell,
  Icon,
  Image,
  Popup,
  Field,
  Form,
  Picker,
  Search,
  Slider,
  Switch,
  Uploader,
  ActionSheet,
  Loading,
  Overlay,
  PullRefresh,
  ShareSheet,
  SwipeCell,
  Badge,
  Empty,
  Lazyload,
  List,
  Popover,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  NavBar,
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  CellGroup,
  Skeleton,
} from 'vant';
import 'vant/lib/index.css';
import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/style.css';

import 'animate.css';
import './less/bright.less';
import './less/dark.less';

createApp(App)
  .use(store)
  .use(router)
  .use(Lazyload, {
    lazyComponent: true,
  })
  .use(Button)
  .use(Cell)
  .use(Icon)
  .use(Image)
  .use(Popup)
  .use(Field)
  .use(Form)
  .use(Picker)
  .use(Search)
  .use(Slider)
  .use(Switch)
  .use(Uploader)
  .use(ActionSheet)
  .use(Loading)
  .use(Overlay)
  .use(PullRefresh)
  .use(ShareSheet)
  .use(SwipeCell)
  .use(Badge)
  .use(Empty)
  .use(List)
  .use(Popover)
  .use(Swipe)
  .use(Grid)
  .use(NavBar)
  .use(GridItem)
  .use(SwipeItem)
  .use(Tab)
  .use(Tabs)
  .use(Tabbar)
  .use(TabbarItem)
  .use(CellGroup)
  .use(Skeleton)
  .use(NutUI)
  .mount('#app');
