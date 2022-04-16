import http from '@/Util/http.js';
import store from '../store';
import { tocommnts } from '@/Util/fltter.js';

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
    method: 'GET',
    url: tocommnts(store.state.flag),
    params,
  });
};

export const sendcomment = (params) => {

  return http({
    method: 'GET',
    url: '/comment',
    params,
  });
};
export const sendcommentlike = (params) => {

  return http({
    method: 'GET',
    url: '/comment/like',
    params,
  });
};
