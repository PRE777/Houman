<template>
  <el-dialog :visible.sync="editdialog" width="80%" @close='closeDialog'>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="比武情况" name="shouxun">
        <el-container>
          <see :RewardsList='biwudata'></see>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="参战情况" name="canzhan">
        <el-container>
          <see :RewardsList='canzhandata'></see>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="非战争军事行动" name="feizhanzheng">
        <el-container>
          <see :RewardsList='feizhanzhengdata'></see>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="奖惩情况" name="jiangcheng">
        <el-container>
          <see :RewardsList='jiangchengdata'></see>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="演习训练" name="yanxi">
        <el-container>
          <see :RewardsList='yanxidata'></see>
        </el-container>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import see from './see.vue'
export default {
  name: "editperson",
  components: {see},
  data() {
    return {
      editdialog: false,
      showhide:true,
      activeName: "shouxun",
      shouxundata: [],
      yanxidata:[],
      canzhandata: [],
      biwudata:[],
      feizhanzhengdata: [],
      jiangchengdata: [],
      user: ""
    };
  },
  methods: {
    //tab 切换
    handleClick(tab, event) {
      console.log(tab, event);
      // 请求比武接口
      var that = this;
      if( tab.label == '比武情况' ){
        that.biwudata = {
          'data':[
            {'id':1,'qishishijian':'','danwei':'单位1','zhuanye':'专业1'},
            {'id':1,'qishishijian':'','danwei':'单位1','zhuanye':'专业2'}
          ],
          'biaotou':[{'key':'qishishijian','name':'比武时间'},{'key':'danwei','name':'比武单位'},{'key':'zhuanye','name':'比武专业'}],
          'from':{
            'qishishijian': "",
            'danwei': "",
            'zhuanye': "",
          }
        };
      }else if(tab.label == '参战情况'){
        that.canzhandata = {
          'data':[
            {'id':1,'canzhandidian':'','zhandoumingcheng':'单位1','suozaibudui':'专业1','danrenzhiwu':'大笑'},
            {'id':2,'canzhandidian':'','zhandoumingcheng':'战斗机','suozaibudui':'专业1','danrenzhiwu':'大笑'},
          ],
          'biaotou':[{'key':'canzhandidian','name':'参战地点'},{'key':'zhandoumingcheng','name':'战斗名称'},{'key':'suozaibudui','name':'所在部队'},{'key':'danrenzhiwu','name':'担任职务'}],
          'from':{
            'canzhandidian': "",
            'zhandoumingcheng': "",
            'suozaibudui': "",
            'danrenzhiwu':""
          }
        };
      }else if(tab.label == '非战争军事行动'){
        that.feizhanzhengdata = {
          'data':[
            {'id':1,'qishishijian':'','danwei':'单位1','dengji':'专业1','xingshi':'大笑'},
            {'id':2,'qishishijian':'','danwei':'战斗机','dengji':'专业1','xingshi':'大笑'},
          ],
          'biaotou':[{'key':'qishishijian','name':'时间'},{'key':'danwei','name':'单位'},{'key':'dengji','name':'等级'},{'key':'xingshi','name':'形式'}],
          'from':{
            'qishishijian': "",
            'danwei': "",
            'dengji': "",
            'xingshi':""
          }
        };
      }else if(tab.label == '奖惩情况'){
        that.jiangchengdata = {
          'data':[
            {'id':1,'qishishijian':'','danwei':'单位1','mingcheng':'专业1','dengji':'大笑'},
            {'id':2,'qishishijian':'','danwei':'战斗机','mingcheng':'专业1','dengji':'大笑'},
          ],
          'biaotou':[{'key':'qishishijian','name':'时间'},{'key':'danwei','name':'单位'},{'key':'dengji','name':'等级'},{'key':'mingcheng','name':'名称'}],
          'from':{
            'qishishijian': "",
            'danwei': "",
            'mingcheng': "",
            'dengji':""
          }
        };
      }else if(tab.label == '演习训练'){
        that.yanxidata = {
          'data':[
            {'id':1,'qishishijian':'','shulianchengdu':'单位1','chuangjianzhe':'专业1','renzhengpingjia':'大笑'},
            {'id':2,'qishishijian':'','shulianchengdu':'战斗机','chuangjianzhe':'专业1','renzhengpingjia':'大笑'},
          ],
          'biaotou':[{'key':'qishishijian','name':'时间'},{'key':'shulianchengdu','name':'熟练程度'},{'key':'chuangjianzhe','name':'创建者'},{'key':'renzhengpingjia','name':'认证评价'}],
          'from':{
            'qishishijian': "",
            'shulianchengdu': "",
            'chuangjianzhe': "",
            'renzhengpingjia':""
          }
        };
      }
      // 请求参战接口

      // 请求非战争接口

      // 请求奖惩接口

      // 请求演习接口
      
    },
    // 关闭logo的事件
    closeDialog(){
      this.activeName = "shouxun";
      this.showhide = true;
      this.feizhanzhengform={
        qishishijian: "",
        zhongzhishijian: "",
        danwei: "",
        dengji: "",
        xingshi: ""
      };
      this.biwuform={
        qishishijian: "",
        zhongzhishijian: "",
        danwei: "",
        zhuanye: "",
        dengji: "",
        xingshi: ""
      };
      this.canzhanform={
        qishishijian: "",
        zhongzhishijian: "",
        canzhandidian: "",
        zhandoumingcheng: "",
        suozaibudui: "",
        danrenzhiwu: "",
        ligongqingkuang: "",
        canzhanleibie: ""
      };
      this.jiangchengform={
        qishishijian: "",
        danwei: "",
        yuanyin: "",
        mingcheng: "",
        leibie: "",
        dengji: "",
        chexiao: "",
        tonglinghao: ""
      };
      this.yanxiform={
        yuzhong: "",
        huodeshijian: "",
        shulianchengdu: "",
        huoderenzheng: "",
        renzhengpingjia: "",
        chuangjianzhe: "",
        gengxinzhe: ""
      }
    },
    // 删除
    handleDelete(index, row) {
      // 删除接口
        this.idx = index;
        this.biwudata.splice(this.idx, 1);
        console.log('2222')
        // this.delVisible = true;
    },
    // 比武增加
    biwuEven(){
      // 添加新增比武接口
      this.biwuform = JSON.parse(JSON.stringify(this.biwuform))
      console.log(this.biwuform)
      // 比武的数据格式
      var li =  {'id':2,'qishishijian':'','zhongzhishijian':'','danwei':'单位1','zhuanye':'专业1'}
      this.biwudata.push(li)
      //清空
      this.biwuform = {
        qishishijian: "",
        zhongzhishijian: "",
        danwei: "",
        zhuanye: "",
        dengji: "",
        xingshi: ""
      };
    },
    // 比武表格修改回填
    handlxiugai(index,row){
      this.showhide = false;
      this.idx = index;
      const item = this.biwudata[index];
      var obj={};
      obj=JSON.parse(JSON.stringify(item))
      this.biwuform = obj
    },
    //修改比武回填信息
    biwuxiugai(){
      this.showhide = true;
      // console.log(this.Rewardsformss[this.idx])
      console.log(this.biwuform)
      console.log(this.idx)
      this.$set(this.biwudata,this.idx, this.biwuform);
      //清空
      this.biwuform = {
        qishishijian: "",
        zhongzhishijian: "",
        danwei: "",
        zhuanye: "",
        dengji: "",
        xingshi: ""
      };
      // console.log(this.Rewardsformss)
    }
  },
  created(){
      var that = this;
      this.$bus.$on("openPersonInfoEditDialog",function(val){
          that.editdialog=val;
      })
      this.$nextTick(() =>{
        // 请求比武信息接口
        that.biwudata = {
          'data':[
            {'id':1,'qishishijian':'','danwei':'单位1','zhuanye':'专业1'},
            {'id':1,'qishishijian':'','danwei':'单位1','zhuanye':'专业2'}
          ],
          'biaotou':[{'key':'qishishijian','name':'比武时间'},{'key':'danwei','name':'比武单位'},{'key':'zhuanye','name':'比武专业'}],
          'from':{
            'qishishijian': "",
            'danwei': "",
            'zhuanye': "",
          }
        };
      })
  }
};
</script>

