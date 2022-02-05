import { createStore } from "vuex";
const defaultMusic = {
  name: "浪漫主义",
  id: 1887917182,
  ar: [
    {
      name: "姜云升",
    },
  ],
  al: {
    picUrl:
      "http://p3.music.126.net/lFFiY-jvO1ENHtK2bZ6eUw==/109951166531420475.jpg",
  },
};
export default createStore({
  state: {
    songlist: [defaultMusic], //当前正在播放音乐的歌单
    isplay: false, //播放状态
    audio: null, //audio dom元素
    curret: 0, //当前歌曲索引
    playmodel: 1, //0,顺序播放，1随机播放，2循环播放
    profile: JSON.parse(localStorage.getItem("profile")) || {},
    flag: 0, //控制请求歌曲评论还是歌单评论   0，歌曲评论 2，歌单评论
  },

  mutations: {
    setisplay(state) {
      state.isplay = !state.isplay;
    },
    setaudio(state, data) {
      state.audio = data;
    },

    setsonglist(state, data) {
      state.songlist = data;
    },
    setcurret(state, data) {
      state.curret = data;
    },
    setprofile(state, data) {
      state.profile = data;
    },

    setflag(state, data) {
      state.flag = data;
    },
    setplaymodel(state, data) {
      state.playmodel = data;
    },
  },
  actions: {
    setisplay(mutation) {
      mutation.commit("setisplay");
    },
    setaudio(mutation, playod) {
      mutation.commit("setaudio", playod);
    },

    setsonglist(mutation, playod) {
      mutation.commit("setsonglist", playod);
    },
    setsetcurret(mutation, playod) {
      mutation.commit("setcurret", playod);
    },
    setprofile(mutation, playod) {
      mutation.commit("setprofile", playod);
    },

    setflag(mutation, playod) {
      mutation.commit("setflag", playod);
    },
    setplaymodel(mutation, playod) {
      mutation.commit("setplaymodel", playod);
    },
  },
  modules: {},
});
