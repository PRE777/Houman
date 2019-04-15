<template>
  <el-card class="box-card" style="height:250px">
    <div slot="header" class="clearfix">
      <el-button type="primary" size="mini">标签列表</el-button>
    </div>
    <div>
      <el-tree :data="treedata" :props="defaultProps" @node-click="handleClickNode" :default-expand-all="true"></el-tree>
    </div>
  </el-card>
</template>
<script>
import {
  GetAlllabels,
  getpersonsbylabel
} from "@/components/personDataSource/interface";

export default {
  name: "labels",
  data() {
    //获取所有标签信息
    var respose = GetAlllabels();
    return {
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
  created() {},
  methods: {
    handleClickNode: function(val) {},
    labelsearchperson: function(val) {
      debugger;
      var text = val.currentTarget.textContent; //标签内容
      var orgcode = sessionStorage.getItem("userinfo");
      //接口调用
      var respose = getpersonsbylabel(text, orgcode);
    }
  }
};
</script>