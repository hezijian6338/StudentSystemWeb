<template>
  <div>
    <div>
      <h1>课程信息</h1>
      <el-main>
        <el-table :data="coursesInfo" border height="680px" style="width: 100%; height: 30%">
          <el-table-column label="学科名字" style="width: 25%" prop="coursename"/>
          <el-table-column label="课程类型" style="width: 25%" prop="coursetype"/>
          <el-table-column label="学分" style="width: 25%" prop="credit"/>
          <el-table-column label="人数" style="width: 25%" prop="studentnum"/>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="selected(scope.$index)">登分</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { teaCourseList } from '@/api/teacher'

export default {
  data() {
    return {
      coursesInfo: []
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
    loadData() {
      teaCourseList(this.name).then(res => {
        this.coursesInfo = res.data
        console.log(res.data)
      })
    },
    selected(index) {
      // 跳转去某个页面
      this.$router.push({ path: '/form/infoScore/',
        query: {
          index: this.coursesInfo[index].selectedcourseno
        }})
      // 传送参数 然后infoScore接送
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

