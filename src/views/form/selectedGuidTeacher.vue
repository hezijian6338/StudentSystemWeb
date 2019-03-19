<template>
  <div style="margin:10px auto;width: 95%">
    <div class="avatar">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iron-man"/>
      </svg>
    </div>
    <div class="main">
      <el-row :gutter="10">
        <el-col :xs="4" :sm="5" :md="8" :lg="3"><div class="grid-content bg-purple">导师工号</div></el-col>
        <el-col :xs="8" :sm="6" :md="16" :lg="9"><div class="grid-content bg-purple-light">{{ guidTeacher.teacherno }}</div></el-col>

        <el-col :xs="4" :sm="5" :md="8" :lg="3"><div class="grid-content bg-purple">导师名称</div></el-col>
        <el-col :xs="8" :sm="6" :md="16" :lg="9"><div class="grid-content bg-purple-light">{{ guidTeacher.teachername }}</div></el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="4" :sm="5" :md="8" :lg="3"><div class="grid-content bg-purple">导学学期</div></el-col>
        <el-col :xs="8" :sm="6" :md="16" :lg="9"><div class="grid-content bg-purple-light">{{ guidTeacher.academicyear }}</div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { selectedGuidTeacher } from '@/api/student'

export default {
  data() {
    return {
      guidTeacher: {}
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
      selectedGuidTeacher(this.name).then(res => {
        this.guidTeacher = res.data
      })
    }
  }
}
</script>
<style>
.avatar {
  text-align: center;
}
.el-row {
  margin: 10px auto;
}
.el-col {
  border-radius: 4px;
}
.bg-purple {
  background: #d3dce6;
  text-align: right;
}
.bg-purple-light {
  background: #e5e9f2;
  text-align: left;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  line-height: 36px;
}
.icon {
  width: 10em;
  height: 10em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

