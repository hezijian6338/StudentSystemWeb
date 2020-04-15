<template>
  <div class="app-container">
    <center>
      <div>
        <el-form
          ref="student"
          :model="student"
          label-width="120px"
          style="background-color: #f9fafc;"
        >
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="5">
              <el-form-item label="Your Name">
                <el-input v-model="student.stuname"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Stu Number">
                <el-input v-model="student.studentno"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Sex">
                <el-input v-model="student.sex"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="ORG Name">
                <el-input v-model="student.orgName" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="Major">
                <el-input v-model="student.major"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Classname">
                <el-input v-model="student.classname"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Grade">
                <el-input v-model="student.grade"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </center>
    <center>
      <div class="button">
        <svg class="icon edit" aria-hidden="true" @click="updateData()">
          <use xlink:href="#icon-finish"/>
        </svg>
      </div>
    </center>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { studentInfo, upStuData } from '@/api/student'
// import store from '@/store'

export default {
  data() {
    return {
      student: {
        stuname: '',
        studentno: '',
        orgName: '',
        sex: '',
        major: '',
        classname: '',
        grade: ''
      },
      course: {
        coursecode: '',
        coursename: '',
        academicyear: '',
        term: '',
        employName: '',
        coursetype: '',
        credit: '',
        totalhours: '',
        finalscore: '',
        memo: ''
      }
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {
    this.loadStudent()
  },
  methods: {
    loadStudent() {
      studentInfo(this.name).then(res => {
        if (res.data.length === 0) {
          this.$message.error('兄dei,你的资料不存在,是不是偷渡过来的...')
        }
        this.student = res.data
      })
    },
    updateData() {
      var co = this.student
      upStuData(co).then(
        location.reload()
      )
    }
  }
}
</script>

<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
/* .bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
} */
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  /* background-color: #f9fafc; */
}
</style>
