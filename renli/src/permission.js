import router from '@/router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
NProgress.configure({ showSpinner: false })// NProgress Configuration
router.beforeEach((to, from, next) => {
  let isLogin = sessionStorage.getItem('user')
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if(isLogin) {
      next({ path: '/index' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
    if (!isLogin) {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      //next({ path: '/login' })
      NProgress.done()
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

router.afterEach(() => {

})
