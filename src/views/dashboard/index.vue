<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{ getRoleType }}: {{ name }}</div>
    <div class="dashboard-text">
      你拥有的权限:
      <!-- <span v-for="role in roles" :key="role">||{{ role }}</span> -->
      <div v-for="role in roles" :key="role">
        <span>{{ getRoleName(role) }}</span>
      </div>
      <div v-if="hasPermission('ROLE_ALL')">
        <!-- user: -->
        你拥有的权限:
        <!-- <span v-for="user in allowUser" :key="user">||{{ user }}</span> -->
        <div v-for="role in roles" :key="role">
          <span>{{ getRoleName(role) }}</span>
        </div>
        <el-table
          :data="userList"
          style="width: 100%">
          <el-table-column
            prop="stuname"
            label="学生名称"
            width="180"/>
          <el-table-column
            prop="studentno"
            label="学生学号"
            width="180"/>
          <el-table-column
            prop="orgName"
            label="学院名称"
            width="180"/>
          <el-table-column label="操作">
            <template scope="scope">
              <!-- <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
              <el-popover
                ref="popover4"
                placement="right"
                width="400"
                trigger="click">
                <el-table :data="courseList">
                  <el-table-column width="150" property="classname" label="班级"/>
                  <el-table-column width="100" property="coursename" label="课程名称"/>
                  <el-table-column width="300" property="employName" label="老师名字"/>
                </el-table>
              </el-popover>

              <el-button v-popover:popover4 @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { findUser } from '@/api/login'
import { studentsOfUser, selectedCourses } from '@/api/student'

export default {
  name: 'Dashboard',
  data() {
    return {
      userList: [],
      user: [],
      courseList: []
    }
  },
  computed: {
    ...mapGetters(['name', 'roles', 'allowUser']),
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
  },
  created() {
    this.loadData()
  },
  methods: {
    hasPermission(route) {
      return this.roles.some(role => role.includes(route))
    },
    loadData() {
      // findUser().then(res => {
      //   console.log(res.data.list)
      //   this.user = res.data.list
      // })
      // for (var i = 0; i < this.user.length; i++) {
      //   studentInfo(this.user[i].username).then(res => {
      //     this.userList.push(res.data)
      //   })
      // }
      studentsOfUser().then(res => {
        console.log(res)
        this.userList = res.data
      })
      // console.log(this.userList)
    },
    handleEdit(index, data) {
      console.log(index, data)
      selectedCourses(data.studentno).then(res => {
        console.log(res)
        this.courseList = res.data
      })
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
