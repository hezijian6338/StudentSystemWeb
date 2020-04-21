<template>
  <div>
    <el-main>
      <el-table :data="selectedStudents" border height="680px" style="width: 100%">
        <el-table-column label="学生学号" style="width: 25%" prop="studentno"/>
        <el-table-column label="学生名字" style="width: 25%" prop="stuname"/>
        <el-table-column label="班级" style="width: 25%" prop="classname"/>
        <el-table-column label="电话" style="width: 25%" prop="mobileno"/>
      </el-table>
    </el-main>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { selectedStudents } from '@/api/teacher'

export default {
  data() {
    return {
      selectedStudents: []
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      selectedStudents(this.name).then(res => {
        // alert(res.data.length)
        if (res.data.length !== 0) {
          this.selectedStudents = res.data
        }
      })

      // } else {
      //   this.$message({
      //     message: '你没有查看的权限!!',
      //     type: 'warning'
      //   })
      // }
    }
    // hasPermission(route) {
    //   return this.roles.some(role => role.includes(route))
    // }
  }
}
</script>
<style>
.div {
  margin: 20px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

