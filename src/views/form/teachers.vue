<template>
  <div class="app-container">
    <div>
      <el-form
        ref="teachers"
        :model="teachers"
        label-width="120px"
        style="background-color: #f9fafc;"
      >
        <el-row :gutter="25" type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="employNo">
              <el-input v-model="teachers.employNo"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="employName">
              <el-input v-model="teachers.employName"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="Sex">
              <el-input v-model="teachers.sex"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="25" type="flex" justify="center">
          <el-col :span="5">
            <el-form-item label="birthday">
              <el-input v-model="teachers.birthday"/>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="orgId">
              <el-input v-model="teachers.introduce"/>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="orgName">
              <el-input v-model="teachers.orgName"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="25" type="flex" justify="center">
          <el-col :span="5">
            <el-form-item label="department">
              <el-input v-model="teachers.department"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="email">
              <el-input v-model="teachers.email"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="address">
              <el-input v-model="teachers.address"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="telno">
              <el-input v-model="teachers.telno"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { teacherInfo } from '@/api/teacher'
// import store from '@/store'

export default {
  data() {
    return {
      teachers: {
        employNo: '',
        employName: '',
        sex: '',
        birthday: '',
        introduce: '',
        orgName: '',
        department: '',
        telno: '',
        email: '',
        address: ''
      }
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {
    this.loadTeacher()
  },
  methods: {
    loadTeacher() {
      teacherInfo(this.name).then(res => {
        if (res.data.length === 0) {
          this.$message.error('兄dei,你的资料不存在,是不是偷渡过来的...')
        }
        this.teachers = res.data
      })
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
