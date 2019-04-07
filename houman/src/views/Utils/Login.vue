<template>
    <div id="bg">
      <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
          <span class="tool-bar"></span>
          <h2 class="title" style="padding-left:10px;">
            <img src="../../assets/images/login/renlizy.png" alt="">
          </h2>
          <el-form-item prop="account">
            <p class="name">账号</p>
            <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <p class="name">密码</p>
            <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
          </el-form-item>
          <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
          <el-form-item style="width:100%;">
            <el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button>
            <el-button type="primary" style="width:48%;" @click.native.prevent="login" :loading="loading">登 录</el-button>
          </el-form-item>
        </el-form>
    </div>
  </template>
  <script>
  import { mapState } from 'vuex'
  import Cookies from "js-cookie"
  export default {
    name: 'Login',
    data() {
      return {
        loading: false,
        loginForm: {
          account: '',
          password: '',
          captcha:'',
          src: ''
        },
        fieldRules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        checked: true
      }
    },
    methods: {
      login() {
        this.loading = true
        let userInfo = {account:this.loginForm.account, password:this.loginForm.password, captcha:this.loginForm.captcha}
        console.log(userInfo)
        // 模拟接口-----动态生成路由，
        console.log(this.loginForm.account)
        if( this.loginForm.account == "admin" ){
          Cookies.set('token', 'dongzhiquan') // 放置token到Cookie
          sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话
          // 要求重新加载导航菜单----这里是关键
          //this.$store.commit('menuRouteLoaded', false) 
          //console.log(this.$router.go(-1)) //返回上一页
          console.log(this.$route.query.redirect)
          if( this.$route.query.redirect == '/404' ){
            this.$router.push('/index')
          }else{
            this.$route.query.redirect
              ? this.$router.push(this.$route.query.redirect)
              : this.$router.push('/index');
          }
        }else if(this.loginForm.account == "admin1"){
          Cookies.set('token', 'dongzhiquan') // 放置token到Cookie
          sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话
          // 要求重新加载导航菜单----这里是关键
          //this.$store.commit('menuRouteLoaded', false) 
          this.$router.push('/index') // 登录成功，跳转到主页
        }else{
          this.$message({
            message: '没有相关用户',
            type: 'error'
          })
        }
        
        // this.$api.login.login(userInfo).then((res) => {
        //     if(res.msg != null) {
        //       this.$message({
        //         message: res.msg,
        //         type: 'error'
        //       })
        //     } else {
        //       Cookies.set('token', res.data.token) // 放置token到Cookie
        //       sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话
        //       this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
        //       this.$router.push('/')  // 登录成功，跳转到主页
        //     }
        //     this.loading = false
        //   }).catch((res) => {
        //     this.$message({
        //     message: res.message,
        //     type: 'error'
        //     })
        //   });
      },
      // refreshCaptcha: function(){
      //   this.loginForm.src = this.global.baseUrl + "/captcha.jpg?t=" + new Date().getTime();
      // },
      reset() {
        this.$refs.loginForm.resetFields()  //清空表单的意思
      },
      // // 切换主题
      // onThemeChange: function(themeColor) {
      //   this.$store.commit('setThemeColor', themeColor)
      // }
    },
    mounted() {
      // this.refreshCaptcha()
    },
    computed:{
      // ...mapState({
      //   themeColor: state=>state.app.themeColor
      // })
    }
  }
  </script>
  
  <style lang="scss" scoped>
    #bg{
      width: 100%;
      height: 100%;
      background: url('../../assets/images/login/bg.png');
      background-size:100% 100%; 
    }
    .name{
      text-align: start;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #999999;
    }
    .login-container {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      -webkit-border-radius: 5px;
      border-radius: 5px;
      -moz-border-radius: 5px;
      background-clip: padding-box;
      width: 350px;
      padding: 35px 35px 15px 35px;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
      background: #FFFFFF;
      .title {
        margin: 0px auto 30px auto;
        text-align: center;
        color: #505458;
      }
      .remember {
        margin: 0px 0px 35px 0px;
      }
    }
  </style>