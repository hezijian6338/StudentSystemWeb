import request from '@/utils/request'
import qs from 'qs'

// TODO: 用户登录
export function login(username, password) {
  return request({
    url: '/login',
    method: 'post',
    data: qs.stringify({
      username,
      password
    })
  })
}

// TODO: 拉取登录用户的信息
export function getInfo(token) {
  return request({
    url: '/user/name',
    method: 'get',
    params: {
      token
    }
  })
}

// TODO: 登出(没在使用)
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
