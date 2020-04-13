import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  }
]

export const asyncRouterMap = [
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '角色权限控制', icon: 'manger', roles: ['ROLE_ALL'] },
    children: [
      // {
      //   path: 'table',
      //   name: 'Table',
      //   component: () => import('@/views/table/index'),
      //   meta: { title: 'Table', icon: 'table' }
      // },
      {
        path: 'editRole',
        name: 'EditRole',
        component: () => import('@/views/table/editRole'),
        meta: { title: '角色控制', icon: 'role' }
      },
      {
        path: 'editPermission',
        name: 'EditPermission',
        component: () => import('@/views/table/editPermission'),
        meta: { title: '权限控制', icon: 'permission' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '角色权限树', icon: 'tree' }
      },
      // {
      //   path: 'addUser',
      //   name: 'addUser',
      //   component: () => import('@/views/admin/createUser'),
      //   meta: { title: '添加用户', icon: 'tree', roles: ['ROLE_ALL'] }
      // },
      {
        path: 'addUser',
        name: 'AddUser',
        component: () => import('@/views/table/addUser'),
        meta: { title: '添加用户', icon: 'setup' }
      },
      {
        path: 'addUsers',
        name: 'AddUsers',
        component: () => import('@/views/table/addUsers'),
        meta: { title: '批量添加用户', icon: 'setup' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    name: 'Info',
    redirect: '/form/student',
    meta: { title: '学生信息', icon: 'monitor', roles: ['ROLE_STU'] },
    children: [
      // {
      //   path: '_index',
      //   name: 'Form',
      //   component: () => import('@/views/form/index'),
      //   meta: { title: 'Form', icon: 'form' }
      // },
      {
        path: 'student',
        name: 'student',
        component: () => import('@/views/form/student'),
        meta: { title: '学生个人信息', icon: 'bookmark' }
      },
      {
        path: 'selectCourses',
        name: 'selectCourses',
        component: () => import('@/views/form/selectCourses'),
        meta: { title: '学生选课', icon: 'notebook(1)' }
      },
      {
        path: 'selectedCourses',
        name: 'selectedCourses',
        component: () => import('@/views/form/selectedCourses'),
        meta: { title: '选课情况', icon: 'checklist' }
      },
      {
        path: 'selectGuidTeacher',
        name: 'selectGuidTeacher',
        component: () => import('@/views/form/selectGuidTeacher'),
        meta: { title: '选择导学老师', icon: 'group' }
      },
      {
        path: 'selectedGuidTeacher',
        name: 'selectedGuidTeacher',
        component: () => import('@/views/form/selectedGuidTeacher'),
        meta: { title: '导学老师', icon: 'conversation' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    name: 'Info',
    redirect: '/form/teaInfo',
    meta: { title: '老师信息', icon: 'monitor', roles: ['ROLE_TEA'] },
    children: [
      {
        path: 'teaInfo',
        name: 'teaInfo',
        component: () => import('@/views/form/teachers'),
        meta: { title: '老师信息', icon: 'conversation' }
      },
      {
        path: 'confirmStudent',
        name: 'confirmStudent',
        component: () => import('@/views/form/confirmStudent'),
        meta: { title: '导学学生', icon: 'conversation' }
      }
    ]
  },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
