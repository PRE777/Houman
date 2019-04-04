import router from '@/router'
import { getToken } from '@/utils/auth' // getToken from cookie
// import { checkRoutePermission } from '@/utils/permission'

router.beforeEach((to, from, next) => {
  console.log(to)
  let isLogin = sessionStorage.getItem('user')
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if(isLogin) {
      next({ path: '/index' })
    } else {
      next()
    }
  } else {
    // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
    if (!isLogin) {
      next({ path: '/login' })
    } else {
      // 加载动态菜单和路由
      //addDynamicMenuAndRoutes()
      next()
    }
  }
})

router.afterEach(() => {

})
