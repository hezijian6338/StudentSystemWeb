<template>
  <div>
    <div style="margin: 20px;"/>
    <el-form :label-position="labelPosition" :model="User" label-width="80px">
      <el-form-item label="学生学号">
        <el-input v-model="User.username" style="width: 400px"/>
      </el-form-item>
    </el-form>
    <div class="button">
      <svg class="icon edit" aria-hidden="true" @click="add">
        <use xlink:href="#icon-finish"/>
      </svg>
    </div>
  </div>
</template>
<script>
import { addUser } from '@/api/login'

export default {
  data() {
    return {
      labelPosition: 'right',
      User: {
        username: '',
        password: '',
        id: ''
      }
    }
  },
  methods: {
    add() {
      if (this.User.username.length === 0) {
        this.$message.error('增加错误,你不能为空...')
      } else {
        addUser(this.User).then(res => {
          console.log(res.code)
          if (res.code === 200) {
            this.loading = false
            this.$message({
              message: '增加成功' + res.message,
              type: 'success'
            })
          } else {
            this.$message.error('增加错误,请联系管理员...')
          }
        })
      }
    }
  }
}
</script>
<style>
.div {
  margin: 20px;
}
.button {
  text-align: center;
  margin: 50px auto;
}
.button > .icon {
  width: 3em;
  height: 3em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  cursor: pointer;
}
</style>

