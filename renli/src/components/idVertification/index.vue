<template>
    <div class="main">
        <navbar></navbar>
        <idVertification></idVertification>
    </div>
</template>

<script>
import Navbar from '@/views/Dashboard/Navbar.vue'
import IdVertification from './idVertification.vue'
  export default {
    name: "dashboard",
    components: {Navbar, IdVertification},
    data () {
      return {
        user: ''
      }
    },
    mounted:function(){
      
    },
    methods:{
      
    }
  }
</script>

<style scoped>
  .main{
    display: flex;
    height: 100%;
    flex-direction: column;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }   
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    /* line-height: 200px; */
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    flex: 1;
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>