<style>
.el-button+.el-button{
  margin-left: 0px
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
        <el-col :span="3">
          <el-card shadow="always" style="height:568px">
            <orgtree></orgtree>
          </el-card>
        </el-col>
        <el-col :span="17">
          <el-card shadow="always" style="height:568px;overflow:auto">
            <personData></personData>
          </el-card>
        </el-col>
        <el-col :span="4">
          <labels></labels>
          <collectiontree></collectiontree>
        </el-col>
      </el-row>
      <persondialog></persondialog>
      <editpersondialog></editpersondialog>
      <collectionList></collectionList>
      <labelsdialog></labelsdialog>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import orgtree from "@/components/personDataSource/organization_tree.vue";
import personData from "@/components/personDataSource/personDataTable.vue";
import persondialog from "@/components/personDataSource/personDialog.vue";
import editpersondialog from "@/components/personDataSource/personEditDialog.vue";
import collectionList from "@/components/personDataSource/collectionDialog.vue";
import labels from "@/components/personDataSource/labelList.vue";
import labelsdialog from "@/components/personDataSource/labelListDialog.vue";
import collectiontree from "@/components/personDataSource/collectionTree.vue";
import Navbar from "@/views/Dashboard/Navbar.vue";
import Footer from "@/views/Dashboard/footer.vue";

export default {
  name: "dashboard",
  components: {
    Navbar,
    Footer,
    orgtree,
    personData,
    persondialog,
    editpersondialog,
    labels,
    collectionList,
    labelsdialog,
    collectiontree
  },
  data() {
    return {};
  }
};
</script>