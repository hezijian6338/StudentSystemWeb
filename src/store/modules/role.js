import {
  roleAll,
  permissionAll,
  usersRole,
  allowUser
} from '@/api/roles'
import { roleList, permissionList } from '../../api/roles'
const role = {
  state: {
    roles: [],
    permissions: [],
    allowUser: []
  },
  mutations: {
    SET_ROLESLIST: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONSLIST: (state, permissions) => {
      state.permissions = permissions
    },
    SET_ALLOWUSER: (state, allowUser) => {
      state.allowUser = allowUser
    }
  },
  actions: {
    RoleAll() {
      return new Promise((resolve, reject) => {
        roleAll().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    PermissionAll() {
      return new Promise((resolve, reject) => {
        permissionAll().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UsersRole() {
      return new Promise((resolve, reject) => {
        usersRole().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    RoleList({ commit }) {
      return new Promise((resolve, reject) => {
        roleList().then(response => {
          commit('SET_ROLESLIST', response.data.list)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    PermissionList({ commit }) {
      return new Promise((resolve, reject) => {
        permissionList().then(response => {
          commit('SET_PERMISSIONSLIST', response.data.list)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AllowUser({ commit }) {
      return new Promise((resolve, reject) => {
        allowUser().then(response => {
          commit('SET_ALLOWUSER', response.data.list)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default role
