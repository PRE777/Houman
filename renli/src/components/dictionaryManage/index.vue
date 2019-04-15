<style>
.el-button + .el-button {
  margin-left: 0px;
}
</style>
<template>
  <div class="wrap">
    <div class="header">
      <navbar></navbar>
    </div>
    <div class="main">
      <div style="height:20px"></div>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-card shadow="always" style="height:568px">
            <dicTree></dicTree>
          </el-card>
        </el-col>
        <el-col :span="17">
          <el-card shadow="always" style="height:568px;overflow:auto">
            <el-input v-model="dictionaryObject.label" size="mini">
              <template slot="prepend">字典类型</template>
            </el-input>
            <div style="margin-top:10px">
              <el-button type="primary" size="mini" @click="handleclick">添加</el-button>
              <el-button type="primary" size="mini" @click="handleSave">提交</el-button>
            </div>
            <el-form>
              <el-form-item v-for="(item,index) in dictionaryObject.children" :key="index">
                <el-input size="mini" v-model="item.label" style="width:94%">
                  <template slot="prepend">类型信息</template>
                </el-input>
                <el-button type="primary" size="mini" @click="handledeleteclick(index)">删除</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import dicTree from "@/components/dictionaryManage/dictionaryTree.vue";
import Navbar from "@/views/Dashboard/Navbar.vue";
import Footer from "@/views/Dashboard/footer.vue";

export default {
  name: "dashboard",
  components: {
    Navbar,
    Footer,
    dicTree
  },
  data() {
    return {
      dictionaryObject: {
        label: "",
        children: [{ label: "", children: [] }]
      }
    };
  },
  methods: {
    handleclick: function() {
      this.dictionaryObject.children.push({ label: "", children: [] });
    },
    handledeleteclick: function(index) {
      this.dictionaryObject.children.splice(index, 1);
    },
    handleSave: function() {
      var newObj = JSON.parse(JSON.stringify(this.dictionaryObject));
      this.$bus.$emit("savedic", newObj);
    }
  }
};
</script>