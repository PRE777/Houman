import Vue from 'vue'
import Router from 'vue-router'
import Utils from '@/router/utils'
import Menus from '@/router/menus'

// 定义路由器列表
export const Routes = Utils.concat(Menus)

// 生成路由器
Vue.use(Router)
export default new Router({
  // mode: 'history',
  routes: Routes
})