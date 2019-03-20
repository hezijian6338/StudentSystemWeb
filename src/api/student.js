import request from '@/utils/request'
// import qs from 'qs'

// TODO: 根据学生的学号返回学生信息
export function studentInfo(studentno) {
  return request({
    url: '/students/studentno/' + studentno,
    method: 'get'
  })
}
// TODO: 根据学生的学号来获取可选课程的信息
export function courseList(studentno) {
  return request({
    url: '/students/' + studentno + '/courseInfos',
    method: 'get'
  })
}
// TODO: 根据课程的id来获取课程的详细信息
export function course(courseid) {
  return request({
    url: '/course/info/id/' + courseid,
    method: 'get'
  })
}
// TODO: 已选课程(根据学生的学号查询)
export function selectedCourses(studentno) {
  return request({
    url: '/course/info/student/' + studentno,
    method: 'get'
  })
}
// TODO: 已选导师(根据学生的学号查询)
export function selectedGuidTeacher(studentno) {
  return request({
    url: '/learningguid/studentslist/studentno/' + studentno,
    method: 'get'
  })
}
// TODO: 可选导师列表
// FIXME: 没做条件过滤
export function GuidTeachersList() {
  return request({
    url: '/teacher/info',
    method: 'get'
  })
}

// TODO: 学生重新选择导师
export function ReGuidTeacher(id, employno) {
  return request({
    url: '/learningguid/studentslist/' + id + '/' + employno,
    method: 'post'
  })
}
