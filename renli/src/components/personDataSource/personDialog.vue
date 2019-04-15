
<style>
.box-card {
  width: 97%;
}
#personBaseInfo tr td {
  padding: 0px 90px 6px 0px;
  line-height: 35px;
}
</style>
<template>
  <el-dialog title="人员详细信息" :visible.sync="dialogVisible" width="70%">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="文档视图" name="first">
        <table>
          <tr>
            <td>姓名</td>
            <td>{{editPerson.姓名}}</td>
          </tr>
        </table>
      </el-tab-pane>
      <el-tab-pane label="模块视图" name="second"></el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "persondialog",
  components: {
    draggable
  },
  data() {
    return {
      activeName: "first",
      dialogVisible: false,
      person:[],
      editPerson: {}
    };
  },
  created() {
    var that = this;
    that.$bus.$on("openPersonInfoDialog", function(val) {
      that.editPerson=val;
      that.dialogVisible = true;
    });
  },
  methods: {}
};
</script>