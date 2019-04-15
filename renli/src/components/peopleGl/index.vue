<template>
    <div class="wrap">
        <div class="header">
          <navbar></navbar>
        </div>
        <div class="sidebar">
          <ul class="list">
            <li>人员注册</li>
          </ul>
        </div>
        <div class="content-box">
          <div class="rightContent">
              <div class="crumbs">
              当前位置 (人员注册)
          </div>
          <el-form ref="form" :model="form" label-width="80px" class="fromClass">
            <el-form-item label="姓名" >
              <el-input v-model="form.name" :span="11"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="form.age"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="form.numbers"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="家庭住址">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="人员身份">
              <el-select v-model="form.region" placeholder="请选择">
                <el-option label="文艺" value="shanghai"></el-option>
                <el-option label="士兵" value="beijing"></el-option>
                <el-option label="干部" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="政治面貌">
              <el-radio-group v-model="form.resources">
                <el-radio label="团员"></el-radio>
                <el-radio label="党员"></el-radio>
                <el-radio label="群众"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.resource">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">注册</el-button>
            </el-form-item>
          </el-form>
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
    font-size: 16px;
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