/*
 * @Author: your name
 * @Date: 2020-11-03 22:27:01
 * @LastEditTime: 2020-12-10 22:36:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \control-app\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    redirect: '/formShow/formList'
  },
  {
    path: '/formShow',
    component: () => import('@/views/formShow/index.vue'),
    children: [
      {
        path: 'formList',
        name: 'formList',
        component: () => import('@/views/formShow/formList.vue'),
        meta: { title: '我的模板' }
      },
      {
        path: 'formAlready',
        name: 'formAlready',
        component: () => import('@/views/formShow/formAlready.vue'),
        meta: { title: '已提交表单' }
      }
    ]
  },
  {
    path: '/formInput',
    component: () => import('@/views/formShow/formInput.vue'),
    meta: { title: '填写表单' }
  },
  {
    path: '/formDetail',
    component: () => import('@/views/formShow/formDetail.vue'),
    meta: { title: '表单详情' }
  },
  {
    path: '/404',
    component: () => import('@/views/404')
  },
  // 404页面必须放在末尾！！！
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router
