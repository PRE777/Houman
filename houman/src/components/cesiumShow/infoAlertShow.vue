<template>
  <div class="container" v-show="isShow">
    <div id="detailStyle">
      <div class="titleStyle">
        <label class="labelStyle">详细信息</label>
        <button class="closeBtnStyle" @click="closeBtnEvent">关闭</button>
      </div>
      <div id="fromContainer">
        <!-- <el-form ref="form" label-width="80px" v-for="(item,index) in infoLists" :key="index">
          <el-form-item :label="item.name">
            
            <el-form-item class="el-form-item-newClass" :label="item.detail"></el-form-item>
            <el-input type="textarea" v-model="item.detail" :disabled = "true"></el-input>
          </el-form-item>
        </el-form>-->

        <table class="tableStyle" v-for="(item,index) in infoLists" :key="index">
          <tr>
            <th class="thStyle" >{{item.name}}</th>
            <td calss="tdStyle">{{item.detail}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    };
  },
  mounted: function() {},
  watch: {
    // show(newVal) {
    // }
    infoLists(newVal) {
      console.log("newVal " + newVal);
    }
  },
  methods: {
    closeBtnEvent: function() {
      this.isShow = false;
      this.$emit("isShow", false);
      return;
      for (let i = 0; i < this.$parent.$children.length; i++) {
        const element = this.$parent.$children[i];
        if (element.$vnode.tag.indexOf("InfoAlertShow") != -1) {
          // 删除
          this.$parent.$children.splice(i, 1);
        }
      }
      console.log(this.$parent.$children);
    }
  },
  // 父控件传子空间
  props: {
    show: {
      type: Boolean,
      default: () => false
    },
    infoLists: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  position: absolute;
  align-items: center;
  justify-content: center;
}
.titleStyle {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 5%;
  text-align: center;
}
.labelStyle {
  width: 370px;
  height: 100%;
}
.closeBtnStyle {
  border-style: none;
  right: 0px;
  top: 0px;
  outline: none;
  height: 100%;
  width: 50px;
}
#detailStyle {
  border-radius: 3px;
  width: 420px;
  height: 420px;
  background-color: white;
}
#fromContainer {
  width: 100%;
  height: 95%;
  background-color: white;
  overflow-y: scroll;
}
.tableStyle{
  /* border: 0; */
  margin-top: 30px;
}
.thStyle{
  width:100px;
}
.tdStyle{
  width:300px;
}
</style>
