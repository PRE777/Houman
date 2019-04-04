import request from '@/utils/request'

// 登录
export function loginByUsername (username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/api/security/login',
    method: 'post',
    params: data
  })
}
// 登出
export function logout () {
  return request({
    url: '/api/security/logout',
    method: 'post'
  })
}
//个人信息
export function getUserInfo () {
  return request({
    url: '/api/security/loginUserInfo',
    method: 'get'
  })
}

/**
 * 获取动态菜单栏目
 */
export function getMenus () {
  return request({
    url: '/api/security/user/menus',
    method: 'get'
  })
}
