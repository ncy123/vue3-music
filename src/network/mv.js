import { request } from "./index.js";

//获取最新的mv
export function getNewMv(limit) {
  return request({
    url: "/mv/first",
    params: {
      limit
    }
  })
  
}

//获取推荐MV
export function getRecommMv() {
  return request({
    url: "/personalized/mv",

  })
}

//获取MV数据
export function getMvMess(mvid) {
  return request({
    url:'/mv/detail',
    params: {
      mvid
    }
    
  })
}
//获取mv的url
export function getMvUrl(id) {
  return request({
    url: "/mv/url",
    params: {
      id
    }
  })
}

//获取mv评论
export function getMvReview(config) {
  return request({
    url: "/comment/mv",
    params: {
      ...config
    }
  })
}

//获取相似的mv
export function getSimiMv(mvid) {
  return request({
    url: "/simi/mv",
    params: {
      mvid
    }
  })
}


