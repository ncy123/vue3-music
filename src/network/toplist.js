import {request} from './index';


/**获取歌单分类标签 */
export function getplayList() {
  return request({
    url:'playlist/hot'
  })
}

/**获取歌单分类 */
export function getCatList(config){
  return request({
    url: 'top/playlist',
    params: {
      ...config
    }
  })
}


/**获取排行榜数据 */
export function getTopList() {
  return request({
      url: '/toplist',
  })
}

