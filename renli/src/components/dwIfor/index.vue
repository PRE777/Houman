<template>
    <div class="wrap">
        <div class="header">
          <navbar></navbar>
        </div>
          <div class="sidebar">
            <div class="sidlist">
              <el-switch
                v-model="value3"
                active-text="开启拖拽"
                inactive-text="关闭拖拽"
                @change="move"
                class="tuozhuai">
              </el-switch>
                <el-input
                  placeholder="搜索单位名字"
                  v-model="filterText" class="search">
                </el-input>
                <el-tree
                 :data="data2"
                  class="filter-tree"
                  empty-text="无数据"
                  node-key="data2.id"
                  :expand-on-click-node="false"
                  default-expand-all
                  :highlight-current='false'
                  :filter-node-method="filterNode"
                  @node-drop="dragg"
                  ref="tree2">
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span @click="handleMenu(data)">{{ node.label }}</span>
                  <span>
                    <el-button
                      type="text"
                      size="mini"
                      @click="() => append(data)">
                      +下级
                    </el-button>
                    <el-button
                      type="text"
                      size="mini"
                      @click="() => insertAfter(data)">
                      +同级
                    </el-button>
                  </span>
                </span>
                </el-tree>
            </div>
          </div>
        <div class="content-box">
          <div class="rightContent">
            <BaseTable :lit="idobj"></BaseTable>
          </div>
        </div>
        <!-- 新建岗位 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="40%" @close='closeDialog'>
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="岗位组名称">
                    <el-input v-model="form.name"  placeholder="岗位组名称"></el-input>
                </el-form-item>
                <el-form-item label="时间">
                    <el-date-picker type="date" placeholder="时间" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="编码">
                    <el-input v-model="form.address" placeholder="编码"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Navbar from '@/views/Dashboard/Navbar.vue'
import Footer from '@/views/Dashboard/footer.vue'
import BaseTable from './BaseTables.vue'
  export default {
    name: "dashboard",
    components: {Navbar,Footer,BaseTable},
    data() {
      return {
        pubdanwei:'',
        jibei:'',
        editVisible:false,
        value3: false,
        filterText: '',
        form: {
            name: '',
            date: '',
            address: ''
        },
        idobj:{},
        data2: [{
            id: 167,
            label: '空军',
            children: [
              {
                id: 4,
                parentId:167,
                label: '单位',
                children: [
                  {
                    id: 9,
                    label: '士兵',
                    parentId:'4'
                  }, {
                    id: 10,
                    label: '单位1-1-2',
                    parentId:'4'
                  }
                ]
              }, 
              {
                  id: 101,
                  label: '单位666',
                  parentId:167
              }
            ]
          }],
          defaultProps: {
            children: 'children',
            label: 'label'
          }
      };
    },
    created: function () {
        this.listIfor = {
            id: 1,
            label: '单位1',
        }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    methods:{
      closeDialog(){
        this.form = {
            name: '',
            date: '',
            address: ''
        }
      },
      // 保存新建
      saveEdit(){
        console.log(this.jibei)
        if( this.jibei == '下级' ){
          if (!this.pubdanwei.children) {
            this.$set(this.pubdanwei, 'children', []);
          }
          // 新建单位树，并修改树
          console.log(this.pubdanwei)
          const newChild = { 'id': 234567, 'label': this.form.name, 'children': [],'parentId':this.pubdanwei.id};
          this.pubdanwei.children.push(newChild);
          this.editVisible = false;
          console.log(this.data2)
          this.editVisible = false;
        }else{
          console.log(this.pubdanwei)
          if( this.pubdanwei.parentId == undefined ){
            const newChild = { 'id': 234567, 'label': this.form.name, 'children': [],'parentId':this.pubdanwei.id};
            this.data2.push(newChild)
          }else{
            console.log(this.pubdanwei.id)
            console.log(this.pubdanwei.parentId)
            const newChild = { 'id': 234567, 'label': this.form.name, 'children': [],'parentId':this.pubdanwei.id};
            // 知道父节点的ID 在父节点的children中添加节点
            this.setDataToTree(this.data2,this.pubdanwei.parentId,newChild)
          }
          this.editVisible = false;
        }
      },
      // 递归添加节点------修改列表的时候也会
      setDataToTree(treeData,pId,respData){
        for(var i=0;i<treeData.length;i++) {
            var td = treeData[i];
            if(td.id==pId) {
              console.log(pId,td.id)
              console.log(1234567890)
              treeData[i].children=treeData[i].children.concat(respData);
              return;
            }else{
              console.log('wsedyghjkio')
              this.setDataToTree(td.children, pId, respData);
            }
        }
      },
      // 加下级
      append(data) {
        this.jibei = '下级';
        console.log(data)
        this.editVisible = true;
        this.pubdanwei = data;
      },
      // 添加同级
      insertAfter(data){
        this.jibei = '同级';
        console.log(data)
        this.editVisible = true;
        this.pubdanwei = data;
      },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      // 是否开启拖拽
      move(){
        if( this.value3 == true ){
            this.$message.success(`开启拖拽`);
            this.$refs.tree2.draggable = true;
        }else{
            this.$message.success(`关闭拖拽`);
            this.$refs.tree2.draggable = false;
        }
        this.value3 == !this.value3
      },
      filterNode(value, data,node) {
        if (!value) return true;
        // this.$refs.tree2.getCheckedKeys(node).highlight-current
        this.$refs.tree2.setCurrentKey([9])
        return data.label.indexOf(value) !== -1;
      },
      //树点击
      handleMenu(data){
        console.log(data)
        console.log(typeof(data))
        this.idobj = data;
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
      
  }
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
    overflow-y: scroll;
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