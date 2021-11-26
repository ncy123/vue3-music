import { request } from "./index.js";

//获取轮播图数据

export function getBannerData() {
    return request({ url: "/banner" })
}

//获取歌单推荐数据
export function getRecomData(config) {
    return request({
      url: '/personalized',
      params: {
            limit: config
        }
    })
}
//获取独家放送数据
export function getPersonData() {
    return request({
        url: "/personalized/privatecontent"
    })
}

//获取最新音乐的数据

export function getNewmusicData() {
    return request({
        url: '/personalized/newsong',
    })
}

//获取歌曲的url
export function getSongUrl(id) {
    return request({
        url: '/song/url',
        params: {
            id: id
        }
    })
}

//获取歌词
export function getSongCi(id) {
    return request({
        url: '/lyric',
        params: {
            id: id
        }
    })
}

//获取歌曲详情
export function getSongDetail(id) {
  return request({
    url: '/song/detail',
    params: {
      ids:id
    }
  })
}







