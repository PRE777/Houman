<template >
  <div>
    <el-input size="small" placeholder="输入关键字" v-model="filterText"></el-input>
    <el-tree
      :data="treeData"
      :props="defaultProps"
      ref="persontree"
      default-expand-all
      show-checkbox
      @check-change="handleCheckbox"
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
      node-key="val"
    ></el-tree>
  </div>
</template>
<script>

import {LoadOrganizationTree} from "@/components/personDataSource/interface";
export default {
  name: "orgtree",
  watch: {
    filterText(val) {
      this.$refs.persontree.filter(val);
    }
  },
  created() {

  },
  methods: {
    handleNodeClick:function(data,node,event){
      this.$bus.$emit("clickTreeNode", data);
      this.$refs.persontree.setCheckedKeys([]);
    },
    handleCheckbox: function(data, checked, indeterminate) {
      var selectedNode = this.$refs.persontree.getCheckedNodes();
      this.$bus.$emit("treecheckedNode", selectedNode);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
  data() {
    var  treeData = LoadOrganizationTree();
    return {
      filterText: "",
      treeData: [
        {
          label: "XX",
          children: [
            {
              label: "西部XX",
              children: [],
              val: "01A"
            },
            {
              label: "东部XX",
              children: [],
              val: "01B"
            },
            {
              label: "北部XX",
              children: [],
              val: "01C"
            },
            {
              label: "南部XX",
              children: [],
              val: "01D"
            }
          ],
          val: "01"
        }
      ],
      defaultProps: {
        children: "children",
        label: "label",
        val: "val"
      }
    };
  }
};
</script>