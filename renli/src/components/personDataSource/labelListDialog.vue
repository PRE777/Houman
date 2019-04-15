<template>
  <el-dialog title="打标签" :visible.sync="showdialog" @close="closedialog">
    <el-card class="box-card">
      <div width="99%">
        <el-tree
          :data="treedata"
          :props="defaultProps"
          @node-click="handleClickNode"
          :default-expand-all="true"
        ></el-tree>
      </div>
    </el-card>
  </el-dialog>
</template>
<script>
import { SaveLabelInfo } from "@/components/personDataSource/interface";
export default {
  name: "labels",
  data() {
    return {
      showdialog: false,
      editRow: {},
      treedata: [
        {
          label: "标签组",
          children: [
            {
              label: "特殊人才",
              children: [{ label: "计算机人才", children: [] }]
            }
          ]
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
    this.$bus.$on("showlableDialog", function(val) {
      that.showdialog = true;
      that.editRow = val;
    });
  },
  methods: {
    closedialog: function() {
      SaveLabelInfo(this.editRow);
    },
    handleClickNode: function(a, b, c) {
      if (a.label != "标签组") {
        this.editRow.标签组.push(a.label);
        this.editRow.标签组 = this.uniq(this.editRow.标签组);
      }
    },
    uniq: function(array) {
      var temp = {},
        r = [],
        len = array.length,
        val,
        type;
      for (var i = 0; i < len; i++) {
        val = array[i];
        type = typeof val;
        if (!temp[val]) {
          temp[val] = [type];
          r.push(val);
        } else if (temp[val].indexOf(type) < 0) {
          temp[val].push(type);
          r.push(val);
        }
      }
      return r;
    }
  }
};
</script>