import request from '@/utils/request'
// import qs from 'qs'

export function createUser(number) {
  return request({
    url: '/user/' + number,
    method: 'post'
  })
}
