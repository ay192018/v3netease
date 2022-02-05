import http from "@/Util/http.js";
import store from "../store";

/**
 *
 *
 * @param {Object} 传入一个对象
 * @return {Promise} 返回一个Promise
 * @author Ayyyy <1738202298@qq.com>
 * @module   http请求模块
 */

export const comment = (params) => {
  return http({
    method: "GET",
    url: store.state.flag === 0 ? "/comment/music" : "/comment/playlist",
    params,
  });
};

export const sendcomment = (params) => {
  return http({
    method: "GET",
    url: "/comment",
    params,
  });
};
