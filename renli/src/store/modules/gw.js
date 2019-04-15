const gw = {
  //要设置的全局访问的state对象
  state: {
    station:'',
  },
  //mutations的做用  
  //光有定义的state的初始值，不改变它不是我们想要的需求，
  //接下来要说的就是mutations了，mutattions也是一个对象，
  //这个对象里面可以放改变state的初始值的方法，
  //具体的用法就是给里面的方法传入参数state或额外的参数,
  //然后利用vue的双向数据驱动进行值的改变，同样的定义好之后也把这个mutations扔进Vuex.Store里面
  mutations: {
    //创建参数
    SET_SATION: (state, token) => {
      state.station = token
    },
  },
  actions: {
    
  }
}

export default gw
