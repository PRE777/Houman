<template>
  <div>
    <el-collapse v-model="activename">
      <el-collapse-item title="多条件查询" Consistency name="1">
        <div v-for="(item,index) in formInline.seachItems" :key="index">
          <el-row :gutter="10">
            <el-col :span="5">
              <el-select
                v-model="formInline.seachItems[index].searchType"
                size="small"
                @change="selectedDate(index)"
              >
                <el-option key="1" label="出生年月" value="1"></el-option>
                <el-option key="2" label="职务等级" value="2"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              <el-select v-model="formInline.seachItems[index].condition" size="small">
                <el-option key="1" label="大于" value=">"></el-option>
                <el-option key="2" label="小于" value="<"></el-option>
                <el-option key="3" label="等于" value="="></el-option>
                <el-option key="4" label="小于等于" value=">="></el-option>
                <el-option key="5" label="大于等于" value="<= "></el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              <el-input
                size="small"
                v-if="(!formInline.seachItems[index].search_selectedData)&&(!formInline.seachItems[index].search_selectedLevel)"
                v-model="formInline.seachItems[index].value"
              ></el-input>
              <el-date-picker
                size="small"
                style="width:218px"
                v-if="formInline.seachItems[index].search_selectedData"
                v-model="formInline.seachItems[index].value"
              ></el-date-picker>
              <el-select
                size="small"
                v-if="formInline.seachItems[index].search_selectedLevel"
                v-model="formInline.seachItems[index].value"
                style="width:218px"
              >
                <el-option label="领班" value="1"></el-option>
                <el-option label="经理" value="2"></el-option>
                <el-option label="总经理" value="3"></el-option>
              </el-select>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-button type="primary" size="small" @click="AddCondition">添加</el-button>
              <el-button type="primary" size="small" @click="deleteCondition(index)">删除</el-button>
            </el-col>
          </el-row>
          <div style="height:10px"></div>
          <el-row>
            <el-col :span="2">
              <el-select
                size="small"
                style="width:100px"
                v-model="formInline.seachItems[index].logic"
                v-if="index<formInline.seachItems.length-1"
              >
                <el-option label="和" value="and"></el-option>
                <el-option label="或" value="or"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <div style="height:10px"></div>
        </div>
        <div>
          <el-button type="primary" size="small" @click="AddCollection">添加收藏</el-button>
          <el-button type="primary" size="small" @click="CollectionList">收藏列表</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div style="height:10px"></div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" size="small"></el-input>
      </el-form-item>
      <el-form-item label="籍贯">
        <el-select v-model="formInline.region" size="small">
          <el-option label="山东" value="shanghai"></el-option>
          <el-option label="山西" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身份号">
        <el-input v-model="formInline.identity" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSubmit" style="width:200px">查询</el-button>
        <el-button type="primary" size="small" @click="showcode">伪代码查询</el-button>
      </el-form-item>
    </el-form>

    <div style="height:20px"></div>
    <el-table :data="persondata" height="400" border>
      <el-table-column prop="身份号" label="身份号"></el-table-column>
      <el-table-column prop="姓名" label="姓名"></el-table-column>
      <el-table-column prop="年龄" label="年龄"></el-table-column>
      <el-table-column prop="籍贯" label="籍贯"></el-table-column>
      <el-table-column fixed="right" label="标签组" width="100">
        <template slot-scope="scope">
          <el-tag v-for="(item,index) in scope.row.标签组" size="mini" :key="index" closable @close="deletelabel(scope.row.标签组,index)">
            {{item}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
          <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="handleLabels(scope.row)" size="small" type="primary">打标签</el-button>
          <el-button size="small" type="primary">收藏</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center; height:60px">
      <el-pagination
        layout="prev,pager,next"
        :total="this.formInline.tableTotalCount"
        :current-page="this.formInline.currentPage"
        @current-change="handlepagination"
      ></el-pagination>
    </div>
    <el-dialog :visible.sync="weicodedialog" width="50%" title="伪代码">
      <el-input type="textarea" placeholder="请输入内容" :rows="8"></el-input>
    </el-dialog>
  </div>
</template>
<script>
function searchItem() {
  this.searchType = "";
  this.condition = "";
  this.value = "";
  this.search_selectedData = false;
  this.search_selectedLevel = false;
  this.logic = "";
}
import { searchPersonsInfo,AddCollection } from "@/components/personDataSource/interface";
export default {
  name: "personTable",
  data() {
    //var searchitem = new searchItem();
    var searchitems = [];
    searchitems.push(new searchItem());
    return {
      weicodedialog: false,
      conditionIndex: 0,
      activename: "0",
      //查询用的信息
      formInline: {
        seachItems: searchitems,
        name: "",
        region: "",
        identity: "",
        searchOrgList: [], //左侧树选择的组织信息
        currentPage: 1,
        tableTotalCount: 0
      },
      temp_select: 0,
      persondata: [
        {
          身份号: "2315485",
          姓名: "张三",
          年龄: "30",
          籍贯: "山东",
          标签组:["优秀","最佳干部"]
        },
        {
          身份号: "2315485",
          姓名: "张三",
          年龄: "30",
          籍贯: "山东",
          标签组:["最佳干部"]
        },
        {
          身份号: "2315485",
          姓名: "张三",
          年龄: "30",
          籍贯: "山东",
          标签组:[]
        },
        {
          身份号: "2315485",
          姓名: "张三",
          年龄: "30",
          籍贯: "山东",
          标签组:[]
        }
      ]
    };
  },
  mounted() {
    //this.data.formInline.seachItems.push(new searchItem());
  },
  created() {
    var that = this;
    this.$bus.$on("treecheckedNode", function(value) {
      that.formInline.currentPage = 1;
      //获取左侧树选择的单位机构码
      if (value != undefined && value.length > 0) {
        that.formInline.searchOrgList = [];
        value.forEach(function(index) {
          that.formInline.searchOrgList.push(index.val);
        });
        that.queryPersons(null, "checkbox");
      }
    });
    this.$bus.$on("clickTreeNode", function(val) {
      that.formInline.currentPage = 1;
      that.queryPersons(val, "click");
    });
    this.$bus.$on("getCollection",function(val){
      debugger
      that.formInline.seachItems=[];
      that.formInline.seachItems=val;
    })
  },
  methods: {
    deletelabel:function(labels,index){
      //var content= event.currentTarget.parentNode.textContent.trim()
      labels.splice(index,1);
    },  
    AddCollection: function() {
      //调用接口收藏多条件查询信息，参数
      var response = AddCollection(this.formInline.seachItems);
      this.$message('收藏成功！');
    },
    CollectionList: function() {
      //获取当前人身份号信息
      var identitycode=sessionStorage.getItem("userinfo");
      this.$bus.$emit("collectionDialog", identitycode);
    },
    showcode: function() {
      this.weicodedialog = true;
    },
    selectedDate: function(index) {
      var type = this.formInline.seachItems[index].searchType;
      if (type == 1) {
        this.formInline.seachItems[index].search_selectedData = true;
        this.formInline.seachItems[index].search_selectedLevel = false;
        this.formInline.seachItems[index].value = "";
      } else {
        this.formInline.seachItems[index].search_selectedData = false;
        this.formInline.seachItems[index].search_selectedLevel = true;
        this.formInline.seachItems[index].value = "";
      }
    },
    AddCondition: function() {
      this.formInline.seachItems.push(new searchItem());
    },
    deleteCondition: function(index) {
      if (this.formInline.seachItems.length > 1) {
        this.formInline.seachItems.splice(index, 1);
      }
    },
    handleLabels: function(val) {
      this.$bus.$emit("showlableDialog", val);
    },
    handlepagination: function(val) {
      this.formInline.currentPage = val;
      that.queryPersons(null, null);
    },
    onSubmit: function() {
      //1通过接口调用查询人员信息
      this.queryPersons(null, null);
    },
    handleClick: function(row) {
      this.$bus.$emit("openPersonInfoDialog", row);
    },
    handleEdit: function(row) {
      debugger;
      this.$bus.$emit("openPersonInfoEditDialog", true);
    },
    queryPersons: function(val, operate) {
      var that = this;
      if (operate == "click") {
        that.formInline.searchOrgList = [];
        that.formInline.searchOrgList.push(val.val);
      } else if (operate == "checkbox") {
      }
      //通过接口进行查询
      var response =searchPersonsInfo(that.formInline);
      //that.formInline.tableTotalCount = response.total;
      //that.persondata = response.data;

    }
  }
};
</script>