import http from '@/Util/http.js';
/**
 *
 *
 * @param {Object} 传入一个对象
 * @return {Promise} 返回一个Promise
 * @author Ayyyy <1738202298@qq.com>
 * @module   http请求模块
 */

export const getresource = (params) => {
  return http({
    method: 'GET',
    url: '/share/resource',
    params,
  });
};
export const getdelates = (params) => {
  return http({
    method: 'GET',
    url: '/event/del',
    params,
  });
};
