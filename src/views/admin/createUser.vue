<template>
  <div>
    <!-- <el-input v-model="number" placeholder="请输入内容"/>
    <el-button type="primary">新增用户</el-button> -->
    <!-- <el-button :plain="true" @click="open3">你忘记输入账号了~</el-button> -->
    <el-row :gutter="20">
      <el-col :offset="8" :span="6"><el-input v-model="number" placeholder="请输入 学号/教师编号"/></el-col>
      <!-- <el-col :span="6"><el-button type="primary" @click="CreateUser">新增用户</el-button></el-col> -->
    </el-row>
    <el-row :gutter="20">
      <!-- <el-col :offset="6" :span="6"><el-input v-model="number" placeholder="请输入 学号/教师编号"/></el-col> -->
      <el-col :offset="10" :span="6"><el-button type="primary" @click="CreateUser">新增用户</el-button></el-col>
    </el-row>
  </div>
</template>

<script>
import { createUser } from '@/api/user'

export default {
  data() {
    return {
      number: ''
    }
  }, methods: {
    CreateUser() {
      if (this.number !== '') {
        createUser(this.number).then(res => {
        // 创建成功
          if (res.code === 200) {
            this.$message({
              message: '恭喜你，信息添加成功~ 账号是: ' + this.number + ', 密码是: admin',
              type: 'success'
            })
            this.number = ''
          }
        })
      } else {
        this.$message({
          message: '你忘记输入账号了~',
          type: 'warning'
        })
      }
    }
  }
}
</script>
