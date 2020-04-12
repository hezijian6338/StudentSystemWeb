import request from '@/utils/request'
// import qs from 'qs'

// TODO: 根据学生的学号返回学生信息
export function teacherInfo(teacherEmployno) {
  return request({
    url: '/teacher/info/teaInfo/' + teacherEmployno,
    method: 'get'
  })
}

