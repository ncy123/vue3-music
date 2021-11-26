import { request } from './index.js';

export const areas = [
  { value: -1, content: '全部' },
  { value: 7, content: '华语' },
  { value: 96, content: '欧美' },
  { value: 8, content: '日本' },
  { value: 16, content: '韩国' },
  { value: 0, content: '其他' },
];

export const types = [
  { value: -1, content: '全部' },
  { value: 1, content: '男歌手' },
  { value: 2, content: '女歌手' },
  { value: 3, content: '乐队' },
];

export const Fnames = [
  { value: -1, content: '热门' },
  { value: 'A', content: 'A' },
  { value: 'B', content: 'B' },
  { value: 'C', content: 'C' },
  { value: 'D', content: 'D' },
  { value: 'E', content: 'E' },
  { value: 'F', content: 'F' },
  { value: 'G', content: 'G' },
  { value: 'H', content: 'H' },
  { value: 'I', content: 'I' },
  { value: 'J', content: 'J' },
  { value: 'K', content: 'K' },
  { value: 'L', content: 'L' },
  { value: 'M', content: 'M' },
  { value: 'N', content: 'N' },
  { value: 'O', content: 'O' },
  { value: 'P', content: 'P' },
  { value: 'Q', content: 'Q' },
  { value: 'R', content: 'R' },
  { value: 'S', content: 'S' },
  { value: 'T', content: 'T' },
  { value: 'U', content: 'U' },
  { value: 'V', content: 'V' },
  { value: 'W', content: 'W' },
  { value: 'X', content: 'X' },
  { value: 'Y', content: 'Y' },
  { value: 'Z', content: 'Z' },
  { value: 0, content: '#' },
];

//获取歌手列表
export function getSingerList(config) {
  return request({
    url: '/artist/list',
    params: {
      ...config,
    },
  });
}

//获取歌手信息和热门歌曲
export function getSingerMess(id) {
  return request({
    url: '/artists',
    params: {
      id,
    },
  });
}

//获取歌手专辑信息
export function getSingerAlbum(config) {
  return request({
    url: '/artist/album',
    params: {
      ...config,
    },
  });
}

//获取专辑内容
export function getAlbum(id) {
  return request({
    url: '/album',
    params: {
      id,
    },
  });
}
//获取歌手mv
export function getSingerMv(id) {
  return request({
    url: '/artist/mv',
    params: {
      id,
    },
  });
}

//获取歌手描述
export function getSingerDesc(id) {
  return request({
    url: '/artist/desc',
    params: {
      id,
    },
  });
}

//获取相似歌手
export function getSimiSinger(id) {
  return request({
    url: "/simi/artist",
    params: {
      id
    }
  })
}