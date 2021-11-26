import { request } from './index';

export function getSearchResult(config) {
  return request({
    url: "/cloudsearch",
    params: {
      ...config
    }
  })
}




