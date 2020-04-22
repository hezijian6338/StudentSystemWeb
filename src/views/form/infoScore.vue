<template>
  <div>
    <el-main>
      <el-table :data="courseStu" border height="680px" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="平时成绩:" style="margin-bottom: 3px">
                <el-input v-model="props.row.usualscore"/>
              </el-form-item>
              <el-form-item label="期中成绩:" style="margin-bottom: 3px">
                <el-input v-model="props.row.middlescore"/>
              </el-form-item>
              <el-form-item label="期末成绩:" style="margin-bottom: 3px">
                <el-input v-model="props.row.endscore"/>
              </el-form-item>
              <el-form-item label="实验成绩:" style="margin-bottom: 3px">
                <el-input v-model="props.row.labscore"/>
              </el-form-item>
              <el-form-item label="总评成绩:" style="margin-bottom: 3px">
                <el-input v-model="props.row.finalscore"/>
              </el-form-item>
              <el-form-item label="折算成绩:" style="margin-bottom: 3px">
                <el-input v-model="props.row.resitscore"/>
              </el-form-item>
              <el-form-item label="补考成绩:" style="margin-bottom: 3px">
                <el-input v-model="props.row.finalscore"/>
              </el-form-item>
              <el-form-item label="绩点:" style="margin-bottom: 3px">
                <el-input v-model="props.row.gradepoint"/>
              </el-form-item>
              <el-form-item>
                <template>
                  <el-button @click="selected(props.row)">确认</el-button>
                </template>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="学生学号" style="width: 25%" prop="studentno"/>
        <el-table-column label="学生名字" style="width: 25%" prop="stuname"/>
        <el-table-column label="班级" style="width: 25%" prop="classname"/>
        <el-table-column label="学院名称" style="width: 25%" prop="orgName"/>
        <!--        <el-table-column label="操作">-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-button @click="selected(scope.$index)">确认</el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>
    </el-main>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { infoStu, updateScore } from '@/api/teacher'

export default {
  data() {
    return {
      courseStu: []
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
      console.log(this.$route.query.index + '??????????')
      infoStu(this.$route.query.index, this.name).then(res => {
        // alert(res.data.length)
        if (res.data.length !== 0) {
          this.courseStu = res.data
        }
      })

      // } else {
      //   this.$message({
      //     message: '你没有查看的权限!!',
      //     type: 'warning'
      //   })
      // }
    },
    selected: function(index) {
      console.log(index)
      var co = index
      updateScore(co).then(location.reload())
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

