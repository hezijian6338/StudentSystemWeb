import request from '@/utils/request'
// import qs from 'qs'

export function studentInfo(studentno) {
  return request({
    url: '/students/studentno/' + studentno,
    method: 'get'
  })
}
export function courseList(studentno) {
  return request({
    url: '/students/' + studentno + '/courseInfos',
    method: 'get'
  })
}
