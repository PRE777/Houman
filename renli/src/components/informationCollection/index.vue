<style>
.el-button + .el-button {
  margin-left: 0px;
}
</style>
<template>
  <div class="wrap">
    <div class="header">
      <navbar></navbar>
    </div>
    <div class="main">
      <div style="height:20px"></div>
      <el-row :gutter="10">
        <el-col :span="4">
          <el-card shadow="always" style="height:568px;text-align:centor">
            <ul style="list-style:none">
              <li>
                <el-tag style="width:100%;cursor:pointer;text-align:centor">配偶信息</el-tag>
              </li>
            </ul>
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card shadow="always" style="height:568px;overflow:auto">
            <persondata></persondata>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always" style="height:568px">
            <el-form :inline="true"  class="demo-form-inline" v-if="selectedPerson!=null">
              <el-form-item label="姓名">
                <el-input v-model="name" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="身份号">
                <el-input v-model="identity" size="mini"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" @click="onSubmit" style="width:200px">提交</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import persondata from "@/components/informationCollection/personDataTable";
import Navbar from "@/views/Dashboard/Navbar.vue";
import Footer from "@/views/Dashboard/footer.vue";

export default {
  name: "dashboard",
  components: {
    Navbar,
    Footer,
    persondata
  },
  data() {
    return {
      name:"",
      identity:"",
      selectedPerson:null
    };
  },
  created(){
    var that=this;
    this.$bus.$on("postPerson",function(person){
      that.selectedPerson=person;
    })
  },
  methods:{
    onSubmit:function(){

    }
  }
};
</script>