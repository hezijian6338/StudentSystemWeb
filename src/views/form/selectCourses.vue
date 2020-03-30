<template>
  <div>
    <h1>基础课程:</h1>
    <el-checkbox-group v-model="courseids">
      <div v-for="course in courses" :key="course.id" style="padding:0 20px;text-align: justify;display: inline-block;width:200px;" >
        <el-checkbox v-if="!courseType(course)" :label="course.id" :disabled="(!hasPermission('STU_COURSE_CHECK')) || (!hasPermission('STU_COURSE_UPDATE'))">{{ course.coursename }}</el-checkbox>
      </div>
    </el-checkbox-group>
    <h1>体育课程:</h1>
    <el-checkbox-group v-model="courseids" :max="1">
      <div v-for="course in courses" :key="course.id" style="padding:0 20px;text-align: justify;display: inline-block;width:200px;">
        <el-checkbox v-if="courseType(course)" :label="course.id" :disabled="(!hasPermission('STU_COURSE_CHECK')) || (!hasPermission('STU_COURSE_UPDATE'))" >{{ course.coursename }}</el-checkbox>
      </div>
    </el-checkbox-group>
    <!-- {{ courseids }} -->
    <div class="button">
      <svg v-if="hasPermission('STU_COURSE_UPDATE')" class="icon edit" aria-hidden="true" @click="saveData">
        <use xlink:href="#icon-edit"/>
      </svg>
      <svg v-if="hasPermission('STU_COURSE_SAVE')" class="icon finish" aria-hidden="true" @click="saveData">
        <use xlink:href="#icon-finish"/>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { courseList, selectCourses2, selectedCourseIds } from '@/api/student'

export default {
  data() {
    return {
      courses: [],
      courseids: [],
      c: {},
      checklist: []
      // checkList2: []
    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  mounted() {
    this.loadData()
  },
  methods: {
    courseType(course) {
      return course.coursename.includes('体育')
    },
    hasPermission(route) {
      return this.roles.some(role => role.includes(route))
    },
    loadData() {
      courseList(this.name).then(res => {
        this.courses = res.data
        console.log(res.data)
      })
      selectedCourseIds(this.name).then(res => {
        this.courseids = res.data
      })
    },
    saveData() {
      // course(this.checkList2[0]).then(res => {
      //   this.checkList1.push(res.data.coursecode)
      // })
      var co = { 'courseids': [] }
      for (var i = 0; i < this.courseids.length; i++) {
        // co = (this.courseids[i])
        co.courseids.push(this.courseids[i])
        // this.checklist.push(co)
      }
      console.log(co)
      selectCourses2(this.name, co).then(res => {
        this.$message({
          message: '成功添加',
          type: 'success'
        })
      })
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

