<template>
  <div class="main">
    <div>
      <el-form
        ref="teachers"
        :model="teachers"
        label-width="120px"
        style="background-color: #f9fafc;"
      >
        <el-row :gutter="25" type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="employNo" disabled="true">
              <el-input v-model="teachers.employNo"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="employName" disabled="true">
              <el-input v-model="teachers.employName"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="Sex" disabled="true">
              <el-input v-model="teachers.sex"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="25" type="flex" justify="center">
          <el-col :span="5">
            <el-form-item label="telno">
              <el-input id="teachertelno" v-model="teachers.telno"/>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="Introduce">
              <el-input id="teacherIntroduce" v-model="teachers.introduce"/>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="orgName">
              <el-input id="teacherorgName" v-model="teachers.orgName"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="25" type="flex" justify="center">
          <el-col :span="5">
            <el-form-item label="department">
              <el-input id="teacherdepartment" v-model="teachers.department"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="email">
              <el-input id="teacheremail" v-model="teachers.email"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="address">
              <el-input id="teacheraddress" v-model="teachers.address"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="acdemictitle">
              <el-input id="teacheracdemictitle" v-model="teachers.acdemictitle"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!--This is the buttons for the test-->
    <div class="button">
      <svg class="icon edit" aria-hidden="true" @click="updateData()">
        <use xlink:href="#icon-finish"/>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { teacherInfo, updateData } from '@/api/teacher'
// import store from '@/store'
// For the version control

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
        address: '',
        acdemictitle: ''
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
    },
    updateData() {
      var co = this.teachers
      // alert(this.teachers)
      updateData(co)
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
