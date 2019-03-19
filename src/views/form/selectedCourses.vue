<template>
  <div>
    <el-table
      :data="courses"
      height="600px"
      border
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="班级">
              <span>{{ props.row.classname }}</span>
            </el-form-item>
            <el-form-item label="专业">
              <span>{{ props.row.major }}</span>
            </el-form-item>
            <el-form-item label="平时成绩">
              <span>{{ props.row.usualscore }}</span>
            </el-form-item>
            <el-form-item label="期中成绩">
              <span>{{ props.row.middlescore }}</span>
            </el-form-item>
            <el-form-item label="期末成绩">
              <span>{{ props.row.endscore }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
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
      <el-table-column
        prop="employName"
        label="教学老师"/>
      <el-table-column
        prop="academicyear"
        label="学年"/>
      <el-table-column
        prop="term"
        label="学期"/>
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
  mounted() {
    this.loadData()
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

