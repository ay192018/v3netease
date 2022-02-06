/**
 *
 *
 * @param {Number} 传入一个数据
 * @return {Number}
 * @author Ayyyy <1738202298@qq.com>
 *
 */
export const playCount = (num) => {
  if (num > 100000000) {
    num = (num / 100000000).toFixed(2);
    return `${num}亿`;
  } else if (num > 10000) {
    num = (num / 10000).toFixed(2);
    return `${num} 万`;
  } else {
    return num;
  }
};
/**
 * @param {number} second
 * @return {String}返回一个时间字符串
 * @author Ayyyy <1738202298@qq.com>
 */

export const realFormatSecond = (second) => {
  const secondType = typeof second;
  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);
    const hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    const mimute = Math.floor(second / 60);
    second = second - mimute * 60;
    return `${("0" + mimute).slice(-2)}:${("0" + second).slice(-2)}`;
  } else {
    return "00:00";
  }
};
/**
 * @param {...number} Startend,
 * @return {number}返回一个随机数
 * @author Ayyyy <1738202298@qq.com>
 */
export const random = (Start, end) => {
  const num = Math.floor(Math.random() * (Start - end) + end);
  return num;
};

/**
 * @param  {Function} 要防抖的函数
 * @param  {Number} 延迟多秒执行
 */
export const debounce = (fn, delay) => {
  var timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
/**
 * @param  {*} 监听路由改变audio的位置
 *
 */
export const changeaudio = () => {
  document.querySelector(".audio").style.bottom = "50px";
};
export const initaudio = () => {
  document.querySelector(".audio").style.bottom = 0;
};

/**
 * @param  {Object} 传入请求的歌曲对象数据进行抽离
 * @return  {Object} 延迟多秒执行
 */
export const lyrics = (lyric) => {
  let lyrics = lyric.lrc.lyric;

  let arr = lyrics.split("\n");
  let array = [];
  let time = "";
  let value = "";
  let result = [];
  let key = [];
  arr.forEach((item) => {
    if (item != "") {
      array.push(item);
    }
  });
  arr = array;
  arr.forEach((item) => {
    time = item.split("]")[0];
    value = item.split("]")[1];
    var t = time.slice(1).split(":");
    result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
    key.push(parseInt(t[0], 10) * 60 + parseFloat(t[1]));
  });
  return {
    result,
    key,
  };
};

/**
 * @param  {String} 传入一个字符判断要请求那个接口
 * @return  {String} 返回一个接口地址字符串
 */
export const tocommnts = (val) => {
  if (val === 0) {
    return "/comment/music";
  } else if (val === 2) {
    return "/comment/playlist";
  } else if (val === 5) {
    return "/comment/video";
  }
  // switch (val) {
  //   case 0:
  //     "/comment/music";
  //     break;
  //   case 2:
  //     return "/comment/playlist";

  //     break;
  //   case 5:
  //     " /comment/video";
  //     break;

  //   default:
  //     break;
  // }
};
