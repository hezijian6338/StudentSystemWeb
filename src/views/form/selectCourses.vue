<template>
  <div>
    <h1>基础课程:</h1>
    <el-checkbox-group v-model="checkList1">
      <div v-for="course in courses" :key="course.id" style="padding:0 20px;text-align: justify;display: inline-block;width:200px;" >
        <el-checkbox v-if="!courseType(course)" :label="course.coursecode" :disabled="!hasPermission('STU_COURSE_SAVE')">{{ course.coursename }}</el-checkbox>
      </div>
    </el-checkbox-group>
    <h1>体育课程:</h1>
    <el-checkbox-group v-model="checkList2" :max="1">
      <div v-for="course in courses" :key="course.id" style="padding:0 20px;text-align: justify;display: inline-block;width:200px;">
        <el-checkbox v-if="courseType(course)" :label="course.id" :disabled="!hasPermission('STU_COURSE_SAVE')" >{{ course.coursename }}</el-checkbox>
      </div>
    </el-checkbox-group>
    <!-- {{ checkList1 }},{{ checkList2 }} -->
    <div id="button-group">
      <el-button v-if="hasPermission('STU_COURSE_SAVE')" type="primary" icon="el-icon-plus" circle/>
      <el-button
        v-if="hasPermission('STU_COURSE_SAVE')"
        type="success"
        icon="el-icon-check"
        circle
        @click="saveData"
      />
      <el-button
        v-if="hasPermission('STU_COURSE_UPDATE')"
        type="primary"
        icon="el-icon-plus"
        circle
      />
      <el-button
        v-if="hasPermission('STU_COURSE_UPDATE')"
        type="success"
        icon="el-icon-check"
        circle
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { courseList, course } from '@/api/student'

export default {
  data() {
    return {
      courses: [],
      checkList1: [],
      checkList2: []
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
        // console.log(this.courses)
      })
    },
    saveData() {
      course(this.checkList2[0]).then(res => {
        this.checkList1.push(res.data.coursecode)
      })
    }
  }
}
</script>
<style>
.div {
  margin: 20px;
}
</style>

