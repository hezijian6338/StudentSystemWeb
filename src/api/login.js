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

// TODO: 注册用户(单个)
// export function addUser(User) {
//   return request({
//     url: '/user',
//     method: 'post',
//     data: User
//   })
// }

export function addUser({ username }) {
  return request({
    url: '/user/' + username,
    method: 'post'
  })
}

// TODO: 查看所有用户
export function findUser() {
  return request({
    url: '/user',
    method: 'get'
  })
}
