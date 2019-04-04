/* 这里配置基础页面 */
 export default [
  {
    path: '/login',
    component: () => import('@/views/Utils/Login')
  },
  {
    path: '/404',
    component: () => import('@/views/Utils/Error/404')
  },
  {
    path: '/401',
    component: () => import('@/views/Utils/Error/401')
  },
  { path: '*', redirect: '/404' }
]
