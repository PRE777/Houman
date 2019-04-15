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
        <el-col :span="5">
          <el-card shadow="always" style="height:568px">
            <orgtree></orgtree>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always" style="height:568px;overflow:auto">
            <personList></personList>
          </el-card>
        </el-col>
        <el-col :span="14">
          <el-card class="box-card" style="width:47%;float:left;margin-right:20px">
            <div slot="header" class="clearfix">
              <span>培训经历</span>
            </div>
            <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
          </el-card>
          <el-card class="box-card" style="width:47%;float:left">
            <div slot="header" class="clearfix">
              <span>入伍后简历</span>
            </div>
            <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
          </el-card>
          <div style="height:20px;clear:both"></div>
          <el-card class="box-card" style="width:47%;float:left;margin-right:20px">
            <div slot="header" class="clearfix">
              <span>社会关系</span>
            </div>
            <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
          </el-card>
          <el-card class="box-card" style="width:47%;float:left;margin-right:20px">
            <div slot="header" class="clearfix">
              <span>奖惩信息</span>
            </div>
            <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
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
import orgtree from "@/components/personDataSource/organization_tree.vue";
import personList from "@/components/statementOutput/personList.vue";
import Navbar from "@/views/Dashboard/Navbar.vue";
import Footer from "@/views/Dashboard/footer.vue";
//import pluginExport from '@d2-projects/vue-table-export'
//import pluginImport from '@d2-projects/vue-table-import'

export default {
  name: "mingce",
  components: {
    Navbar,
    Footer,
    orgtree,
    personList
  },
  data() {
    return {};
  },
  methods: {}
};
</script>