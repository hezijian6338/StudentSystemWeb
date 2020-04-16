import request from '@/utils/request'
// import qs from 'qs'

// TODO: 根据老师的工号返回老师信息
export function teacherInfo(teacherEmployno) {
  return request({
    url: '/teacher/info/teaInfo/' + teacherEmployno,
    method: 'get'
  })
}

// TODO: 根据老师的工号来获取可选课程的信息
export function teaCourseList(teacherNo) {
  return request({
    url: '/teacher/info/course/' + teacherNo,
    method: 'get'
  })
}

// TODO: 根据老师的工号返回选该位老师做导师的学生的信息
export function displayStudent(teacherEmployno) {
  return request({
    url: '/confirm/list/disStu/' + teacherEmployno,
    method: 'get'
  })
}

// TODO: 更新导师的部分信息
export function updateData(co) {
  return request({
    url: '/teacher/info/updateData/',
    method: 'post',
    data: co
  })
}

// TODO: 根据学号和老师的工号提交请到服务
export function confirmStudent(stuNo, teacherEmployno) {
  return request({
    url: '/confirm/list/confStu/' + stuNo + '/' + teacherEmployno,
    method: 'post'
  })
}


