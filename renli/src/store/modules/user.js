import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
const user = {
  //要设置的全局访问的state对象
  state: {
    user: '',
    status: '',
    token: getToken(),
    name: '',
    avatar: '',
    userID:'',
    introduction: '',
    setting: {
      articlePlatform: []
    }
  },
  //mutations的做用  
  //光有定义的state的初始值，不改变它不是我们想要的需求，
  //接下来要说的就是mutations了，mutattions也是一个对象，
  //这个对象里面可以放改变state的初始值的方法，
  //具体的用法就是给里面的方法传入参数state或额外的参数,
  //然后利用vue的双向数据驱动进行值的改变，同样的定义好之后也把这个mutations扔进Vuex.Store里面
  mutations: {
    //创建权限
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    //创建名字
    SET_NAME: (state, name) => {
      state.name = name
    },
    //创建用户头像
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    //创建用户的唯一ID
    SET_USER_ID: (state, avatar) => {
      state.userID = userID
    }
  },
  actions: {
    // 用户名登录
    LoginByUsername ({ commit, dispatch }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        const data = {
          'token':'token',
        }
        commit('SET_TOKEN', data.token)
        setToken(response.data.token)
        resolve()
        //loginByUsername(username, userInfo.password).then(response => {
        //  const data = response.data
        //  commit('SET_TOKEN', data.token)
        //  setToken(response.data.token)
        //  resolve()
        //}).catch(error => {
        //  reject(error)
        //})
      })
    },
    // 获取用户信息
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject(new Error('error'))
          }
          const data = response.data
          commit('SET_NAME', data.name)
          commit('SET_USER_ID', data.userID)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
          commit('SET_TOKEN', '')
          commit('RESET_PERMISSION')
          removeToken()
          resolve()
        //logout(state.token).then(() => {
        //  commit('SET_TOKEN', '')
        //  commit('RESET_PERMISSION')
        //  removeToken()
        //  resolve()
        //}).catch(error => {
        //  reject(error)
        //})
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('RESET_PERMISSION')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
