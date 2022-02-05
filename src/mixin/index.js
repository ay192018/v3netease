export const myMixin = {

};
// export const play = (index) => {
//   if (
//     store.state.songlist.length &&
//     store.state.audio.played &&
//     index === store.state.curret
//   ) {
//     return;
//   }

//   Toast.loading({
//     message: "加载中...",
//     forbidClick: true,
//     loadingType: "spinner",
//   });
//   if (store.state.audio.paused) {
//     store.dispatch("setsonglist", allsongs.value);
//     store.dispatch("setsetcurret", index);
//     nextTick(() => {
//       store.state.audio.play();
//       store.dispatch("setisplay");
//       if (store.state.isplay && store.state.audio.readyState == 4) {
//         Toast.clear({
//           clearAll: true,
//         });
//       }
//     });
//   } else {
//     nextTick(() => {
//       store.dispatch("setisplay");
//       store.state.audio.pause();
//     });
//     store.dispatch("setsonglist", allsongs.value);
//     store.dispatch("setsetcurret", index);
//     nextTick(() => {
//       store.state.audio.play();
//       if (store.state.audio.played) {
//         store.dispatch("setisplay");
//         Toast.clear({
//           clearAll: true,
//         });
//       }
//     });
//   }
// };
