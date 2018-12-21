import request from '@/utils/request'
// import qs from 'qs'

export function roleAll() {
  return request({
    url: '/role/all',
    method: 'get'
  })
}
export function permissionAll() {
  return request({
    url: '/permission/all',
    method: 'get'
  })
}
export function usersRole() {
  return request({
    url: '/user/role',
    method: 'get'
  })
}
export function roleList() {
  return request({
    url: '/role',
    method: 'get'
  })
}
export function editRole(user) {
  return request({
    url: '/user/role',
    method: 'post',
    data: user
  })
}
