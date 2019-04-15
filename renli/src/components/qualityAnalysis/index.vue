<template>
  <div class="main">
    <navbar></navbar>
    <qualityAnalysis></qualityAnalysis>
  </div>
</template>

<script>
import Navbar from "@/views/Dashboard/Navbar.vue";
import QualityAnalysis from "./qualityAnalysis.vue";

export default {
  name: "dashboard",
  components: { Navbar, QualityAnalysis },
  data() {
    return {
      user: ""
    };
  },
  mounted: function() {},
  methods: {
    // - 点击节点：选择单位
    handleNodeClick(data, node, view) {
      console.log(data);
      console.log(node);
      console.log(view);
      this.pageTitle = node.label;
    },
    // 移除echarts实例
    beforeunloadHandler(e) {
      console.log("移除");
    }
  },
  destroyed() {
    this.beforeunloadHandler();
  }
};
</script>

<style scoped>
.main {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #fff;
  color: #333;
  padding: 0 !important;
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