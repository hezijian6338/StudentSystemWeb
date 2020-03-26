<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{ getRoleType }}:</div>
    <div class="dashboard-text">{{ name }}</div>
    <div class="dashboard-text">
      你拥有的权限:
      <div v-for="role in roles" :key="role">
        <span>{{ getRoleName(role) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      type: '学生'
    }
  },
  computed: {
    ...mapGetters(['name', 'roles']),
    getRoleType() {
      if (this.roles.indexOf('ROLE_ALL') !== -1) {
        return '管理员'
      } else {
        return '学生'
      }
    },
    getRoleName() {
      return function(role) {
        if (role === 'ROLE_USER') {
          return '用户权限'
        }
        if (role === 'ROLE_STU') {
          return '学生权限'
        }
        if (role === 'ROLE_HOME') {
          return '主页权限'
        }
        if (role === 'ROLE_CS') {
          return '学生选课权限'
        }
        if (role === 'ROLE_COURSE') {
          return '学生课程表'
        }
        if (role === 'ROLE_ALL') {
          return '管理员权限'
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
