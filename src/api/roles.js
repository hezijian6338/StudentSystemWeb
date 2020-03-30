import request from '@/utils/request'
// import qs from 'qs'

// TODO: 获取全部的角色信息
export function roleAll() {
  return request({
    url: '/role/all',
    method: 'get'
  })
}

// TODO: 获取全部的权限信息
export function permissionAll() {
  return request({
    url: '/permission/all',
    method: 'get'
  })
}

// TODO: 获取角色的权限
export function usersRole() {
  return request({
    url: '/user/role',
    method: 'get'
  })
}

// TODO: 获取角色列表(并不是完整信息)
export function roleList() {
  return request({
    url: '/role',
    method: 'get'
  })
}

// TODO: 更新用户的角色
export function editRole(user) {
  return request({
    url: '/user/role',
    method: 'post',
    data: user
  })
}

// TODO: 获取权限角色关系列表
export function permissionRole() {
  return request({
    url: '/permission/role',
    method: 'get'
  })
}

// TODO: 添加用户角色同时添加该角色的权限
export function addPermissionRole(permission_role) {
  return request({
    url: '/permission/role/connection',
    method: 'post',
    data: permission_role
  })
}

// TODO: 编辑权限对应的角色
export function editPermission(role) {
  return request({
    url: '/permission/role',
    method: 'post',
    data: role
  })
}

// TODO: 获取权限列表
export function permissionList() {
  return request({
    url: '/permission',
    method: 'get'
  })
}

// TODO: 登陆界面获取当前的已存在可登陆用户
export function allowUser() {
  return request({
    url: '/user/non/password',
    method: 'get'
  })
}
