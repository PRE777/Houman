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
          <el-aside width="50%" class="el-aside">
            <el-table :data="feizhanzhengdata" border style="width: 100%">
              <el-table-column prop="date" label="起始时间"></el-table-column>
              <el-table-column prop="name" label="终止时间"></el-table-column>
              <el-table-column prop="jushidanwei" label="军事行动单位"></el-table-column>
              <el-table-column prop="jushidengji" label="军事行动等级"></el-table-column>
              <el-table-column prop="junshixingshi" label="军事行动形式"></el-table-column>
              <el-table-column prop="address" label="操作"></el-table-column>
            </el-table>
          </el-aside>
          <el-main class="el-main_style">
            <el-form ref="feizhanzhengform" :model="feizhanzhengform" label-width="120px">
              <el-form-item label="非战争时间:">
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    placeholder="起始时间"
                    v-model="feizhanzhengform.qishishijian"
                    style="width:90%"
                    class="el-form-item__content"
                  ></el-date-picker>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    placeholder="终止时间"
                    v-model="feizhanzhengform.zhongzhishijian"
                    style="width:90%"
                    class="el-form-item__content"
                  ></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="军事行动单位:">
                <el-input v-model="feizhanzhengform.danwei" class="el-form-item__content"></el-input>
              </el-form-item>
              <el-form-item label="军事行动等级:">
                <el-input v-model="feizhanzhengform.dengji" class="el-form-item__content"></el-input>
              </el-form-item>
              <el-form-item label="军事行动形式:">
                <el-input v-model="feizhanzhengform.xingshi" placeholder="请选择学位"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">增加</el-button>
                <el-button type="primary">修改</el-button>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="奖惩情况" name="jiangcheng">
        <el-container>
          <el-aside width="50%" class="el-aside">
            <el-table :data="jiangchengdata" border style="width: 100%">
              <el-table-column prop="jiangchengtime" label="奖惩时间"></el-table-column>
              <el-table-column prop="jiangchengdanwei" label="奖惩单位"></el-table-column>
              <el-table-column prop="jiangchengyuanyin" label="奖惩原因"></el-table-column>
              <el-table-column prop="jiangchengmingcheng" label="奖惩名称"></el-table-column>
              <el-table-column prop="jaingchengleibie" label="奖惩类别"></el-table-column>
              <el-table-column prop="jiangchengcaozuo" label="操作"></el-table-column>
            </el-table>
          </el-aside>
          <el-main class="el-main_style">
            <el-form ref="jiangchengform" :model="jiangchengform" label-width="80px">
              <el-form-item label="培训时间:" class="el-form-item__content">
                <el-date-picker
                  type="date"
                  placeholder="奖惩时间"
                  v-model="jiangchengform.qishishijian"
                  style="width:90%"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="奖惩单位:">
                <el-input v-model="jiangchengform.danwei" class="el-form-item__content"></el-input>
              </el-form-item>
              <el-form-item label="奖惩原因:">
                <el-input v-model="jiangchengform.yuanyin" class="el-form-item__content"></el-input>
              </el-form-item>
              <el-form-item label="奖惩名称:">
                <el-input v-model="jiangchengform.mingcheng" class="el-form-item__content"></el-input>
              </el-form-item>
              <el-form-item label="奖惩类别:">
                <el-select v-model="jiangchengform.leibie" placeholder="请选择奖惩类别"></el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">增加</el-button>
                <el-button type="primary">修改</el-button>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
      </el-tab-pane>
      <el-tab-pane label="演习训练" name="yanxi">
        <el-container>
          <el-aside width="50%" class="el-aside">
            <el-table :data="yanxidata" border style="width: 100%">
              <el-table-column prop="huodeshijian" label="演习时间"></el-table-column>
              <el-table-column prop="huoderenzheng" label="演习认证"></el-table-column>
              <el-table-column prop="renzhnegpingjia" label="认演习评价"></el-table-column>
            </el-table>
          </el-aside>
          <el-main class="el-main_style">
            <el-form ref="yanxiform" :model="yanxiform" label-width="80px">
              <el-form-item label="演习时间:" class="el-form-item__content">
                <el-date-picker
                  type="date"
                  placeholder="演习时间"
                  v-model="yanxiform.huodeshijian"
                  style="width:90%"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="演习认证:">
                <el-input v-model="yanxiform.huoderenzheng" class="el-form-item__content"></el-input>
              </el-form-item>
              <el-form-item label="演习评价:">
                <el-input v-model="yanxiform.renzhengpingjia" class="el-form-item__content"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">增加</el-button>
                <el-button type="primary">修改</el-button>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import see from "@/components/personDataSource/see.vue";
export default {
  name: "editperson",
  components: {see},
  data() {
    return {
      editdialog: false,
      showhide:true,
      activeName: "shouxun",
      feizhanzhengform:{
        qishishijian: "",
        zhongzhishijian: "",
        danwei: "",
        dengji: "",
        xingshi: ""
      },
      biwuform: {
        qishishijian: "",
        zhongzhishijian: "",
        danwei: "",
        zhuanye: "",
        dengji: "",
        xingshi: ""
      },
      canzhanform: {
        qishishijian: "",
        zhongzhishijian: "",
        canzhandidian: "",
        zhandoumingcheng: "",
        suozaibudui: "",
        danrenzhiwu: "",
        ligongqingkuang: "",
        canzhanleibie: ""
      },
      jiangchengform: {
        qishishijian: "",
        danwei: "",
        yuanyin: "",
        mingcheng: "",
        leibie: "",
        dengji: "",
        chexiao: "",
        tonglinghao: ""
      },
      yanxiform: {
        yuzhong: "",
        huodeshijian: "",
        shulianchengdu: "",
        huoderenzheng: "",
        renzhengpingjia: "",
        chuangjianzhe: "",
        gengxinzhe: ""
      },
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

