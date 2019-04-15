<template>
  <div class="wrap">
    <div class="header">
      <navbar></navbar>
    </div>
    <div class="main">
      <el-row :gutter="10">
        <el-col :span="19">
          <el-header height="600px" style="padding: 0px;">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-size: 16px;">人员信息展示</span>
              </div>
              <el-table :data="renyuanList" border style="width:100% ;height:500px">
                <el-table-column prop="date" label="序号" width="100"></el-table-column>
                <el-table-column prop="xingming" label="姓名" width="100"></el-table-column>
                <el-table-column prop="zhiwu" label="单位职务"></el-table-column>
                <el-table-column prop="baioqian" label="人才标签">
                  <template slot-scope>
                    <el-tag type="success" closable style="margin: 0px;">特殊人才</el-tag>
                  </template>
                </el-table-column>

              </el-table>
            </el-card>
          </el-header>
        </el-col>
        <el-col :span="5">
          <labels></labels>
        </el-col>
      </el-row>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Navbar from "@/views/Dashboard/Navbar.vue";
import Footer from "@/views/Dashboard/footer.vue";
import labels from "@/components/personDataSource/labelListEdit.vue";
export default {
  name: "label",
  components: { Navbar, Footer, labels },
  data() {
    return {
      user: "",
      name: "",
      danwei: "",
      currentPage4: 4,
      renyuanList: [
        {
          date: "2016-05-02",
          xingming: "王小虎",
          zhiwu: "上海市普陀区金沙江路 1518 弄",
          baioqian: "特殊人才"
        },
        {
          date: "2016-05-04",
          xingming: "王小虎",
          zhiwu: "上海市普陀区金沙江路 1517 弄",
          baioqian: "特殊人才"
        },
        {
          date: "2016-05-01",
          xingming: "王小虎",
          zhiwu: "上海市普陀区金沙江路 1519 弄",
          baioqian: "特殊人才"
        }
      ]
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style>
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 99%;
  height: 99%;
}
.el-card__body {
  padding: 10px;
}
.el-card__header {
  padding: 10px 20px;
  font-size: 12px;
  background-color: #bbbfcc29;
}
.el-col-4 {
  height: 483px;
}
.el-aside {
  height: 486px;
}
.el-main {
  height: 155px;
  padding: 0;
}
.el-tag {
  margin: 8px;
}
.el-input {
  width: 30%;
}
.el-input__inner {
  height: 30px;
}
.el-table {
  font-size: 12px;
}
</style>