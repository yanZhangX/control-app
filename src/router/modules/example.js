import Layout from '@/layout'

const userRouter = {
  path: '/example',
  component: Layout,
  redirect: '/example/index',
  name: 'Table',
  meta: { title: '用户管理', icon: 'home' },
  children: [
    {
      path: 'index',
      component: () => import('@/views/example/index'),
      name: 'enjoyUser',
      meta: { title: '用户', icon: 'user' }
    },
    {
      path: 'about',
      name: 'about',
      component: () => import('@/views/about/index'),
      meta: { title: 'about', icon: 'dashboard' }
    }
  ]
}
export default userRouter
