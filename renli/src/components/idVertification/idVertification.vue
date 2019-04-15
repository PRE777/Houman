<template>
  <div id="idVertification">
    <div id="page-title">人员身份图形界面验证</div>
    <!-- 身份号 -->
    <div class="container">
      <span>身份号：</span>
      <input type="text" id="jobID">
    </div>

    <!-- 身份证号 -->
    <div class="container">
      <span>身份证号：</span>
      <input type="text" id="cardID">
    </div>

    <!-- 查询 -->
    <input type="button" id="query" value="查询" @click="queryButtonEvent">

    <!-- 查询结果 -->
    <div class="container" v-show="Array.isArray(personData) && personData.length !== 0">
      <el-table :data="personData" border style="width: 90%">
        <el-table-column prop="department" label="姓名"></el-table-column>
        <el-table-column prop="jobID" label="身份号"></el-table-column>
        <el-table-column prop="cardID" label="身份证号"></el-table-column>
        <el-table-column prop="category" label="身份类别"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

import echarts from "echarts";
export default {
  name: "idVertification",
  data() {
    return {
      personData: [
        // {
        //   department: "王大治",
        //   jobID: "1234567",
        //   cardID: "110181198702302235",
        //   category: "空军"
        // }
      ]
    };
  },
  methods: {
    //      var emptyEle = document.getElementsByClassName('el-table__empty-text')[0];
    // emptyEle.innerHTML = "查无此人信息";
    queryButtonEvent: function() {
      var jobIDStr = document.getElementById("jobID").value;
      var cardIDStr = document.getElementById("cardID").value;
      alert(jobIDStr);
      alert(cardIDStr);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url("../../assets/css/idVertification.css");
</style>

