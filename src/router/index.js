/*
 * @Author: your name
 * @Date: 2020-11-03 22:27:01
 * @LastEditTime: 2020-11-15 10:04:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \control-app\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'

// import user from './modules/example'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    redirect: '/formShow/0'
  },
  {
    path: '/formShow/:mode',
    component: () => import('@/views/formShow/index.vue')
  },
  {
    path: '/formInput',
    component: () => import('@/views/formShow/formInput.vue')
  },
  {
    path: '/formDetail',
    component: () => import('@/views/formShow/formDetail.vue')
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
