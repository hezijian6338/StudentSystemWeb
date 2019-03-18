<template>
  <div>
    <el-table
      :data="courses"
      height="250"
      border
      style="width: 100%">
      <el-table-column
        prop="coursecode"
        label="课程代码"
        width="180"/>
      <el-table-column
        prop="coursename"
        label="课程名称"
        width="180"/>
      <el-table-column
        prop="credit"
        label="学分"/>
    </el-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { selectedCourses } from '@/api/student'
export default {
  data() {
    return {
      courses: []
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  methods: {
    loadData() {
      selectedCourses(this.name).then(res => {
        this.courses = res.data
      })
    }
  }
}
</script>

