import dayjs from "dayjs";
import "dayjs/locale/zh-hk";

import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("zh-hk");
export const data = (time, format = "YY-M-DD-dddd-H-mm-ss") => {
  return dayjs(time).format(format);
};
export const datalbum = (time, format = "YYYY-MM-DD") => {
  return dayjs(time).format(format);
};
export const Dynamiclists = (time, format = "MM月-DD日") => {
  return dayjs(time).format(format);
};
export const createTime = (time, format = "YYYY-MM") => {
  return dayjs(time).format(format);
};
export const week = (time, format = "DD") => {
  return dayjs(time).format(format);
};
