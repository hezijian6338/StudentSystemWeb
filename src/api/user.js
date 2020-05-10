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
