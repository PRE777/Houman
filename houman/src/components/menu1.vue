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
            <el-main>Main</el-main>
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
  
  
  body > .el-container {
    flex: 1;
    margin-bottom: 40px;
  }
</style>