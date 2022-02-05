import http from "@/Util/http.js";
/**
 *
 *
 * @param {Object} 传入一个对象
 * @return {Promise} 返回一个Promise
 * @author Ayyyy <1738202298@qq.com>
 * @module   http请求模块
 */

export const getcloudsearch = (params) => {
 
  return http({
    method: "GET",
    url: "/cloudsearch",
    params,
  });
};
export const getsearchdefault = (params) => {
  return http({
    method: "GET",
    url: "/search/default",
    params,
  });
};
export const gethotsearch = (params) => {
  return http({
    method: "GET",
    url: "/search/hot/detail",
    params,
  });
};
export const getsuggest = (params) => {
  return http({
    method: "GET",
    url: "/search/suggest",
    params,
  });
};
