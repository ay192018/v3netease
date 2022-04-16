import http from '@/Util/http.js';
/**
 *
 *
 * @param {Object} 传入一个对象
 * @return {Promise} 返回一个Promise
 * @author Ayyyy <1738202298@qq.com>
 * @module   http请求模块
 */

export const getlogin = (params) => {
  return http({
    method: 'GET',
    url: '/login/cellphone',
    params,
  });
};
export const getuserdata = (params) => {
  return http({
    method: 'GET',
    url: '/user/detail',
    params,
  });
};
export const getuserplaylist = (params) => {
  return http({
    method: 'GET',
    url: '/user/playlist',
    params,
  });
};
export const getusersubcounts = (params) => {
  return http({
    method: 'GET',
    url: '/artist/video',
    params,
  });
};
export const getuserevent = (params) => {
  return http({
    method: 'GET',
    url: '/user/event',
    params,
  });
};
export const getevent = (params) => {
  return http({
    method: 'GET',
    url: '/event',
    params,
  });
};

export const gettopic = (params) => {
  return http({
    method: 'GET',
    url: '/topic/detail/event/hot',
    params,
  });
};
export const getuserupdate = (params) => {
  return http({
    method: 'GET',
    url: '/user/update',
    params,
  });
};
export const gettopics = (params) => {
  return http({
    method: 'GET',
    url: '/hot/topic',
    params,
  });
};
export const getfollow = (params) => {
  return http({
    method: 'GET',
    url: '/follow',
    params,
  });
};
export const getusercommit = (params) => {
  return http({
    method: 'GET',
    url: '/comment/event',
    params,
  });
};
export const getusermsg = (params) => {
  return http({
    method: 'GET',
    url: '/msg/private',
    params,
  });
};
export const getrecord = (params) => {
  return http({
    method: 'GET',
    url: '/user/record',
    params,
  });
};
export const getlogout = (params) => {
  return http({
    method: 'GET',
    url: '/logout',
    params,
  });
};
