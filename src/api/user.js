import request from '@/utils/request'
// import qs from 'qs'

export function createUser(number) {
  return request({
    url: '/user/' + number,
    method: 'post'
  })
}

export function deleteUser(id) {
  return request({
    url: '/user/' + id,
    method: 'delete'
  })
}

export function modifyPassowrd(id, oldPassword, newPassword) {
  return request({
    url: '/user/' + id + '/password/' + oldPassword + '/modification/' + newPassword,
    method: 'post'
  })
}

export function findUserByName(userName) {
  return request({
    url: '/user/name/' + userName,
    method: 'get'
  })
}
