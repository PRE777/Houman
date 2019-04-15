<template>
    <div class="wrap">
        <div class="header">
          <navbar></navbar>
        </div>
        <div class="sidebar">
          <ul class="list">
            <li>人员岗位信息检索</li>
          </ul>
        </div>
        <div class="content-box">
              
          <div class="rightContent">
            <div class="crumbs">
              当前位置 (人员岗位信息检索)
            </div>
            <BaseTable></BaseTable>
          </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/views/Dashboard/Navbar.vue'
import BaseTable from './BaseTable.vue'
  export default {
    name: "dashboard",
    components: {Navbar,BaseTable},
    data() {
      return {
       
      }
    },
    methods:{
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
  .fromClass{
    margin: 0 20px;
    box-shadow: 50%;
    margin-top: 69px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
  }
  .crumbs{
        top: 0px;
        width: 100%;
        height: 48px;
        background: #FFFFFF;
        box-shadow: 2px 2px 4px 0 rgba(209,209,209,0.50);
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #5173A8;
        line-height: 48px;
        padding-left: 30px;
        box-sizing: border-box;
        position: absolute;
        z-index: 222;   
    }
</style>