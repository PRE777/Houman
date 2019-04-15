<template>
  <el-tree ref="dictree" :data="treeData" :props="defaultProps"></el-tree>
</template>
<script>
import { getAllDictionary } from "@/components/personDataSource/interface";
export default {
  data() {
    var response = getAllDictionary();
    return {
      treeData: [
        {
          label: "字典信息",
          children: []
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    var that = this;
    this.$bus.$on("savedic", function(val) {
      if (that.$refs.dictree.getCurrentNode()) {
var parentnode = that.$refs.dictree.getCurrentNode();
      parentnode.children.push(val);
        
      }else{
          this.$message('请选择要添加的节点！');
      }
      
    });
  }
};
</script>
