<template>
  <div class="main">
    <navbar></navbar>
    <el-container>
      <el-aside width="200px">
        <el-tree
          :data="constructData"
          :props="defaultProps"
          accordion
          @node-click="handleNodeClick"
        ></el-tree>
      </el-aside>
      <el-main>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane
            v-for="item in personnels"
            :key="item.name"
            :label="item.name"
            :name="item.activeName"
          >
            <el-table v-if="activeName == item.activeName " fixed :data="personnelList">
              <el-table-column
                v-for="item in personalColumns"
                :key="item.key"
                :prop="item.key"
                :label="item.title"
                width="110"
              ></el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="editClicked(scope.row)">业务办理</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
    <el-footer>Footer</el-footer>

    <div class="alertContainerDiv" v-show="isShow">
      <div class="alertDiv">
        <div class="alertHeaderDiv">
          <span>{{titleLabel}}</span>
          <i class="el-icon-close" @click="closeAlertView"></i>
        </div>
        <div class="bussinessList">
          <el-button
            v-for="item in businessList"
            :key="item.name"
            class="buttonStyle"
            @click="buttonClickedEvent(item.id)"
          >{{item.name}}</el-button>
        </div>
      </div>
    </div>

    <el-dialog title="业务办理" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item
          v-for="item in inputList"
          :key="item.key"
          :label="item.title"
          :label-width="'120px'"
        >
          <el-input v-if="item.type == 'string'" v-model="item.value" autocomplete="off"></el-input>
          <el-date-picker
            v-if="item.type == 'date'"
            v-model="item.value"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
          <!-- <el-input v-if="item.type == 'bool'" >
            <el-select
              v-if="item.type == 'bool'"
              v-model="item.value"
              slot="prepend"
              placeholder="在编情况"
            >
              <el-option label="在编" value="Yes"></el-option>
              <el-option label="不在编" value="No"></el-option>
            </el-select>
          </el-input> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitBtnEvent">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Navbar from "@/views/Dashboard/Navbar.vue";

var treeData = [];
var allData;
export default {
  name: "dashboard",
  components: { Navbar },
  data() {
    return {
      user: "",
      currentId: "", // 用来请求数据
      isShow: false, // 是否展示弹窗
      dialogFormVisible: false, //
      activeName: "1",
      titleLabel: "业务办理", // 业务办理
      businessList: [], // 需要办理的业务
      inputList: [], // 业务办理界面，要填写的字段
      personnels: [
        { name: "军官", activeName: "1" },
        { name: "士兵", activeName: "2" },
        { name: "文职人员", activeName: "3" },
        { name: "全部", activeName: "4" }
      ],
      personnelList: [], // 要展示的人员列表
      personalColumns: [
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
      ], // 人员列表表头
      constructData: treeData, // 树形结构数据
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created: function() {
    setTimeout(() => {
      allData = require("./unitData.json");
      treeData = allData.unitData;
      this.constructData = treeData;
    }, 2000);
  },
  methods: {
    // 军官、士兵、文职人员等选择
    handleClick(tab, event) {
      console.log(tab, event);
      console.log(this.currentId, this.activeName);
    },
    // 树形结构点击结点
    handleNodeClick(data) {
      this.currentId = data.id;
      let id = data.id;
      let element = require("./unitData.json");
      if (this.activeName == "1") {
        // 军官
        this.personnelList = element["junguan"];
      } else if (this.activeName == "2") {
        // 士兵
        this.personnelList = element["shibing"];
      } else if (this.activeName == "3") {
        // 文职人员
        this.personnelList = element["wenzhi"];
      } else if (this.activeName == "4") {
        // 所有人员
        this.personnelList = element[id];
      }
    },
    // 隐藏弹窗
    closeAlertView() {
      this.isShow = false;
    },
    // 编辑按钮点击事件
    editClicked(element) {
      console.log(element);
      if (this.activeName == "1") {
        // 军官业务办理
        this.titleLabel = "军官业务办理";
        this.businessList = [
          { name: "军官任职办理", id: "renzhi" },
          { name: "军官晋升军衔办理", id: "jinshengjunxian" },
          { name: "军官技术职务调整", id: "jishuzhiwutiaozheng" },
          { name: "军官晋升职务等级", id: "jinshengdengji" },
          { name: "军官晋升技术等级", id: "jinshengdengji" }
        ];
      } else if (this.activeName == "2") {
        // 士兵业务办理
        this.titleLabel = "士兵业务办理";
        this.businessList = [
          { name: "士兵任职办理", id: "renzhi" },
          { name: "士兵选取办理", id: "shibingxuanqu" },
          { name: "士兵晋升军衔办理", id: "jinshengjunxian" }
        ];
      } else if (this.activeName == "3") {
        // 文职人员业务办理
        this.titleLabel = "文职人员业务办理";
        this.businessList = [
          { name: "文职人员任职办理", id: "renzhi" },
          { name: "文职人员岗级调整", id: "wenzhigangjitiaozheng" }
        ];
      }
      this.isShow = true;
    },
    buttonClickedEvent(value) {
      this.isShow = false;
      this.dialogFormVisible = true; // 弹窗
      this.inputList = JSON.parse(JSON.stringify(allData[value])); // 深拷贝
    },
    // 确定按钮
    submitBtnEvent() {
      this.dialogFormVisible = false; // 隐藏弹窗
      console.log(this.inputList);
      // 将this.inputList 中value字段的值，传给服务器进行处理
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
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  /* line-height: 200px; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
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
.alertContainerDiv {
  width: 100%;
  height: 100%;
  background-color: rgba(100, 100, 100, 0.3);
  position: absolute;
  margin: auto;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.alertDiv {
  width: 350px;
  height: 350px;
  overflow-y: scroll;
  background-color: white;
  border-radius: 3px;
  overflow: hidden;
  overflow-y: scroll;
}
.alertHeaderDiv {
  width: 100%;
  height: 25px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(128, 128, 128, 0.295);
}
span {
  width: 320px;
  text-align: center;
}
.bussinessList {
  /* background-color: aquamarine; */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.buttonStyle {
  /* height: 30px; */
  width: 160px;
  margin-top: 10px;
}
.main >>> .el-dialog__body {
  /* height: 400px; */
  max-height: 400px;
  overflow-y: scroll;
}
.main >>> .el-select {
  width: 387px;
}

</style>