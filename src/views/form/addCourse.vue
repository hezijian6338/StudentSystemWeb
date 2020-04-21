<template>
  <div>
    <div>
      <el-main>
        <el-table :data="existsCourse" border height="680px" style="width: 100%">
          <el-table-column label="课程代码" style="width: 25%" prop="coursecode"/>
          <el-table-column label="课程名称" style="width: 25%" prop="coursename"/>
          <el-table-column label="教师姓名" style="width: 25%" prop="employName"/>
          <el-table-column label="选课课号" style="width: 25%" prop="selectedcourseno"/>
        </el-table>
      </el-main>
    </div>
    <center>
      <div>
        <el-form
          ref="courses"
          :model="courses"
          label-width="120px"
          style="background-color: #f9fafc;"
        >
          <el-row :gutter="25" type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="课程代码">
                <el-input id="coursecode" v-model="courses.coursecode" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="课程名称">
                <el-input id="coursename" v-model="courses.coursename"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="学年">
                <el-input id="academicyear" v-model="courses.academicyear"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="25" type="flex" justify="center">
            <el-col :span="5">
              <el-form-item label="学期">
                <el-input id="term" v-model="courses.term"/>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="教师工号">
                <el-input id="employNo" v-model="courses.employNo" disabled="disabled"/>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="教师姓名">
                <el-input id="employName" v-model="courses.employName" disabled="disabled"/>
                <div class="grid-content">
                  <el-select id="selectedTeacher" v-model="selected" :disabled="disabledSelect" placeholder="请选择" @change="selectChange">
                    <el-option
                      v-for="teacher in guidTeachers"
                      :key="teacher.id"
                      :label="teacher.employName"
                      :value="teacher"
                    />
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="25" type="flex" justify="center">
            <el-col :span="5">
              <el-form-item label="选课课号">
                <el-input id="selectedcourseno" v-model="courses.selectedcourseno"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="课程性质">
                <el-input id="coursetype" v-model="courses.coursetype"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="总学时">
                <el-input id="totalhours" v-model="courses.totalhours"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="选课人数">
                <el-input id="studentnum" v-model="courses.studentnum"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="25" type="flex" justify="center">
            <el-col :span="5">
              <el-form-item label="学分">
                <el-input id="credit" v-model="courses.credit"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="课程归属">
                <el-input id="belongto" v-model="courses.belongto"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="课程归属">
                <el-input id="memo" v-model="courses.memo"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="教学班组成">
                <el-input id="classinfo" v-model="courses.classinfo"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </center>
    <!--This is the buttons for the test-->
    <center>
      <div class="button">
        <svg class="icon edit" aria-hidden="true" @click="submitData()">
          <use xlink:href="#icon-finish"/>
        </svg>
      </div>
    </center>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { submitCouses, displayCourses } from '@/api/teacher'
import { GuidTeachersList } from '@/api/student'
// import store from '@/store'
// For the version control

export default {
  data() {
    return {
      courses: {
        coursecode: '',
        coursename: '',
        academicyear: '',
        term: '',
        employNo: '',
        employName: '',
        selectedcourseno: '',
        coursetype: '',
        totalhours: '',
        studentnum: '',
        credit: '',
        belongto: '',
        memo: '',
        classinfo: ''
      },
      existsCourse: [],
      guidTeachers: {}
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {
    this.loadCourses()
  },
  methods: {
    loadCourses() {
      displayCourses().then(res => {
        if (res.data.length === 0) {
          this.$message.error('兄dei,你的资料不存在,是不是偷渡过来的...')
        }
        console.log(res.data.length)
        this.existsCourse = res.data
      })
      GuidTeachersList().then(res => {
        this.guidTeachers = res.data.list
      })
    },
    submitData() {
      var co = this.courses
      if (!co.coursecode) {
        alert('Course code cannot be null!')
      } else if (!co.employNo) {
        alert('Employ No Cannot be null!')
      } else if (!co.academicyear) {
        alert('Academic Year cannot be null!')
      } else if (!co.coursename) {
        alert('Course name Cannot be null!')
      } else if (!co.credit) {
        alert('Course Credit Cannot be null!')
      } else {
        alert('here???')
        submitCouses(co).then(
          location.reload()
        )
      }
      // alert(this.teachers)
    },
    selectChange(event) {
      console.log(event)
      this.selected = event.employName
      this.courses.employNo = event.employNo
      this.courses.employName = event.employName
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
