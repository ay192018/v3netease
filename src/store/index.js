import { createStore } from 'vuex';
export default createStore({
  state: {
    songlist: [], //当前正在播放音乐的歌单
    isplay: false, //播放状态
    audio: null, //audio dom元素
    curret: null, //当前歌曲索引
    playmodel: 0, //0,列表循环，1随机播放，2单曲循环 3心动模式
    profile: JSON.parse(localStorage.getItem('profile')) || {},
    flag: 0, //控制请求歌曲评论还是歌单评论   0，歌曲评论 2，歌单评论
    videolist: [],
    videocurret: 0,
    audioshow: false,
    playlistID: null,
    theme: 'dark',
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
    setvideolist(state, data) {
      state.videolist = data;
    },
    setvideocurret(state, data) {
      state.videocurret = data;
    },
    setaudioshow({ audioshow }) {
      audioshow = !audioshow;
    },
    setplaylistID(state, data) {
      state.playlistID = data;
    },
    setremove(state, data) {
      state.songlist.splice(data, 1);
    },
    pushsonglist(state, data) {
      state.songlist.push(...data);
    },
    changetheme(state, data) {
      state.theme = data;
    },
  },
  actions: {
    setisplay(mutation) {
      mutation.commit('setisplay');
    },
    setaudio(mutation, playod) {
      mutation.commit('setaudio', playod);
    },

    setsonglist(mutation, playod) {
      mutation.commit('setsonglist', playod);
    },
    setsetcurret(mutation, playod) {
      mutation.commit('setcurret', playod);
    },
    setprofile(mutation, playod) {
      mutation.commit('setprofile', playod);
    },

    setflag(mutation, playod) {
      mutation.commit('setflag', playod);
    },
    setplaymodel(mutation, playod) {
      mutation.commit('setplaymodel', playod);
    },
    setvideocurret(mutation, playod) {
      mutation.commit('setvideocurret', playod);
    },
    setaudioshow({ commit }) {
      commit('setaudioshow');
    },
    setplaylistID({ commit }, data) {
      commit('setplaylistID', data);
    },
    setremove({ commit }, data) {
      commit('setremove', data);
    },
    pushsonglist({ commit }, data) {
      commit('pushsonglist', data);
    },
    changetheme({ commit }, data) {
      commit('changetheme', data);
    },
  },

  modules: {},
});
