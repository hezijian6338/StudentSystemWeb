<template>
  <div class="main">
    <div v-if="guidedTeacher" style="display: inline-block;width:100%">
      <h2 style="white-space:nowrap;overflow: hidden;">你已有已选导师: {{ guidedTeacher.teachername }}</h2>
    </div>
    <div class="select">
      <el-row :gutter="10" type="flex" justify="center">
        <el-col :xs="5" :sm="5" :md="8" :lg="3">
          <div class="grid-content bg-purple select-teacher">
            请选择你的导学老师:
          </div>
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="5">
          <div class="grid-content">
            <el-select v-model="selected" placeholder="请选择" @change="selectChange">
              <el-option
                v-for="teacher in guidTeachers"
                :key="teacher.id"
                :label="teacher.employName"
                :value="teacher"
              />
            </el-select>
          </div>
        </el-col>
      </el-row>
      <!-- {{ guidTeacher }} -->
    </div>
    <div class="teacher">
      <div class="avatar">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iron-man"/>
        </svg>
      </div>
      <div class="main">
        <el-row :gutter="10">
          <el-col :xs="4" :sm="5" :md="8" :lg="3"><div class="grid-content bg-purple">导师工号</div></el-col>
          <el-col :xs="8" :sm="6" :md="16" :lg="9"><div class="grid-content bg-purple-light">{{ guidTeacher.employNo }}</div></el-col>

          <el-col :xs="4" :sm="5" :md="8" :lg="3"><div class="grid-content bg-purple">导师名称</div></el-col>
          <el-col :xs="8" :sm="6" :md="16" :lg="9"><div class="grid-content bg-purple-light">{{ guidTeacher.employName }}</div></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="4" :sm="5" :md="8" :lg="3"><div class="grid-content bg-purple">所在学院</div></el-col>
          <el-col :xs="8" :sm="6" :md="16" :lg="9"><div class="grid-content bg-purple-light">{{ guidTeacher.orgName }}</div></el-col>

          <el-col :xs="4" :sm="5" :md="8" :lg="3"><div class="grid-content bg-purple">导师主修</div></el-col>
          <el-col :xs="8" :sm="6" :md="16" :lg="9"><div class="grid-content bg-purple-light">{{ guidTeacher.major }}</div></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="4" :sm="5" :md="8" :lg="3"><div class="grid-content bg-purple">主研究课程</div></el-col>
          <el-col :xs="8" :sm="6" :md="16" :lg="9"><div class="grid-content bg-purple-light">{{ guidTeacher.researchdirection }}</div></el-col>

          <el-col :xs="4" :sm="5" :md="8" :lg="3"><div class="grid-content bg-purple">导师职称</div></el-col>
          <el-col :xs="8" :sm="6" :md="16" :lg="9"><div class="grid-content bg-purple-light">{{ guidTeacher.acdemictitle }}</div></el-col>
        </el-row>
      </div>
    </div>
    <!--This is the buttons for the test-->
    <div class="button">
      <svg class="icon edit" aria-hidden="true" @click="selectTeacher(guidTeacher.employNo)">
        <use xlink:href="#icon-finish"/>
      </svg>
    </div>
    <div class="button">
      <svg v-if="hasPermission('STU_GUIDTEA_UPDATE')" class="icon edit" aria-hidden="true" @click="reGuidTeacher(guidedTeacher.id, guidTeacher.employNo)">
        <use xlink:href="#icon-edit"/>
      </svg>
      <svg v-if="hasPermission('STU_GUIDTEA_SVAE') && guidedTeacher === ''" class="icon finish" aria-hidden="true">
        <use xlink:href="#icon-finish"/>
      </svg>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { GuidTeachersList, selectedGuidTeacher, ReGuidTeacher, RequestGuideTeacher } from '@/api/student'

export default {
  data() {
    return {
      guidTeachers: [],
      guidTeacher: {},
      guidedTeacher: {},
      selected: ''
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
      GuidTeachersList().then(res => {
        this.guidTeachers = res.data.list
      })
      selectedGuidTeacher(this.name).then(res => {
        this.guidedTeacher = res.data
      })
    },
    selectTeacher(employNo) {
      RequestGuideTeacher(employNo)
    },
    reGuidTeacher(id, employno) {
      if (typeof id !== 'undefined' & id !== '' & id !== null) {
        if (typeof employno !== 'undefined' & employno !== '' & employno !== null) {
          ReGuidTeacher(id, employno).then(res => {
            this.$message({
              message: '成功修改!',
              type: 'success'
            })
          })
        } else {
          this.$message.error('错了哦，你没有选择老师')
        }
      } else {
        this.$message.error('错了哦，你没有已选的老师')
      }
    },
    selectChange(event) {
      console.log(event)
      this.selected = event.employName
      this.guidTeacher = event
    },
    hasPermission(route) {
      return this.roles.some(role => role.includes(route))
    }
  }
}
</script>
<style>
.avatar {
  text-align: center;
}
.el-row {
  padding: 10px 10px;
}
.el-col {
  border-radius: 4px;
}
.select-teacher {
  text-align: center;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
  text-align: left;
}
.grid-content {
  border-radius: 4px;
  min-height: 40px;
  line-height: 40px;
}
.button {
  text-align: center;
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

