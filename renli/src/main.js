import Vue from 'vue'

// element ui 相关引入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
// 权限控制---判断路由的情况
import '@/permission'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/index'
var Bus = new Vue();
Vue.prototype.$bus = Bus;
// 初始化element ui
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
