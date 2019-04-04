const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  status: state => state.user.status,
  setting: state => state.user.setting,
  permissions: state => state.permission.permissions,
  menus: state => state.permission.menus
}
export default getters
