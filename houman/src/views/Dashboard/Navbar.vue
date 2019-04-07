<template>
    <div class="navbar">
        <img src="../../assets/images/login/logo.png" alt="军事人力资源管理门户" style="margin-left:80px;">
        <div class="user">
            <span>欢迎您！</span>
            <img src="../../assets/images/login/athour.png" alt="用户头像">
            <span class="el-dropdown-link">{{user}}</span>
            <span class="el-dropdown-link">修改密码</span>
            <span class="el-dropdown-link" @click="logout"><i class="el-icon-circle-close end"></i>退出</span>
        </div>
    </div>
</template>

<script>
  export default {
    name: "navbar",
    data () {
      return {
        user: ''
      }
    },
    methods: {
      // 退出是清空sessionStorage信息
      logout () {
        sessionStorage.removeItem('routes')
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('menuData')
        this.$router.push('/login')
      }
    },
    created () {
      this.user = sessionStorage.getItem('user')
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar{
        height: 60px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        background:rgb(91, 140, 255);
        align-items: center;
    }
    .el-dropdown {
        vertical-align: top;
        color: aqua;
    }
    .user{
      display: flex;
      align-items: center;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 0;
    }
    .user > span{
      margin-right: 12px;
      display: block;
    }
    .user > img{
      margin-right: 12px;
      display: block;
    }
    .end{
      margin-right:7px;
      display: inline-block; 
    }
</style>