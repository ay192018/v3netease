import http from "@/Util/http.js";
/**
 *
 *
 * @param {Object} 传入一个对象
 * @return {Promise} 返回一个Promise
 * @author Ayyyy <1738202298@qq.com>
 * @module   http请求模块
 */

export const getrecommendlist = (params) => {
  return http({
    method: "GET",
    url: "/personalized",
    params,
  });
};
/**
 * @param {Object}
 * @return {Promise}
 */
export const getsongsdetail = (params) => {
  return http({
    method: "GET",
    url: "/playlist/detail",
    params,
  });
};

/**
 * @param {Object}
 * @return {Promise}
 */
export const getallsongs = (params) => {
  return http({
    method: "GET",
    url: "song/detail",
    params,
  });
};
/**
 * @param {Object}
 * @return {Promise}
 */
export const getsongurl = (params) => {
  return http({
    method: "GET",
    url: "/song/url",
    params,
  });
};
export const getsonglyric = (params) => {
  return http({
    method: "GET",
    url: "/lyric",
    params,
  });
};
export const getalbum = (params) => {
  return http({
    method: "GET",
    url: "/album",
    params,
  });
};
export const getalbumdetail = (params) => {
  return http({
    method: "GET",
    url: "/album/detail",
    params,
  });
};
export const getsubscribe = (params) => {

  return http({
    method: "GET",
    url: "/playlist/subscribe",
    params,
  });
};
export const getCardiac = (params) => {
  return http({
    method: "GET",
    url: "/playmode/intelligence/list",
    params,
  });
};
export const getcheck = (params) => {
  return http({
    method: "GET",
    url: "/check/music",
    params,
  });
};
