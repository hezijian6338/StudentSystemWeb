<template>
  <div class="app-container">
    <el-table
      v-loading="loading"
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
      <el-table-column label="rolename" prop="name"/>
      <el-table-column label="permissions">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.permissions"
            value-key="id"
            multiple
            size="medium"
            style="margin-left: 20px;"
            placeholder="请赋予权限..."
            @change="findSelected"
          >
            <el-option
              v-for="(key) in permissions_list"
              :key="key.id"
              :label="key.name"
              :value="key"
            >
              <span style="float: left">{{ key.id }}</span>
              <span style="margin: 20px; font-size: 13px">{{ key.name }}</span>
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope" slot="header">
          <!-- <el-input
            v-model="search"
            size="mini"
          placeholder="输入关键字搜索"/>-->
          {{ loading }}
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Confirm</el-button>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.roles)">Delete</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { permissionRole, editPermission } from '@/api/roles'

export default {
  data() {
    return {
      loading: true,
      button_loading: false,
      tableData: [
        {
          id: 1,
          name: 'ROLE_ADMIN',
          permissions: [
            {
              description: '所有权限',
              id: 3,
              name: 'ROLE_ALL'
            }
          ]
        }
      ],
      backData: {
        id: 1,
        name: '',
        permissions: [
          {
            description: '',
            id: 1,
            name: ''
          }
        ]
      },
      search: '',
      permissions: [
        {
          description: '所有权限',
          id: 3,
          name: 'ROLE_ALL'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['permissions_list'])
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
      console.log(this.tableData[index].permissions)
      var _this = this.backData
      _this = this.tableData[index]
      console.log('准备要发送的信息:' + _this.id)
      JSON.stringify(_this)
      editPermission(_this).then(response => {
        console.log(response.code)
        if (response.code === 200) {
          this.loading = false
          this.$message({
            message: '成功修改' + response.message + '角色的权限!',
            type: 'success'
          })
        } else {
          this.$message.error('修改角色权限错误,请联系管理员...')
        }
      })
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    loadData() {
      permissionRole().then(response => {
        this.loading = false
        console.log(response.data.list)
        this.tableData = response.data.list
      })
    }
  }
}
</script>
