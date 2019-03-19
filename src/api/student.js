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
export function course(courseid) {
  return request({
    url: '/course/info/id/' + courseid,
    method: 'get'
  })
}
export function selectedCourses(studentno) {
  return request({
    url: '/course/info/student/' + studentno,
    method: 'get'
  })
}
export function selectedGuidTeacher(studentno) {
  return request({
    url: '/learningguid/studentslist/studentno/' + studentno,
    method: 'get'
  })
}
