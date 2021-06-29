import axios from 'axios'
import urls from './urls'
import qs from 'qs'

const http = axios.create({
  baseURL: urls.baseUrl,
  timeout: 30000
})

const httpPost = (url, data = {}) => {
  return http({
    url,
    data,
    method: 'POST'
  })
}

const xbPost = (url, data = {}) => {
  const result = http.post(url, qs.stringify(data), {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
  return result
}

const httpGet = (url, params = {}) => {
  return http({
    url,
    params,
    method: 'GET'
  })
}

const normalHttp = (url, data, method) => {
  return axios({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data
  })
}

const httpDel = (url, params = {}) => {
  return http({
    url,
    params,
    method: 'DELETE'
  })
}

const httpPatch = (url, params = {}) => {
  return http({
    url,
    params,
    method: 'PATCH'
  })
}

const download = (url, params = {}) => {
  return axios({
    baseURL: urls.baseUrl,
    url,
    params,
    method: 'GET',
    headers: {
      responseType: 'blob'
    }
  })
}

export { httpPost, httpGet, normalHttp, download, xbPost, httpDel, httpPatch }
