function remSize() {
  //获取屏幕宽度
  let deviceWidth = document.documentElement.clientWidth || window.innerWidth
  if (deviceWidth >= 1024) {
    deviceWidth = 1024
  }
  // if (deviceWidth <= 320) {
  //   deviceWidth = 320
  // }
  let whdef = 100 / 750
  let rem = whdef * deviceWidth
  document.documentElement.style.fontSize = rem + 'px' //设置字体默认宽度
  document.querySelector('body').style.fontSize = 0.3 + 'rem'
}

remSize()

//窗口发生变化的函数
window.onresize = function () {
  remSize()
}






