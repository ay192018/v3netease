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
export const jobCount = (num) => {
  if (num > 1000) {
    num = (num / 1000).toFixed(1);
    return `${num}k`;
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
  let timer = null;
  return (() => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay);
  })();
};
/**
 * @param  {*} 监听路由改变audio的位置
 *
 */
export const changeaudio = () => {
  document.querySelector(".audio").style.bottom = "51px";
};
export const initaudio = () => {
  document.querySelector(".audio").style.bottom = 0;
};

/**
 * @param  {Object} 传入请求的歌曲对象数据进行抽离
 * @return  {Object} 键值
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
    let t = time.slice(1).split(":");
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
};
/**
 * @param  {Number} 传入一个字符判断要请求那个接口

 */

export const switchtype = (val) => {
  if (val === 18) {
    return "分享单曲";
  } else if (val === 19) {
    return "分享专辑";
  } else if (val === 17 || 28) {
    return "分享电台节目";
  } else if (val === 22) {
    return "转发";
  } else if (val === 39) {
    return "发布视频";
  } else if (val === 35 || 13) {
    return "分享歌单";
  } else if (val === 24) {
    return "分享专栏文章";
  } else {
    return "分享视频";
  }
};
