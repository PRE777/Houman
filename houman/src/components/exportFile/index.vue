<template>
  <div class="main">
    <navbar></navbar>
    <el-container>
      <div class="containerDiv">
        <div class="personInfoExportDiv">
          <ExportFile
            :exportFileName="exportFileName"
            :isPagination="isPagination"
            :exportData="personalInfo"
            :exportColumns="personalInfoColumns"
            :myHandleRepeatExprot="myRepeatExprot"
            ref="MyExportType"
          ></ExportFile>
          <!-- 个人信息表 -->
          <div class="personalInfoTable">
            <el-table v-model="personalInfo" :data="personalInfo" max-height="150px">
              <el-table-column
                v-for="item in personalInfoColumns"
                :key="item.key"
                :prop="item.key"
                :label="item.title"
                width="110"
              ></el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 个人信息编辑 -->
        <div class="personInfoEditDiv">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="著述信息" name="1">
              <el-table fixed :data="writingInfos">
                <el-table-column
                  v-for="item in writingInfoColums"
                  :key="item.key"
                  :prop="item.key"
                  :label="item.title"
                  width="110"
                ></el-table-column>
                <el-table-column fixed="right" label="操作">
                  <template slot-scope="scope">
                    <el-button @click="removeWritingInfo(scope.$index)" type="text" size="small">删除</el-button>
                    <!-- <el-button
                      @click="editWritingInfo(scope.$index,scope.row)"
                      type="text"
                      size="small"
                    >编辑</el-button>-->
                  </template>
                </el-table-column>
              </el-table>
              <el-button @click="addPersonInfo">新增</el-button>
            </el-tab-pane>
            <el-tab-pane label="科技奖励信息" name="2">
              <el-table :data="technologyAwardInfos">
                <el-table-column
                  v-for="item in technologyAwardColums"
                  :key="item.key"
                  :prop="item.key"
                  :label="item.title"
                  width="110"
                ></el-table-column>
                <el-table-column fixed="right" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="removetechnologyAwardInfo(scope.$index)"
                      type="text"
                      size="small"
                    >删除</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button @click="addPersonInfo">新增</el-button>
            </el-tab-pane>
            <el-tab-pane label="发明专利信息" name="3">该模块正在开发中，敬请期待……</el-tab-pane>
            <el-tab-pane label="社会关系信息" name="4">
              <el-table :data="socialRelations" max-height="300">
                <el-table-column
                  v-for="item in socialRelationColums"
                  :key="item.key"
                  :prop="item.key"
                  :label="item.title"
                  width="110"
                ></el-table-column>
                <el-table-column fixed="right" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="removeSocialRelation(scope.$index)"
                      type="text"
                      size="small"
                    >删除</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button @click="addPersonInfo">新增</el-button>
            </el-tab-pane>
            <el-tab-pane label="地方工作情况" name="5">该模块正在开发中，敬请期待……</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-container>
    <el-footer>Footer</el-footer>

    <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item
          v-for="item in dialogFormColumns"
          :key="item.key"
          :label="item.title"
          :label-width="formLabelWidth"
        >
          <el-input autocomplete="off" v-model="item.value"></el-input>
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
import ExportFile from "./exportFile.vue";
export default {
  name: "dashboard",
  components: { Navbar, ExportFile },
  data() {
    return {
      user: "",
      isPagination: false,
      activeName: "1",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      dialogFormData: {},
      dialogFormTitle: "",
      dialogFormColumns: [],
      personalInfo: [
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
        }
      ],
      personalInfoColumns: [
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
      exportFileName: "",
      // 著述信息
      writingInfos: [
        {
          writingName: "《论扯淡的重要性》", // 文著名称
          signatureLocation: "北京大学大数据研究中心", //署名地址
          publishedTime: "2010年10月12日", // 发表时间
          publishOccasion: "全国xxx科技大会", // 发表场合
          journals: "中国人民日报,新华日报", // 刊载物
          journalTime: "2010年第32版", // 刊载时间
          profit: "国家科技奖励100万人民币", // 获利情况
          id: "W_001" // 唯一标识符
        },
        {
          writingName: "《肖申克的救赎》", // 文著名称
          signatureLocation: "北京人民大学文学院", //署名地址
          publishedTime: "2001年01月08日", // 发表时间
          publishOccasion: "全国文学大会", // 发表场合
          journals: "中国人民日报", // 刊载物
          journalTime: "2002年第12版", // 刊载时间
          profit: "文山学院奖励50万人民币", // 获利情况
          id: "W_001" // 唯一标识符
        },
        {
          writingName: "《论扯淡的重要性》", // 文著名称
          signatureLocation: "北京大学大数据研究中心", //署名地址
          publishedTime: "2010年10月12日", // 发表时间
          publishOccasion: "全国xxx科技大会", // 发表场合
          journals: "中国人民日报,新华日报", // 刊载物
          journalTime: "2010年第32版", // 刊载时间
          profit: "国家科技奖励100万人民币", // 获利情况
          id: "W_001" // 唯一标识符
        },
        {
          writingName: "《肖申克的救赎》", // 文著名称
          signatureLocation: "北京人民大学文学院", //署名地址
          publishedTime: "2001年01月08日", // 发表时间
          publishOccasion: "全国文学大会", // 发表场合
          journals: "中国人民日报", // 刊载物
          journalTime: "2002年第12版", // 刊载时间
          profit: "文山学院奖励50万人民币", // 获利情况
          id: "W_001" // 唯一标识符
        },
        {
          writingName: "《论扯淡的重要性》", // 文著名称
          signatureLocation: "北京大学大数据研究中心", //署名地址
          publishedTime: "2010年10月12日", // 发表时间
          publishOccasion: "全国xxx科技大会", // 发表场合
          journals: "中国人民日报,新华日报", // 刊载物
          journalTime: "2010年第32版", // 刊载时间
          profit: "国家科技奖励100万人民币", // 获利情况
          id: "W_001" // 唯一标识符
        },
        {
          writingName: "《肖申克的救赎》", // 文著名称
          signatureLocation: "北京人民大学文学院", //署名地址
          publishedTime: "2001年01月08日", // 发表时间
          publishOccasion: "全国文学大会", // 发表场合
          journals: "中国人民日报", // 刊载物
          journalTime: "2002年第12版", // 刊载时间
          profit: "文山学院奖励50万人民币", // 获利情况
          id: "W_001" // 唯一标识符
        }
      ],
      writingInfoColums: [
        { key: "writingName", title: "文著名称", value: "" },
        { key: "signatureLocation", title: "署名地址", value: "" },
        { key: "publishedTime", title: "发表时间", value: "" },
        { key: "publishOccasion", title: "发表场合", value: "" },
        { key: "journals", title: "刊载物", value: "" },
        { key: "journalTime", title: "刊载时间", value: "" },
        { key: "profit", title: "获利情况", value: "" }
      ],
      // 科技奖励
      technologyAwardInfos: [
        {
          awardTime: "2010-09-22", // 获奖时间
          projectName: "xxxxxx", // 项目名称
          projectCodeId: "xxxxxx", // 项目代号
          award: "荣誉证书", // 科技奖励
          number: "第一名", // 获奖名次
          certificateID: "10092323", // 证书号
          id: "T_001" // 唯一标识符
        }
      ],
      technologyAwardColums: [
        { key: "awardTime", title: "获奖时间", value: "" },
        { key: "projectName", title: "项目名称", value: "" },
        { key: "projectCodeId", title: "项目代号", value: "" },
        { key: "award", title: "科技奖励", value: "" },
        { key: "number", title: "获奖名次", value: "" },
        { key: "certificateID", title: "证书号", value: "" }
      ],
      // 专利信息
      patentInfos: [],
      patentColums: [{}, {}],
      // 社会关系
      socialRelations: [
        {
          name: "周星星", // 关系人姓名
          relation: "兄弟", // 关系
          identity: "喜剧演员", // 关系人身份
          gender: "男", // 关系人性别
          birthday: "1968年11月11日", //出生时间
          politicalLandscape: "群众", // 政治面貌
          uint: "周星星影业", //单位
          address: "香港九龙" //现住址
        }
      ],
      socialRelationColums: [
        { key: "name", title: "关系人姓名", value: "" },
        { key: "relation", title: "关系", value: "" },
        { key: "identity", title: "关系人身份", value: "" },
        { key: "gender", title: "关系人性别", value: "" },
        { key: "birthday", title: "出生时间", value: "" },
        { key: "politicalLandscape", title: "政治面貌", value: "" },
        { key: "uint", title: "现单位" },
        { key: "address", title: "现住址", value: "" }
      ]
    };
  },
  methods: {
    async myRepeatExprot(name) {
      // 查询所有
      await this.geBTtResult(1);
      // 调用子组件的导出事件
      await this.$refs.MyExportType.exportFile(name);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 删除著述信息
    removeWritingInfo(index) {
      console.log(index);
      this.writingInfos.splice(index, 1);
    },
    // // 编辑著述信息
    // editWritingInfo(index, element) {
    //   this.dialogFormVisible = true;
    //   this.dialogFormData = element;
    //   this.dialogFormColumns = this.writingInfoColums;
    // },
    // 删除个人科技信息
    removetechnologyAwardInfo(index) {
      console.log(index);
      this.technologyAwardInfos.splice(index, 1);
    },
    // 删除社会关系信息
    removeSocialRelation(index) {
      console.log(index);
      this.socialRelations.splice(index, 1);
    },
    // 增加个人信息
    addPersonInfo() {
      switch (this.activeName) {
        case "1":
          // 著述信息
          this.dialogFormColumns = JSON.parse(
            JSON.stringify(this.writingInfoColums)
          ); // 深拷贝
          // this.dialogFormColumns = this.writingInfoColums;
          this.dialogFormVisible = true;
          this.dialogFormTitle = "新增著述信息";
          break;
        case "2":
          // 科技奖励信息
          this.dialogFormColumns = JSON.parse(
            JSON.stringify(this.technologyAwardColums)
          );
          this.dialogFormVisible = true;
          this.dialogFormTitle = "新增科技奖励信息";
          break;
        case "3":
          //发明专利信息
          this.dialogFormColumns = JSON.parse(
            JSON.stringify(this.patentColums)
          );
          this.dialogFormVisible = true;
          this.dialogFormTitle = "新增科技奖励信息";
          break;
        case "4":
          // 社会关系信息
          this.dialogFormColumns = JSON.parse(
            JSON.stringify(this.socialRelationColums)
          );
          this.dialogFormVisible = true;
          this.dialogFormTitle = "新增科技奖励信息";
          break;
        case "5":
          //地方工作情况
          break;

        default:
          break;
      }
    },
    // 确定添加
    submitBtnEvent() {
      var dialogElement = {};
      for (const index in this.dialogFormColumns) {
        let element = this.dialogFormColumns[index];
        if (element.value == null || element.value == "") {
          this.$message({
            message: element.title + "不能为空",
            type: "warning"
          });
          return;
        }
        dialogElement[element.key] = element.value;
      }
      this.dialogFormVisible = false;
      switch (this.activeName) {
        case "1":
          // 著述信息
          this.writingInfos.splice(0, 0, dialogElement);
          break;
        case "2":
          // 科技奖励信息
          this.technologyAwardInfos.splice(0, 0, dialogElement);
          break;
        case "3":
          //发明专利信息
          break;
        case "4":
          // 社会关系信息
          this.socialRelations.splice(0, 0, dialogElement);
          break;
        case "5":
          //地方工作情况
          break;

        default:
          break;
      }
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
  line-height: 160px;
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

.containerDiv {
  display: flex;
  flex-direction: column;
  /* background-color: blue; */
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
/* 个人信息导出 */
.personInfoExportDiv {
  width: 100%;
  height: 180px;
}
/* 个人信息展示 */
.personalInfoTable {
  /* background-color: red; */
  height: 150px;
  width: 100%;
  overflow: hidden;
}
/* 个人信息编辑 */
.personInfoEditDiv {
  /* background-color: yellow; */
}
</style>