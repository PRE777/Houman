<template>
    <div class="main">
        <navbar></navbar>
        <el-container>
            <el-aside width="200px">
              <!-- 树形结构 -->
              <el-tree
                :data="data6"
                empty-text="无数据"
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                @node-drag-start="handleDragStart"
                @node-drag-enter="handleDragEnter"
                @node-drag-leave="handleDragLeave"
                @node-drag-over="handleDragOver"
                @node-drag-end="handleDragEnd"
                @node-drop="handleDrop"
                draggable
                :allow-drop="allowDrop"
                :allow-drag="allowDrag"
              >
              <span class="custom-tree-node" slot-scope="{ node, data6 }">
              <span @click="lable">{{ node.label }}</span>
              <span>
                <el-button
                type="text"
                size="mini"
                @click="() => append(data6)">
                Append
                </el-button>
              </span>
              </span>
              </el-tree>
            </el-aside>
            <el-main>
                <ul>
                  <li>内容部分</li>
                  <!-- <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li> -->
                </ul>
            </el-main>
          </el-container>
          <el-footer>Footer</el-footer>
        <!-- https://www.cnblogs.com/xifengxiaoma/p/9573439.html -->
    </div>
</template>

<script>
import Navbar from '../views/Dashboard/Navbar.vue'
  export default {
    name: "dashboard",
    components: {Navbar},
    data () {
      return {
        user: ''
      }
    }
  }
</script>

<style scoped>
  .main{
    display: flex;
    height: 100%;
    flex-direction: column;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }   
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    /* line-height: 200px; */
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    flex: 1;
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>