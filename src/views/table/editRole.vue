<template>
  <div class="app-container">
    <el-input
      v-model="search"
      size="mini"
      placeholder="输入关键字搜索"/>
    <el-table
      v-loading="loading"
      :data="tableData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column width="300px" label="UserName" prop="username"/>
      <el-table-column label="Roles" width="300px">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.roles"
            value-key="id"
            multiple
            collapse-tags
            style="width: 250px;"
            placeholder="请选择"
            @change="findSelected">
            <el-option
              v-for="(key) in roles_list"
              :key="key.id"
              :label="key.name"
              :value="key">
              <span style="float: left">{{ key.id }}</span>
              <span style="font-size: 13px">{{ key.name }}</span>
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="right" >
        <template slot="header" slot-scope="scope1">
          <!-- <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/> -->
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Confirm</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { editRole } from '@/api/roles'
import { deleteUser } from '@/api/user'

export default {
  data() {
    return {
      loading: true,
      tableData: [
        {
          id: 51,
          password: 'admin',
          roles: [
            {
              id: '1',
              name: 'ROLE_ADMIN'
            }
          ],
          username: 'admin'
        }
      ],
      backData: {
        id: 0,
        password: '',
        roles: [
          {
            id: 0,
            name: ''
          }
        ],
        username: ''
      },
      search: '',
      roles: [{
        id: '1',
        name: 'ROLE_ADMIN'
      }]
    }
  },
  computed: {
    ...mapGetters(['roles_list'])
  },
  mounted() {
    this.loadData()
  },
  methods: {
    findSelected(val) {
      console.log(val)
    },
    handleEdit(index, row) {
      this.loading = true
      // console.log(this.tableData[index].roles)
      var _this = this.backData
      _this = this.tableData[index]
      // console.log('准备要发送的信息:' + _this.id)
      JSON.stringify(_this)
      editRole(_this).then(response => {
        this.loading = false
        console.log(response.code)
        if (response.code === 200) {
          this.$message({
            message: '成功修改' + response.message + '用户的角色!',
            type: 'success'
          })
        } else {
          this.$message.error('修改用户角色错误,请联系管理员...')
        }
      })
    },
    handleDelete(index, row) {
      // console.log(index, row)
      const user = Object.assign({}, row)
      console.log(user)
      deleteUser(user.id).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '删除成功~',
            type: 'success'
          })
          this.loadData()
        } else {
          this.$message.error('删除错误,请联系管理员...')
        }
      })
    },
    loadData() {
      this.$store
        .dispatch('UsersRole')
        .then(response => {
          var d = response.data.list
          this.tableData = d
          this.loading = false
          console.log('UserRole' + this.tableData)
        })
        .catch(() => {})
    }
  }
}
</script>
