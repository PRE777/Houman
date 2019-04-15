<template>
  <div class="wrap">
    <div class="header">
      <navbar></navbar>
    </div>
    <div class="main">
      <div class="crumbs">
        当前位置 (系统门户)
        <el-button
          type="primary"
          icon="search"
          class="setGw"
          style="margin-left:100px;padding: 7px;"
          @click="fenzu"
        >自定义分组</el-button>
      </div>
      <div class="drag-box">
        <draggable v-model="menus" :options="drag" class="drag-boxs">
          <div class="drag-box-item" v-for="(items,index) in menus" :key="index">
            <div class="item-title">{{items.name}}</div>
            <draggable v-model="items.children" @remove="removeHandle" :options="dragOptions">
              <transition-group tag="div" id="todo" class="item-ul">
                <div v-for="item in items.children" class="drag-list" :key="item.id">
                  <img :src="item.img">
                  <div>{{item.names}}</div>
                </div>
                <!-- <div class="list">
                  <div v-for="element in items.children" :key="element.id"
                      class="li" @click="icon(element.path)">
                      <img :src="element.img"/>
                      <div>{{element.names}}</div>
                  </div>
                </div>-->
              </transition-group>
            </draggable>
          </div>
        </draggable>
        <!-- <div class="drag-box-item">
          <div class="item-title">todo</div>
          <draggable v-model="todo" @remove="removeHandle" :options="dragOptions">
            <transition-group tag="div" id="todo" class="item-ul">
              <div v-for="item in todo" class="drag-list" :key="item.id">{{item.content}}</div>
            </transition-group>
          </draggable>
        </div>-->
        <!-- <div class="drag-box-item">
          <div class="item-title">doing</div>
          <draggable v-model="doing" @remove="removeHandle" :options="dragOptions">
            <transition-group tag="div" id="doing" class="item-ul">
              <div v-for="item in doing" class="drag-list" :key="item.id">{{item.content}}</div>
            </transition-group>
          </draggable>
        </div>
        <div class="drag-box-item">
          <div class="item-title">done</div>
          <draggable v-model="done" @remove="removeHandle" :options="dragOptions">
            <transition-group tag="div" id="done" class="item-ul">
              <div v-for="item in done" class="drag-list" :key="item.id">{{item.content}}</div>
            </transition-group>
          </draggable>
        </div>
        <div class="drag-box-item">
          <div class="item-title">home</div>
          <draggable v-model="dones" @remove="removeHandle" :options="dragOptions">
            <transition-group tag="div" id="done" class="item-ul">
              <div v-for="item in dones" class="drag-list" :key="item.id">{{item.content}}</div>
            </transition-group>
          </draggable>
        </div>-->
      </div>
    </div>
    <!-- 修改弹出框 -->
    <el-dialog title="自定义分组名称" :visible.sync="editVisible" width="60%">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="分组名称">
          <el-input v-model="form.name"></el-input>
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
import Navbar from "@/views/Dashboard/Navbar.vue";
import Footer from "@/views/Dashboard/footer.vue";
import luan from "../../../src/assets/images/404.png";
import ln from "../../../src/assets/images/404_cloud.png";
import draggable from "vuedraggable";
export default {
  name: "dashboard",
  components: { Navbar, Footer, draggable },
  data() {
    return {
      user: "",
      editVisible: false,
      dragOptions: {
        animation: 120,
        scroll: true,
        group: "sortlist",
        ghostClass: "ghost-style"
      },
      form: {
        name: ""
      },
      drag: {
        animation: 120,
        scroll: true
      },
      menus: [
        {
          name: "基础服务",
          id: "1",
          children: [
            {
              names: "系统门户",
              path: "/sysInfor",
              img: luan,
              qx: true,
              id: "123"
            },
            // {'names':'综合态势展示1','path':'/cesiumShow','img':ln,'qx':true,id:"1-2"},
            {
              names: "核心用户管理",
              path: "/coreUser",
              img: ln,
              qx: true,
              id: "1234"
            },
            {
              names: "编制岗位",
              path: "/bzLish",
              img: ln,
              qx: true,
              id: "12"
            },
            {
              names: "综合信息检索",
              path: "/zhIfor",
              img: ln,
              qx: true,
              id: "15"
            },
            {
              names: "人员身份管理",
              path: "/peopleGl",
              img: ln,
              qx: true,
              id: "16"
            },
            {
              names: "单位信息管理",
              path: "/dwIfor",
              img: ln,
              qx: true,
              id: "17"
            }
          ]
        },
        {
          name: "基础xxx",
          id: "21",
          children: [
            {
              names: "系统门户2222",
              path: "/sysInfor",
              img: luan,
              qx: true,
              id: "221"
            },
            {
              names: "综合态势展示2222",
              path: "/cesiumShow",
              img: ln,
              qx: true,
              id: "232"
            },
            {
              names: "系统门户3333",
              path: "/sysInfor",
              img: luan,
              qx: true,
              id: "243"
            },
            {
              names: "综合态势展示4444",
              path: "/cesiumShow",
              img: ln,
              qx: true,
              id: "254"
            },
            {
              names: "系统门户76545",
              path: "/sysInfor",
              img: luan,
              qx: true,
              id: "255"
            },
            {
              names: "综合态势展示556",
              path: "/cesiumShow",
              img: ln,
              qx: true,
              id: "256"
            }
          ]
        }
      ],
      todo: [
        {
          id: 1,
          content: "开发图表组件"
        },
        {
          id: 2,
          content: "开发拖拽组件"
        },
        {
          id: 3,
          content: "开发权限测试组件"
        }
      ],
      doing: [
        {
          id: 4,
          content: "开发登录注册页面"
        },
        {
          id: 5,
          content: "开发头部组件"
        },
        {
          id: 6,
          content: "开发表格相关组件"
        },
        {
          id: 7,
          content: "开发表单相关组件"
        }
      ],
      done: [
        {
          id: 8,
          content: "初始化项目，生成工程目录，完成相关配置"
        },
        {
          id: 9,
          content: "开发项目整体框架"
        }
      ],
      dones: [
        {
          id: 10,
          content: "初始化项目，生成工程目录，完成相关配置"
        },
        {
          id: 11,
          content: "开发项目整体框架"
        }
      ]
    };
  },
  methods: {
    removeHandle(event) {
      console.log(event);
      this.$message.success(`从 ${event.from.id} 移动到 ${event.to.id} `);
    },
    fenzu() {
      this.editVisible = true;
    },
    saveEdit() {
      this.editVisible = false;
      const list = {
        name: this.form.name,
        id: "1123",
        children: []
      };
      this.menus.push(list);
    }
  }
};
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.header {
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 0px;
  font-size: 22px;
  color: #fff;
}
.main {
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
  background: #f0f0f0;
  width: 100%;
}
.main::-webkit-scrollbar {
  display: none;
}
.drag-box {
  padding-top: 59px;
}
.drag-boxs {
  display: flex;
  flex-wrap: wrap;
}
.drag-box-item {
  flex: 1;
  max-width: 330px;
  min-width: 300px;
  background-color: #eff1f5;
  margin-right: 16px;
  border-radius: 6px;
  border: 1px #e1e4e8 solid;
  margin-bottom: 14px;
}
.item-title {
  padding: 8px 8px 8px 12px;
  font-size: 14px;
  line-height: 1.5;
  color: #24292e;
  font-weight: 600;
}
.item-ul {
  padding: 0 8px 8px;
  padding-left: 21px;
  height: 300px;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
}
.item-ul::-webkit-scrollbar {
  width: 0;
}
.drag-list {
  width: 140px;
  height: 151px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
  border: 1px #e1e4e8 solid;
  /* padding: 10px; */
  margin: 5px 5px 10px 0px;
  list-style: none;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
  -webkit-transition: border 0.3s ease-in;
  transition: border 0.3s ease-in;
}
.drag-list img {
  display: block;
  width: 100px;
  height: 100px;
}
.drag-list div {
  margin-top: 10px;
}
.drag-list:hover {
  border: 1px solid #20a0ff;
}
.drag-title {
  font-weight: 400;
  line-height: 25px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
.ghost-style {
  display: block;
  color: transparent;
  border-style: dashed;
}
.crumbs {
  width: 100%;
  height: 48px;
  background: #ffffff;
  box-shadow: 2px 2px 4px 0 rgba(209, 209, 209, 0.5);
  font-family: PingFangSC-Regular;
  font-size: 18px;
  color: #5173a8;
  line-height: 48px;
  padding-left: 30px;
  box-sizing: border-box;
  position: absolute;
  z-index: 222;
}

.list {
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
}
.list .li {
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
.list .li img {
  display: block;
  width: 100px;
  height: 100px;
}
.list .li div {
  margin-top: 10px;
}
</style>