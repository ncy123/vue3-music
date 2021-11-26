//节流函数
export function throttle(fn, delay) {
  let timer;
  return function () {
    let _this = this;
    let args = arguments;
    if (timer) {
      return;
    }
    timer = setTimeout(function () {
      fn.apply(_this, args);
      timer = null; // 在delay后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器
    }, delay);
  };
}

//防抖函数
export function debounce(fn, wait) {
  var timer = null;
  return function () {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, wait);
  };
}

function handle() {
  console.log(Math.random());
}

//存储信息
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content); //存储到电脑中
};
// 获取信息
export const getStore = (name) => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

//删除信息
export const removeStore = (name) => {
  //删除
  if (!name) return;
  window.localStorage.removeItem(name);
};

//切割歌词
export function geci(lrc) {
  var lyrics = lrc.split('\n'); //this.lrc代表歌词文件内容的引用
  var lrcObj = {};
  for (var i = 0; i < lyrics.length; i++) {
    var lyric = decodeURIComponent(lyrics[i]);
    var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
    var timeRegExpArr = lyric.match(timeReg);
    if (!timeRegExpArr) continue;
    var clause = lyric.replace(timeReg, '');
    for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
      var t = timeRegExpArr[k];
      var min = Number(String(t.match(/\[\d*/i)).slice(1)),
        sec = Number(String(t.match(/\:\d*/i)).slice(1));
      var time = min * 60 + sec;
      lrcObj[time] = clause;
    }
  }
  return lrcObj;
}

//获取音频的时常
export function getSongTime(duration) {
  //处理时长
  let time = duration;
  //分钟
  let minute = time / 60;
  let minutes = parseInt(minute);
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  //秒
  let second = time % 60;
  let seconds = Math.round(second);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return minutes + '：' + seconds;
}

// 根据时间戳返回日期
export function format(shijianchuo) {
  //shijianchuo是整数，否则要parseInt转换
  function add0(m) {
    return m < 10 ? '0' + m : m;
  }
  var time = new Date(shijianchuo);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return (
    y +
    '-' +
    add0(m) +
    '-' +
    add0(d) +
    ' ' +
    add0(h) +
    ':' +
    add0(mm) +
    ':' +
    add0(s)
  );
}

//返回年月日
// 根据时间戳返回日期
export function format1(shijianchuo) {
  //shijianchuo是整数，否则要parseInt转换
  function add0(m) {
    return m < 10 ? '0' + m : m;
  }
  var time = new Date(shijianchuo);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '年' + add0(m) + '月' + add0(d) + '日';
}
