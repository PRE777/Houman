const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  status: state => state.user.status,
  gw: state => state.gw.station
}
//vuex官方API提供了一个getters，和vue计算属性computed一样，
//来实时监听state值的变化(最新状态)，并把它也仍进Vuex.Store里面，具体看下面代码:
export default getters
