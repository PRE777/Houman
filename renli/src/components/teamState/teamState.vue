<template>
  <div id="teamState">
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
      <div id="page-title">{{pageTitle}}</div>

      <div id="tabs">
        <el-tabs v-model="activeName2" @tab-click="handleClick">
          <el-tab-pane label="人员学历构成" name="first">
            <div class="container">
              <div class="left" id="education-compose1"></div>
              <div class="right" id="education-compose2"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="年龄构成" name="second">
            <div class="container">
              <div class="left" id="ages-compose1"></div>
              <div class="right" id="ages-compose2"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="职级构成" name="third">
            <div class="container">
              <div class="left" id="profession-compose1"></div>
              <div class="right" id="profession-compose2"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="专业技术干部职级构成" name="fourth">
            <div class="container">
              <div class="left" id="profession-leader-compose1"></div>
              <div class="right" id="profession-leader-compose2"></div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="技术职务情况" name="fivth">
            <div class="container">
              <div class="left" id="skill-profession-info1"></div>
              <div class="right" id="skill-profession-info2"></div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { configureChartsInfo } from "../../assets/js/teamState.js";
import echarts from "echarts";

export default {
  name: "teamState",
  data() {
    return {
      activeName2: "first",
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
    configureChartsInfo();
  },
  methods: {
    // - 点击节点：选择单位
    handleNodeClick(data, node, view) {
      console.log(data);
      console.log(node);
      console.log(view);
      this.pageTitle = node.label;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url("../../assets/css/teamState.css");
</style>

