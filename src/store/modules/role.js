import {
  roleAll,
  permissionAll,
  usersRole
} from '@/api/roles'
import { roleList } from '../../api/roles'
const role = {
  state: {
    roles: []
  },
  mutations: {
    SET_ROLESLIST: (state, roles) => {
      state.roles = roles
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
    }
  }
}
export default role
