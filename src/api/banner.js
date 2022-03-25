import http from '@/Util/http.js';
/**
 *
 *
 * @param {Object} 传入一个对象
 * @return {Promise} 返回一个Promise
 * @author Ayyyy <1738202298@qq.com>
 * @module   http请求模块
 */
export const getbanner = (params) => {
  return http({
    method: 'GET',
    url: '/banner',
    params,
  });
};
export const getfindinfo = (params) => {
  return http({
    method: 'GET',
    url: '/homepage/block/page',
    params,
  });
};
