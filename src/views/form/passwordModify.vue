<template>
  <div style="width: 80%; margin: 0 auto;">
    <el-input v-model="oldPassword" style="padding: 10px;" placeholder="请输入旧密码~"/>
    <el-input v-model="password" style="padding: 10px;" placeholder="请输入新密码~"/>
    <el-input v-model="passwordAgain" style="padding: 10px;" placeholder="请输入再次输入新密码~"/>
    <span v-if="!checkPassword">密码不一致~</span>
    <el-button v-if="checkNull && checkPassword" type="success" icon="el-icon-edit" circle @click="modify"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { findUserByName, modifyPassowrd } from '@/api/user'

export default {
  data() {
    return {
      userInfo: {},
      password: '',
      passwordAgain: '',
      oldPassword: ''
    }
  },
  computed: {
    ...mapGetters(['name']),
    checkPassword() {
      if (this.password !== this.passwordAgain) {
        return false
      } else {
        return true
      }
    },
    checkNull() {
      if (this.password === '' || this.passwordAgain === '' || this.oldPassword === '') {
        return false
      } else {
        return true
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    modify() {
      modifyPassowrd(this.userInfo.id, this.oldPassword, this.password).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message({
            message: '成功修改',
            type: 'success'
          })
          this.$store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    fetchData() {
      findUserByName(this.name).then(res => {
        console.log(res.data)
        this.userInfo = res.data
      })
    }
  }
}
</script>
