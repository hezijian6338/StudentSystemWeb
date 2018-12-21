<template>
  <div class="app-container">
    <el-row :gutter="28">
      <el-col :span="12">
        <div>
          <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;"/>
          <el-tree
            ref="tree2"
            :props="roleProps"
            :filter-node-method="filterNode"
            :data="data"
            node-key="id"
            show-checkbox
            class="filter-tree"
            default-expand-all
          />
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <el-input v-model="filterText1" placeholder="Filter keyword" style="margin-bottom:30px;"/>
          <el-tree
            ref="tree3"
            :props="roleProps1"
            :filter-node-method="filterNode1"
            :data="data1"
            node-key="id"
            show-checkbox
            class="filter-tree"
            default-expand-all
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterText: '',
      filterText1: '',
      data: [
        {
          'id': '1',
          'name': 'ROLE_ADMIN',
          'username': [
            {
              'id': 1,
              'name': 'admin'
            }
          ]
        },
        {
          'id': '2',
          'name': 'ROLE_USER',
          'username': [
            {
              'id': 2,
              'name': 'abel'
            }
          ]
        }
      ],
      data1: [
        {
          'name': 'ROLE_ADMIN',
          'permissions': [
            {
              'description': '所有权限',
              'id': null,
              'method': 'ALL',
              'name': 'ROLE_ALL',
              'pid': null,
              'url': '/**'
            }
          ]
        }
      ],
      roleProps: {
        label: function(data, node) {
          return data.name
        },
        children: 'username'
      },
      roleProps1: {
        label: function(data, node) {
          console.log(node)
          if (node.level === 1) {
            return data.name
          }
          if (node.level === 2) {
            return data.description + '----' + data.method
          }
        },
        children: 'permissions'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    },
    filterText1(val) {
      this.$refs.tree3.filter(val)
    }
  },
  mounted() {
    this.loadData()
    this.loadData1()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    filterNode1(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    loadRole(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'roles', username: [{ name: 'test' }] }])
      }
      if (node.level > 1) {
        return resolve([])
      }
      setTimeout(() => {
        var data = []
        this.$store
          .dispatch('RoleAll')
          .then(response => {
            var d = response.data
            console.log(d)
            resolve(d)
          })
          .catch(() => {})
        resolve(data)
      }, 500)
    },
    loadPermission(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'permission' }])
      }
      if (node.level > 1) {
        return resolve([])
      }
      setTimeout(() => {
        var data = []
        this.$store
          .dispatch('PermissionAll')
          .then(response => {
            var d = response.data
            console.log(d)
            resolve(d)
          })
          .catch(() => {})
        resolve(data)
      }, 500)
    },
    loadData() {
      this.$store
        .dispatch('RoleAll')
        .then(response => {
          var d = response.data
          this.data = d
          console.log('Role' + this.data)
        })
        .catch(() => {})
    },
    loadData1() {
      this.$store
        .dispatch('PermissionAll')
        .then(response => {
          var d1 = response.data
          this.data1 = d1
          console.log('permissions:' + this.data1)
        })
        .catch(() => {})
    }
  }
}
</script>

