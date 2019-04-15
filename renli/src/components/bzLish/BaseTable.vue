<template>
  <div class="table">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="单位编制岗位" name="bianzhi">
        <el-container>
          <postgw></postgw>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="浮动岗位组管理" name="fudong">
        <el-container>
          <group></group>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="查看岗位/岗位组视图" name="shitu">
        <el-container>
            <viewgroup></viewgroup>
        </el-container>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import postgw from "./post.vue";
import group from "./group.vue";
import viewgroup from "./view.vue";
export default {
  name: "basetable",
  components: { postgw, group,viewgroup },
  props:['list'],
  data() {
    return {
      activeName:'bianzhi'
    };
  },
  watch: {
   
  },
  created() {
    
  },
  computed: {
    
  },
  methods: {
    //tabs切换
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style scoped>
.flexs {
  display: flex;
  flex-wrap: wrap;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.flex .el-form-item {
  flex: 1;
  margin-right: 10px;
}
.title {
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  height: 100%;
  font-size: 14px;
  background: #f9f9f9;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.container {
  border: 1px solid #ddd;
  border-radius: 5px;
}
.pagination {
  position: fixed;
  bottom: 10px;
}
.el-container {
  flex-direction: column;
  margin: 0 20px;
}
.crumbs >>> .el-tabs__header {
  background: #ffffff;
  box-shadow: 2px 2px 4px 0 rgba(209, 209, 209, 0.5);
  margin: 0px;
}
.crumbs >>> .el-tabs--card > .el-tabs__header .el-tabs__item {
  border: 0px !important;
}
.crumbs >>> .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: 0px !important;
}
.crumbs >>> .el-tabs--card > .el-tabs__header {
  border: 0px !important;
}
.el-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.el-tabs >>> .el-tabs__content {
  overflow: scroll;
  margin-bottom: 50px;
}
.el-tabs >>> .el-tabs__content::-webkit-scrollbar {
  display: none;
}
.demo-ruleForm >>> .el-dialog__body {
  padding: 15px;
}
.demos-ruleForm {
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: #666666;
}
</style>
<style>
.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  border-bottom-color: #5c88f1 !important;
}
.el-tabs__header {
  margin: 0px;
}
.el-tabs__nav-scroll {
  background: #ffffff;
}
.el-tabs__header {
  box-shadow: 2px 2px 4px 0 rgba(209, 209, 209, 0.5);
}
.el-dropdown {
  display: inline-block;
  position: absolute;
  color: #606266;
  font-size: 14px;
  top: 50px;
  right: 45px;
}

/* 折叠 */
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

