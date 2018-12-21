import {
  roleAll,
  permissionAll,
  usersRole
} from '@/api/roles'
import { roleList, permissionList } from '../../api/roles'
const role = {
  state: {
    roles: [],
    permissions: []
  },
  mutations: {
    SET_ROLESLIST: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONSLIST: (state, permissions) => {
      state.permissions = permissions
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
    }
  }
}
export default role
