<template>
    <div class="contain">
      <el-tabs v-model="activeName" @tab-click="handleClick" >
        <!-- <el-tab-pane v-model="list" :label="item.name" v-for="(item,index) in list" :key="index" :name="item.id">
                <div class="list">
                  <div v-for="element in list" :key="element.name"
                      class="li" @click="icon(element.path)">
                      <img :src="element.img"/>
                      <div>{{element.names}}</div>
                  </div>
                </div>
        </el-tab-pane> -->
        <el-tab-pane label="基础服务" name="first">
            <ul class="list">
                <li v-for="(item,index) in list" :key="index" @click="icon(item.path)">
                    <img :src="item.img"/>
                    <div>{{item.names}}</div>
                </li>
              </ul>
        </el-tab-pane>
      </el-tabs>
      
    </div>
</template>

<script>
// 引入拖拽组件
// import draggable from 'vuedraggable'
import luan from '../../../src/assets/images/404.png'
import ln from '../../../src/assets/images/404_cloud.png'
import lists from '@/router/menus.js'
  export default {
    name: "contain",
    data () {
      return {
        dragOptions:{
            animation: 120,
            scroll: true,
            group: 'sortlist',
            ghostClass: 'ghost-style'
        },
        list:lists,
        activeName: 'first',
        menus:[
          {
            name:"基础服务",
            id:"1",
            children:[
              {'names':'系统门户','path':'/sysInfor','img':luan,'qx':true,'id':"1-1"},
              // {'names':'综合态势展示1','path':'/cesiumShow','img':ln,'qx':true,id:"1-2"},
              {'names':'核心用户管理','path':'/coreUser','img':ln,'qx':true,id:"1-3"},
              {'names':'编制岗位','path':'/bzLish','img':ln,'qx':true,id:"1-4"},
              {'names':'综合信息检索','path':'/zhIfor','img':ln,'qx':true,id:"1-5"},
              {'names':'人员身份管理','path':'/peopleGl','img':ln,'qx':true,id:"1-6"},
              {'names':'单位信息管理','path':'/dwIfor','img':ln,'qx':true,id:"1-7"}
            ]
          },
          {
            name:"基础服务",
            id:"2", 
            children:[
              {'names':'系统门户2','path':'/sysInfor','img':luan,'qx':true,'id':"2-1"},
              {'names':'综合态势展示2','path':'/cesiumShow','img':ln,'qx':true,id:"2-2"},
              {'names':'系统门户3','path':'/sysInfor','img':luan,'qx':true,'id':"2-3"},
              {'names':'综合态势展示4','path':'/cesiumShow','img':ln,'qx':true,id:"2-4"},
              {'names':'系统门户5','path':'/sysInfor','img':luan,'qx':true,'id':"2-5"},
              {'names':'综合态势展示6','path':'/cesiumShow','img':ln,'qx':true,id:"2-6"}
            ]
          },
          {
            name:"基础服务",
            id:"3", 
            children:[
              {'names':'系统门户2','path':'/sysInfor','img':luan,'qx':true,'id':"2-1"},
              {'names':'综合态势展示2','path':'/cesiumShow','img':ln,'qx':true,id:"2-2"},
              {'names':'系统门户3','path':'/sysInfor','img':luan,'qx':true,'id':"2-3"},
              {'names':'综合态势展示4','path':'/cesiumShow','img':ln,'qx':true,id:"2-4"},
              {'names':'系统门户5','path':'/sysInfor','img':luan,'qx':true,'id':"2-5"},
              {'names':'综合态势展示6','path':'/cesiumShow','img':ln,'qx':true,id:"2-6"}
            ]
          }
        ]
      }
    },
    components: {
      //调用组件
      // draggable
    },
    methods: {
      end (ev) {
        if (ev.to.className === 'dragArea11') {
          this.$set(this.list2[ev.oldIndex], 'flag', true)
        }
      },
      start22 (event) {
        this.falgs = '222222'
      },
      end22 (ev) {
        this.falgs = 'article'
      },
      handleDel (index, id) {
        this.list1.splice(index, 1)
        let q = this.list2.find((value, index, arr) => {
          return value.id === id
        })
        this.$set(q, 'flag', false)
      },
      // table
      handleClick(tab, event) {
        console.log(tab, event);
      },
      icon:function(path){
        console.log(path)
        this.$router.push(path)
      }
    },
    created () {

    }
  }
</script>

<style scoped>
.list{
      display: flex;
      flex-wrap: wrap;
      margin: 20px;
    }
    .list li{
      margin: 25px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: PingFangSC-Regular;
      font-size: 18px;
      color: #333333;
      letter-spacing: 0;
    }
    .list li img{
      display: block;
      width: 100px;
      height: 100px;
    }
    .list li div{
      margin-top: 10px;
    }
    /* .list{
      display: flex;
      flex-wrap: wrap;
      margin: 20px;
    }
    .list .li{
      margin: 25px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: PingFangSC-Regular;
      font-size: 18px;
      color: #333333;
      letter-spacing: 0;
    }
    .list .li img{
      display: block;
      width: 100px;
      height: 100px;
    }
    .list .li div{
      margin-top: 10px;
    } */
    .contain{
      height: 100%;
    }
    /* 穿透 */
    .contain >>> .el-tabs__header{
      margin: 0 20px!important;
    }
    .contain >>>.el-tabs__item{
      height: 48px;
      line-height: 48px;
    }
    .contain >>> .el-tabs{
      display: flex;
      flex-direction: column;
      width:100%;
      height: 100%;
    }
    .contain >>> .el-tabs__content{
      overflow-y: scroll;
      flex: 1;
      margin-bottom: 120px;
      background: rgb(red, green, blue)
    }
    .contain >>> .el-tabs__content::-webkit-scrollbar{
      display: none;
    }
</style>