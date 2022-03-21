import qq from '@/Util/requset.js';
export const ranking = (params) => {
  return qq({
    method: 'GET',
    url: '/top/category',
    params,
  });
};
export const top = (params) => {
  return qq({
    method: 'GET',
    url: '/top',
    params,
  });
};
