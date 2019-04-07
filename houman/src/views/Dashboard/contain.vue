<template>
    <div class="contain">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基础服务" name="first">
            <ul class="list">
                <li v-for="(item,index) in list" :key="index" @click="icon(item.path)">
                    <img :src="item.img"/>
                    <div>{{item.names}}</div>
                </li>
              </ul>
        </el-tab-pane>
        <el-tab-pane label="信息管理应用" name="second"></el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import lists from '@/router/menus.js'
  export default {
    name: "contain",
    data () {
      return {
        list:lists,
        activeName: 'first',
        menus:[
          {
            name:"基础服务",
            id:"1", 
            children:[
              {'names':'系统门户','path':'','img':'','qx':true,'id':"1-1"},
              {'names':'综合态势展示','path':'','img':'','qx':true},
              {'names':'核心用户管理','path':'','img':'','qx':true},
              {'names':'权限管控','path':'','img':'','qx':true},
            ]
          },
          {
            name:"信息管理应用",
            id:"2", 
            children:[
              {'names':'系统门户','path':'/sysInfor','img':'','qx':true},
              {'names':'综合态势展示','path':'/cesiumShow','img':'','qx':true},
              {'names':'核心用户管理','path':'/hxgl','img':'','qx':true},
              {'names':'权限管控','path':'/qxgk','img':'','qx':true},
            ]
          },
          {
            name:"信息服务应用",
            id:"3",
            children:[
              {'names':'系统门户','path':'','img':'','qx':true},
              {'names':'综合态势展示','path':'','img':'','qx':true},
              {'names':'核心用户管理','path':'','img':'','qx':true},
              {'names':'权限管控','path':'','img':'','qx':true},
            ]
          },
          {
            name:"全息动态监控应用",
            id:"4",
            children:[
              {'names':'系统门户','path':'','img':'','qx':true},
              {'names':'综合态势展示','path':'','img':'','qx':true},
              {'names':'核心用户管理','path':'','img':'','qx':true},
              {'names':'权限管控','path':'','img':'','qx':true},
            ]
          },
          {
            name:"作战支持应用",
            id:"5",
            children:[
              {'names':'系统门户','path':'','img':'','qx':true},
              {'names':'综合态势展示','path':'','img':'','qx':true},
              {'names':'核心用户管理','path':'','img':'','qx':true},
              {'names':'权限管控','path':'','img':'','qx':true},
            ]
          },
          {
            name:"业务应用",
            id:"6",
            children:[
              {'names':'系统门户','path':'','img':'','qx':true},
              {'names':'综合态势展示','path':'','img':'','qx':true},
              {'names':'核心用户管理','path':'','img':'','qx':true},
              {'names':'权限管控','path':'','img':'','qx':true},
            ]
          }
        ]
      }
    },
    methods: {
      // table
      handleClick(tab, event) {
        console.log(tab, event);
      },
      icon:function(path){
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