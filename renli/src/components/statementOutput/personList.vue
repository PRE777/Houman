<template>
  <div>
    <el-button size="mini" style="width:100%" type="primary" @click="handleOutputexcel">导出Excel</el-button>

    <ul style>
      <li
        v-for="(item,index) in personlist"
        :key="index"
        @click="handleclick(item)"
        style="cursor:pointer"
      >
        <el-tag style="width:100%;text-align:center;margin-top:10px">
          <el-checkbox v-model="item.checked"></el-checkbox>
          <span style="margin-left:5px">{{item.姓名}}</span>
        </el-tag>
      </li>
    </ul>
    <el-dialog :visible.sync="outputExcelDialog" title="导出" width="50%">
      <vuedraggable v-model="list" @update="movelist">
        <transition-group >
          <el-checkbox
            @change="changefiled"
            v-for="item in list"
            :key="item.index"
            :checked="item.checked"
            v-model="item.checked"
          >{{item.name}}</el-checkbox>
        </transition-group>
      </vuedraggable>
      <p style="margin-top:10px">可拖拽调整顺序，并选择是否显示该列！</p>

      <div style="height:10px"></div>
      <JsonExcel
        class="el-button"
        :data="this.personlist.filter(item => item.checked)"
        :fields="json_fields"
        name="名册信息.xls"
      >
        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
        <!-- <el-button type="primary" size="small">导出EXCEL</el-button> -->
      </JsonExcel>
    </el-dialog>
  </div>
</template>
<script>
import { getPersonsbyorgcode } from "@/components/personDataSource/interface";
import JsonExcel from "vue-json-excel";
import vuedraggable from "vuedraggable";
export default {
  name: "personlist",
  components: { JsonExcel, vuedraggable },
  data() {
    return {
      list: [
        { name: "姓名", index: 1, checked: true },
        { name: "身份号", index: 2, checked: true },
        { name: "培训经历", index: 3, checked: true },
        { name: "入伍后简历", index: 4, checked: true },
        { name: "社会关系", index: 5, checked: true },
        { name: "奖惩信息", index: 6, checked: true }
      ],
      outputExcelDialog: false,
      json_fields: {
        姓名: "姓名", //常规字段
        身份号: "身份号", //支持嵌套属性
        培训经历: "培训经历",
        入伍后简历: "入伍后简历",
        社会关系: "社会关系",
        奖惩信息: "奖惩信息"
      },
      personlist: [
        {
          checked: false,
          姓名: "张三",
          身份号: "1231",
          培训经历: "2019-8-9  XXX学校培训", //培训经历
          入伍后简历: "2019-9-8 XXX学校毕业", //入伍后简历
          社会关系: "父亲  李四  联系电话：212545", //社会关系
          奖惩信息: "2019-9-8   受二等功" //奖惩信息
        },
        {
          checked: false,
          姓名: "李四",
          身份号: "1232",
          培训经历: "2019-8-9  XXX学校培训", //培训经历
          入伍后简历: "2019-9-8 XXX学校毕业", //入伍后建立
          社会关系: "父亲  李四  联系电话：212545", //社会关系
          奖惩信息: ""
        },
        {
          checked: false,
          姓名: "王五",
          身份号: "1233",
          培训经历: "2019-8-9  XXX学校培训", //培训经历
          入伍后简历: "2019-9-8 XXX学校毕业", //入伍后建立
          社会关系: "父亲  李四  联系电话：212545", //社会关系
          奖惩信息: ""
        }
      ]
    };
  },

  methods: {
    handleclick: function(row) {},
    handleOutputexcel: function() {
      this.outputExcelDialog = true;
    },
    changefiled: function(val, data) {
      this.json_fields = {};
      this.list.forEach(element => {
        if (element.checked) {
          this.json_fields[element.name] = element.name;
        }
      });
    },
    movelist() {
      debugger;
      this.json_fields = {};
      this.list.forEach(element => {
        if (element.checked) {
          this.json_fields[element.name] = element.name;
        }
      });
    }
  },
  created() {
    this.$bus.$on("clickTreeNode", function(val) {
      var org = val.val;
      var response = getPersonsbyorgcode(org);
      debugger;
    });
  }
};
</script>
<style>
li {
  list-style: none;
}
</style>
