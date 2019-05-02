<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">
      roles:
      <span v-for="role in roles" :key="role">||{{ role }}</span>
      <div v-if="hasPermission('ROLE_ALL')">
        user:
        <span v-for="user in allowUser" :key="user">||{{ user }}</span>
        <el-table
          :data="userList"
          style="width: 100%">
          <el-table-column
            prop="username"
            label="用户"
            width="180"/>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { findUser } from '@/api/login'
import { studentInfo } from '@/api/student'

export default {
  name: 'Dashboard',
  data() {
    return {
      userList: [],
      user: []
    }
  },
  computed: {
    ...mapGetters(['name', 'roles', 'allowUser'])
  },
  created() {
    this.loadData()
  },
  methods: {
    hasPermission(route) {
      return this.roles.some(role => role.includes(route))
    },
    loadData() {
      findUser().then(res => {
        console.log(res.data.list)
        this.user = res.data.list
      })
      for (var i = 0; i < this.user.length; i++) {
        studentInfo(this.user[i].username).then(res => {
          this.userList.push(res.data)
        })
      }
      console.log(this.userList)
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
