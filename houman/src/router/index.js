import Vue from 'vue'
import Router from 'vue-router'
import Utils from '@/router/utils'
import Menus from '@/router/menus'

// 定义路由器列表
export const Routes = Utils.concat(Menus)

console.log(Routes)
// // 自动生成路由name
// function autoGenerateRouterName (routes) {
//   routes.forEach(router => {
//     if (router.name === undefined) {
//       router.name = router.path.replace(/\W/g, '')
//     }
//     if (router.children instanceof Array) {
//       console.log(router.children)
//       console.log(router)
//       autoGenerateRouterName(router.children)
//     }
//   })
// }
// autoGenerateRouterName(Routes)

// 生成路由器
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: Routes
})