import http from "@/Util/http.js";
/**
 *
 *
 * @param {Object} 传入一个对象
 * @return {Promise} 返回一个Promise
 * @author Ayyyy <1738202298@qq.com>
 * @module   http请求模块
 */

export const getvideo = (params) => {
  return http({
    method: "GET",
    url: "/video/timeline/recommend",
    params,
  });
};
export const getvideodetail = (params) => {
  return http({
    method: "GET",
    url: "/video/detail",
    params,
  });
};
export const getmvdetail = (params) => {
  return http({
    method: "GET",
    url: "/mv/detail",
    params,
  });
};
export const getvideourl = (params) => {
  return http({
    method: "GET",
    url: "/video/url",
    params,
  });
};
export const getmvurl = (params) => {
  return http({
    method: "GET",
    url: "/mv/url",
    params,
  });
};
export const getvideocomment = (params) => {
  return http({
    method: "GET",
    url: "/comment/video",
    params,
  });
};
export const getmvcomment = (params) => {
  return http({
    method: "GET",
    url: "/comment/mv",
    params,
  });
};
