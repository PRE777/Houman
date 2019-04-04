<template>
  <div class="main">
    <navbar></navbar>
    <ExportFile
      :exportFileName="exportFileName"
      :isPagination="isPagination"
      :exportData="exportData"
      :exportColumns="exportColumns"
      :myHandleRepeatExprot="myRepeatExprot"
      ref="MyExportType"
    ></ExportFile>
  </div>
</template>

<script>
import Navbar from "@/views/Dashboard/Navbar.vue";
import ExportFile from "./exportFile.vue";
export default {
  name: "dashboard",
  components: { Navbar, ExportFile },
  data() {
    return {
      user: "",
      isPagination: false,
      exportData: [
        {
          num: "001",
          bianzhihao: "100",
          userId: 100001,
          name: "张三",
          bubie: "空空",
          zhiwumingcheng: "政委",
          xiangangweishijian: "2010-10-16",
          zhijijishijian: "团长 2013-10",
          junxianjishijian: "少校2011-12",
          birthDate: "1990-01-01",
          ruwushijian: "2008-9-9",
          jijishijian: "高级技工2011-10-10",
          native: "山东省烟台市莱山区xxx县xxx街道"
        },
        {
          num: "002",
          bianzhihao: "200",
          userId: 100002,
          name: "李四",
          bubie: "路路",
          zhiwumingcheng: "主任",
          xiangangweishijian: "2010-10-16",
          zhijijishijian: "营长 2013-10",
          junxianjishijian: "少尉2011-12",
          birthDate: "1994-01-01",
          ruwushijian: "2011-9-9",
          jijishijian: "高级司机2011-4-4",
          native: "山东省莱芜市莱山区xxx县xxx街道"
        },
        {
          num: "002",
          bianzhihao: "300",
          userId: 100003,
          name: "王五",
          bubie: "嗨嗨",
          zhiwumingcheng: "干事",
          xiangangweishijian: "2018-10-16",
          zhijijishijian: "团长 201-10",
          junxianjishijian: "少校2011-12",
          birthDate: "1980-01-01",
          ruwushijian: "2009-9-9",
          jijishijian: "高级技工2011-10-10",
          native: "山东省烟台市莱山区xxx县xxx街道"
        },
        {
          num: "004",
          bianzhihao: "400",
          userId: 100004,
          name: "马六",
          bubie: "海路",
          zhiwumingcheng: "局长",
          xiangangweishijian: "2010-10-16",
          zhijijishijian: "少将 2013-10",
          junxianjishijian: "少校2011-12",
          birthDate: "1978-01-01",
          ruwushijian: "2000-7-9",
          jijishijian: "高级技工2011-10-10",
          native: "山东省烟台市莱山区xxx县xxx街道"
        }
      ],
      exportColumns: [
        { key: "num", title: "序号" },
        { key: "bianzhihao", title: "编制号" },
        { key: "userId", title: "身份号" },
        { key: "name", title: "姓名" },
        { key: "bubie", title: "部别" },
        { key: "zhiwumingcheng", title: "职位名称" },
        { key: "xiangangweishijian", title: "现岗位时间" },
        { key: "zhijijishijian", title: "职级及时间" },
        { key: "junxianjishijian", title: "军衔及时间" },
        { key: "birthDate", title: "出生时间" },
        { key: "ruwushijian", title: "入伍时间" },
        { key: "jijishijian", title: "技级时间" },
        { key: "native", title: "籍贯" }
      ],
      exportFileName: ""
    };
  },
  methods: {
    async myRepeatExprot(name) {
      // 查询所有
      await this.geBTtResult(1);
      // 调用子组件的导出事件
      await this.$refs.MyExportType.exportFile(name);
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
</style>