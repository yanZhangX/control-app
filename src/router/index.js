import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '@/layout'
import user from './modules/example'

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，则项目将不会显示在侧边栏中（默认为false）
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果未设置alwaysShow，则当项目具有多个子路由时，
 *                                它将成为嵌套模式，否则不显示root menu
 * redirect: noRedirect           如果设置为noRedirect，则breadcrumb中不会重定向
 * name:'router-name'             名称由<keep-alive>使用（必须设置！！！）
 * meta : {
    roles: ['admin','editor']    控制页面角色（可以设置多个角色)
    title: 'title'               侧边栏和面包屑中显示的名称（推荐设置）
    icon: 'svg-name'             侧栏显示icon
    noCache: true                如果设置为true，则不会缓存该页（默认为false）
    affix: true                  如果设置为true，标签将粘贴在tags-view
    breadcrumb: false            如果设置为false，则该项将隐藏在breadcrumb中（默认为true）
    activeMenu: '/example/list'  如果设置path，sidebar将突出显示您设置的path
  }
 */

/**
 * constantRoutes
 * 没有权限要求的base page
 * 可以访问所有角色
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'standard', affix: true }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  user,
  // 404页面必须放在末尾！！！
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// 详情查看此处: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router
