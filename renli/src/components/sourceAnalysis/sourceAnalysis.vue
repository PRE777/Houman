<template>
  <div id="sourceAnalysis">
    <aside>
      <el-tree
        accordion
        highlight-current
        ref="treeBox"
        node-key="1"
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
    </aside>
    <div id="contents">
      <div id="page-title">{{pageTitle}}</div>

      <div id="pies"></div>

      <div id="tables">
        <div id="general-table-title">当前单位及其下级单位高配情况统计明细：</div>
        <el-table :data="detailData" border style="width: 90%">
          <el-table-column prop="department" label="单位"></el-table-column>
          <el-table-column prop="highLeaders" label="高配领导干部人数"></el-table-column>
          <el-table-column prop="totalLeaders" label="领导干部总人数"></el-table-column>
          <el-table-column prop="ratio" label="高配领导干部占比"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { configureSourceAnalysisStatistics } from "../../assets/js/sourceAnalysis.js";
import echarts from "echarts";
export default {
  name: "sourceAnalysis",
  data() {
    return {
      pageTitle: "A单位",
      data: [
        {
          label: "A单位",
          id: 1,
          children: [
            {
              label: "A单位办公室",
              id: 2,
              children: [
                {
                  label: "A单位办公室第一秘书处"
                },
                {
                  label: "A单位办公室第二秘书处"
                }
              ]
            }
          ]
        },
        {
          label: "B单位",
          children: [
            {
              label: "B单位办公室",
              children: [
                {
                  label: "B单位办公室法务部"
                }
              ]
            },
            {
              label: "B单位行政部",
              children: [
                {
                  label: "B单位行政部一处"
                }
              ]
            }
          ]
        },
        {
          label: "C单位",
          children: [
            {
              label: "C单位办公室",
              children: [
                {
                  label: "C单位办公室秘书部"
                }
              ]
            },
            {
              label: "C单位商务部",
              children: [
                {
                  label: "C单位商务部一部"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 各单位高配情况
      detailData:[{
          department: 'A单位',
          highLeaders: 1,
          totalLeaders: 4,
          ratio: 0,
      },
      {
          department: 'A单位办公室',
          highLeaders: 1,
          totalLeaders: 4,
          ratio: 0,
      },
      {
          department: 'A单位办公室第一秘书处',
          highLeaders: 1,
          totalLeaders: 4,
          ratio: 0,
      },
      {
          department: 'A单位办公室第二秘书处',
          highLeaders: 1,
          totalLeaders: 4,
          ratio: 0,
      }]
    };
  },
  mounted() {
    configureSourceAnalysisStatistics();
  },
  methods: {
    // - 点击节点：选择单位
    handleNodeClick(data, node, view) {
      console.log(data);
      console.log(node);
      console.log(view);
      this.pageTitle = node.label;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url("../../assets/css/sourceAnalysis.css");
</style>

