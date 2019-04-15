<template>
  <div id="qualityAnalysis">
    <aside>
      <el-tree
        accordion
        highlight-current
        node-key="1"
        :data="departmentData"
        @node-click="handleNodeClick"
      ></el-tree>
    </aside>
    <div id="contents">
      <div id="page-title">{{pageTitle + '行政干部任职情况进行数质量统计分析'}}</div>
      <div class="container">
        <div id="bars"></div>
        <div id="tables"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { configureHumanResourcesQualityStatistics } from "../../assets/js/qualityAnalysis.js";
import echarts from "echarts";
export default {
  name: "qualityAnalysis",
  data() {
    return {
      pageTitle: "A单位",
      departmentData: [
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
      ]
    };
  },
  mounted() {
    configureHumanResourcesQualityStatistics();
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
@import url("../../assets/css/qualityAnalysis.css");
</style>

