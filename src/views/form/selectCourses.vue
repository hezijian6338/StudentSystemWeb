<template>
  <div>
    <el-checkbox-group v-model="checkList">
      <!-- <div > -->
      <el-radio v-for="course in courses" :key="course.id" :label="course.coursecode">{{ course.coursename }}</el-radio>
      <!-- </div> -->
    </el-checkbox-group>
    <div id="button-group">
      <el-button v-if="hasPermission('STU_COURSE_SAVE')" type="primary" icon="el-icon-plus" circle/>
      <el-button v-if="hasPermission('STU_COURSE_SAVE')" type="success" icon="el-icon-check" circle/>
      <el-button v-if="hasPermission('STU_COURSE_UPDATE')" type="primary" icon="el-icon-plus" circle/>
      <el-button v-if="hasPermission('STU_COURSE_UPDATE')" type="success" icon="el-icon-check" circle/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { courseList } from '@/api/student'

export default {
  data() {
    return {
      courses: [],
      checkList: []
    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  mounted() {
    this.loadData()
  },
  methods: {
    hasPermission(route) {
      return this.roles.some(role => role.includes(route))
    },
    loadData() {
      courseList(this.name).then(res => {
        this.courses = res.data
        console.log(this.courses)
      })
    }
  }
}
</script>
<style>
.div {
  margin: 10px;
}
</style>

