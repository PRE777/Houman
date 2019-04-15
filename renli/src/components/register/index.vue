<template>
    <div>
      <div class="crumbs">
            当前位置  (用户注册)
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
          <el-form-item label="人员类别">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="士兵" value="0"></el-option>
              <el-option label="干部" value="1"></el-option>
              <el-option label="文艺" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="创建日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
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
          <el-form-item label="用户简介">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">注册</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    name: "dashboard",
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

      },
      off(){

      },
      onSubmit() {
        console.log('submit!');
      }
    }
      
  }
</script>

<style scoped>
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