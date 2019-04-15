<template>
  <el-card class="box-card" style="height:580px;margin-top:5px">
    <div slot="header" class="clearfix">
      <el-button type="primary" size="mini" icon="el-icon-plus">自定义标签</el-button>
    </div>
    <el-tree :data="data" :default-expand-all="true">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{node.label}}</span>
        <span style="margin-left:10px">
          <el-button type="text" size="mini" @click="() => append(data)" icon="el-icon-plus"></el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)" icon="el-icon-minus"></el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog title="添加子项" :visible.sync="showitem" width="30%">
      <el-form >
        <el-form-item label="名称">
          <el-input v-model="item.label" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="handlesave">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          label: "标签信息",
          children: []
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      item: {},
      itemdata: {},
      showitem: false
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    handlesave: function() {
      debugger;
      if (!this.itemdata.children) {
        this.$set(this.itemdata, "children", []);
      }
      this.itemdata.children.push(this.item);
      this.showitem=false;
    },
    append(data) {
      debugger;
      this.showitem = true;
      this.itemdata = data;
      const newChild = { label: "", children: [] };
      this.item = newChild;
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    }
  }
};
</script>
