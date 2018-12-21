<template>
  <div class="app-container">
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="UserName" prop="username"/>
      <el-table-column label="Roles">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.roles"
            value-key="id"
            multiple
            collapse-tags
            size="medium"
            style="margin-left: 20px;"
            placeholder="请选择"
            @change="findSelected">
            <el-option
              v-for="(key) in roles_list"
              :key="key.id"
              :label="key.name"
              :value="key">
              <span style="float: left">{{ key.id }}</span>
              <span style="margin: 20px; font-size: 13px">{{ key.name }}</span>
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Confirm</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.roles)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { editRole } from '@/api/roles'

export default {
  data() {
    return {
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
      console.log(this.tableData[index].roles)
      var _this = this.backData
      _this = this.tableData[index]
      console.log('准备要发送的信息:' + _this.id)
      JSON.stringify(_this)
      editRole(_this).then(response => {
        console.log(response.code)
      })
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    loadData() {
      this.$store
        .dispatch('UsersRole')
        .then(response => {
          var d = response.data.list
          this.tableData = d
          console.log('UserRole' + this.tableData)
        })
        .catch(() => {})
    }
  }
}
</script>
