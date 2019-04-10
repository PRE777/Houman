<template>
  <div class="main">
    <navbar></navbar>
    <ImportFile :headerColumns="importDataColumns" @importDatas="getNewData"></ImportFile>
    <div class="contentDiv">
      <el-table fixed v-model="tableData" :data="tableData" class="tableStyle" >
        <el-table-column
          v-for="item in importDataColumns"
          :key="item.key"
          :prop="item.key"
          :label="item.title"
          width="120"
        ></el-table-column>
      </el-table>
      
      <div style="width:100%;height:100px;"></div>
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
      // 导入数据表头
      importDataColumns: [],
      tableData: []
    };
  },
  mounted() {
    // 模拟请求数据
    setTimeout(() => {
      this.importDataColumns = [
        { key: "zhiwumingcheng", title: "职务名称", value: "" },
        { key: "shenfenleibie", title: "身份类别", value: "" },
        { key: "zhiwudengji", title: "职务等级", value: "" },
        { key: "zhuleibiema", title: "主类别码", value: "" },
        { key: "xiangleibiema", title: "详类别码", value: "" },
        { key: "bianzhiyuane", title: "编制员额", value: "" },
        { key: "xiabianminglinghao", title: "下遍命令号", value: "" },
        { key: "xiabianminglingshijian", title: "下遍命令时间", value: "" },
        { key: "qisuanshijian", title: "起算时间", value: "" }
      ];
    }, 1000);
  },
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
  /* background-color: brown; */
  overflow: hidden;
  overflow-y: scroll;
}
.tableStyle {
  width: 100%;
  /* height: 100%; */
  min-height: 100px;
  /* bottom: 100px; */
}
</style>