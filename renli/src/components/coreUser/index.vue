<template>
    <div class="wrap">
        <div class="header">
          <navbar></navbar>
        </div>
        <div class="sidebar">
          <ul class="list">
            <li @click="register">用户注册</li>
            <li @click="off">用户注销</li>
          </ul>
        </div>
        <div class="content-box">
          <div class="rightContent">
            <router-view/>
          </div>
        </div>
       
    </div>
</template>

<script>
import Navbar from '@/views/Dashboard/Navbar.vue'
  export default {
    name: "dashboard",
    components: {Navbar},
    data() {
      return {
        form: {
          name: '',
          address:'',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          phone:'',
          resources:'',
          numbers:'',
          desc: '',
          age:''
        }
      }
    },
    created: function () {
       
    },
    watch: {
      
    },
    methods:{
      // 注册
      register(){
        this.$router.push('/coreUser/register')
      },
      off(){
        this.$router.push('/coreUser/off')
      },
      onSubmit() {
        console.log('submit!');
      }
    }
      
  }
</script>

<style scoped>
  .wrap{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .header{
      position: relative;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 100%;
      height: 0px;
      font-size: 22px;
      color: #fff;
  }
  .sidebar{
      display: block;
      position: absolute;
      left: 0;
      top: 60px;
      bottom: 0px;
      width: 200px;
      background: #384770;
  }
  .content-box {
      position: absolute;
      left: 200px;
      right: 0;
      top: 60px;
      bottom: 0px;
      -webkit-transition: left .3s ease-in-out;
      transition: left .3s ease-in-out;
      background: #f0f0f0;
  }
  .rightContent{
    width: auto;
    height: 100%;
    overflow-y: scroll;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .rightContent::-webkit-scrollbar{
    display: none;
  }
  .list{
    width: 200px;
  }
  .list li{
    width: 200px;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    color: aliceblue;
    text-align: center;
    box-sizing: border-box;
    background: #384770;
  }
  .list li:hover{
    width: 200px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: aliceblue;
    text-align: center;
    box-sizing: border-box;
    background:#5C88F1;
  }
  .fromClass{
    margin: 20px;
  }
</style>