import { request } from './index.js';

export function getdetaildata(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id,
    },
  });
}

export function getmusiclistData(ids) {
  return request({
    url: '/song/detail',
    params: {
      ids,
    },
  });
}

/**对歌曲数据进行封装 */
export class songDetail {
  constructor(songs) {
    this.id = songs[0].id;
    this.name = songs[0].name;
    this.album = songs[0].al.name;
    this.artist = songs[0].ar[0].name;
    this.pic = songs[0].al.picUrl;
    //this.time=formatDate(new Date(songs[0].dt),'mm:ss')
  }
}

//获取歌单评论
export function getReviews(config) {
  return request({
    url: '/comment/playlist',
    params: {
      ...config,
      // limit:
      //   offset:
      // before:
    },
  });
}
