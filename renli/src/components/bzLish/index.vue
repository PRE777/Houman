<template>
  <div class="wrap">
    <div class="header">
      <navbar></navbar>
    </div>
    <div class="sidebar">
      <div class="sidlist">
        <el-tree
          :data="data2"
          class="filter-tree"
          empty-text="无数据"
          node-key="data2.id"
          :expand-on-click-node="false"
          default-expand-all
          :highlight-current="false"
          @node-drop="dragg"
          @node-click="handleNodeClick"
          draggable
          ref="tree2"
        ></el-tree>
      </div>
    </div>
    <div class="content-box">
      <div class="rightContent">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="单位编制岗位" name="bianzhi">
              <el-container v-if="activeName === 'bianzhi'">
                <postgw></postgw>
              </el-container>
            </el-tab-pane>
            <el-tab-pane label="浮动岗位组管理" name="fudong">
              <el-container v-if="activeName === 'fudong'">
                <group></group>
              </el-container>
            </el-tab-pane>
            <el-tab-pane label="查看岗位/岗位组视图" name="shitu">
              <el-container v-if="activeName === 'shitu'">
                  <viewgroup></viewgroup>
              </el-container>
            </el-tab-pane>
          </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/views/Dashboard/Navbar.vue";
import Footer from "@/views/Dashboard/footer.vue";
import postgw from "./post.vue";
import group from "./group.vue";
import viewgroup from "./view.vue";
export default {
  name: "dashboard",
  components: { Navbar, Footer, postgw, group,viewgroup  },
  data() {
    return {
      activeName:'bianzhi',
      list: {},
      data2: [
        {
          id: 167,
          label: "单位111",
          children: [
            {
              id: 4,
              parentId: 167,
              label: "单位222",
              children: [
                {
                  id: 9,
                  label: "单位333",
                  parentId: "4"
                },
                {
                  id: 10,
                  label: "单位444",
                  parentId: "4"
                }
              ]
            },
            {
              id: 101,
              label: "单位666",
              parentId: 167
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
  watch: {},
  created(){
    console.log(this.$store.state.gw.station)
  },
  methods: {
    //tabs切换
    handleClick(tab, event) {
      console.log(tab, event);
      console.log(this.activeName)
      console.log(this.list)
      var canshu = JSON.parse(JSON.stringify(this.list))
      // 父子传值
      console.log(canshu)
      if( this.activeName == 'bianzhi'){

      }else if(this.activeName == 'fudong'){

      }else{

      }
      canshu = {}
    },
    //单击树
    handleNodeClick(data) {
      var that = this;
      console.log(this.activeName)
      that.list = {
        lable:data.label,
        id:data.id
      }
      this.$store.commit('SET_SATION', that.list )
      var canshu = JSON.parse(JSON.stringify(this.list))
      console.log(canshu)
      // 父子传值
      if( this.activeName == 'bianzhi'){
        
      }else if(this.activeName == 'fudong'){
        
      }else{
        
      }
    },
    // 新建岗位组
    setGw() {
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      var zu = {
        id: 4,
        label: this.form.name,
        children: []
      };
      this.data.push(zu);
      this.editVisible = false;
    },
    //树拖拽结束
    dragg(node){
      console.log(this.data2)
      // this.$refs.tree2.draggable = false;
      var li = {
        id: 6444,
        label: '我的单位',
        children: []
      }
      console.log(node.key)
      // this.$refs.tree2.insertAfter(li,node.data)
      // this.$refs.tree2.append(li,node.data)
      // console.log(this.$refs.tree2.append(li,node.data))
    }
  }
};
</script>

<style scoped>
  .wrap{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .header{
      position: relative;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 100%;
      height: 0px;
      font-size: 22px;
      color: #fff;
  }
  .sidebar{
      display: block;
      position: absolute;
      left: 0;
      top: 60px;
      bottom: 0px;
      overflow-y: scroll;
      width: 200px;
      background: #384770;
  }
  .sidlist{
      height: 100%;
      background: #384770;
      box-sizing: border-box;
  }
  .sidebar::-webkit-scrollbar{
    display: none;
  }
  .content-box {
      position: absolute;
      left: 200px;
      right: 0;
      top: 60px;
      bottom: 0px;
      -webkit-transition: left .3s ease-in-out;
      transition: left .3s ease-in-out;
      background: #f0f0f0;
  }
  .rightContent{
    width: auto;
    height: 100%;
    /* overflow-y: scroll; */
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .rightContent::-webkit-scrollbar{
    display: none;
  }
  .rightContent >>> .el-tree-node {
    white-space: nowrap;
    outline: 0;
    margin: 2px;
    font-size: 14px;
    color:black;
  }
  /* 新建 */
  .setGw{
    margin-top: 10px;
    position: absolute;
    left: 48%;
    transform: translateX(-50%);
    padding: 10px;
  }
  .el-tree{
    margin-top:20px; 
    background: #384770;
    font-size: 14px;
    color: #FFFFFF;
  }
  .wrap >>> .el-icon-caret-right:before{
    color: #ffffff;
  }
  .wrap >>>.el-tree-node__content:hover{
    background: #5C88F1;
  }
  .search >>> .el-input__inner{
      position: relative;
      font-size: 14px;
      display: inline-block;
      width: 90%;
      left: 9px;
      top: 10px;
      background: #6188C0;
      border: 1px solid #82BDED;
      border-radius: 4px;
  }
  .el-tree-node__content{
    background: #5C88F1!important;
  }
  .tuozhuai{
    margin-top:20px;
    margin-left: 10px;
    color: #FFFFFF; 
  }
  .tuozhuai >>> .el-switch__label{
    color: #FFFFFF; 
  }
  .tuozhuai >>>.el-switch__label.is-active{
    color: #409EFF;
  }
  .el-button+.el-button{
      margin-left: 0px!important;
  }
</style>
<style>
    .el-tree-node:focus > .el-tree-node__content {
    background-color:#5C88F1!important;
  }
</style>