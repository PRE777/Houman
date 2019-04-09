<template>
  <div class="main">
    <navbar></navbar>
    <ImportFile @importDatas="getNewData"></ImportFile>
    <div class="contentDiv">
      <el-table v-model="tableData" :data="tableData" class="tableStyle">
        <el-table-column fixed prop="num" label="序号" width="100"></el-table-column>
        <el-table-column prop="bianzhihao" label="编制号" width="100"></el-table-column>
        <el-table-column prop="userId" label="身份号" width="120"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="bubie" label="部别" width="120"></el-table-column>
        <el-table-column prop="zhiwumingcheng" label="职务名称" width="120"></el-table-column>
        <el-table-column prop="xiangangweishijian" label="现岗位时间" width="120"></el-table-column>
        <el-table-column prop="zhijijishijian" label="军衔时间" width="120"></el-table-column>
        <el-table-column prop="birthDate" label="出生时间" width="120"></el-table-column>
        <el-table-column prop="ruwushijian" label="入伍时间" width="120"></el-table-column>
        <el-table-column prop="jijishijian" label="技级时间" width="120"></el-table-column>
        <el-table-column prop="native" label="籍贯" width="200"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Navbar from "@/views/Dashboard/Navbar.vue";
import ImportFile from "./importFile.vue";
export default {
  name: "dashboard",
  components: { Navbar, ImportFile },
  data() {
    return {
      user: "",
      tableData: []
    };
  },
  mounted() {},
  methods: {
    getNewData(value) {
      this.tableData = value;
    }
  }
};
</script>

<style scoped>
.main {
  display: flex;
  height: 100%;
  flex-direction: column;
}

body > .el-container {
  flex: 1;
  margin-bottom: 40px;
}
.contentDiv {
  width: 100%;
  height: 100%;
  background-color: brown;
}
.tableStyle {
  width: 100%;
  height: 100%;
  min-height: 250px;
  /* bottom: 100px; */
}
</style>