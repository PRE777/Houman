<template>
  <!-- 编制岗位 -->
  <div class="gen">
    <div class="title">
      <span>
        岗位组管理
        <span style="color: #5C88F1;">(当前位置：{{ids.lable}}）</span>
      </span>
      <el-button
        style="color: #689BFE;border: 1px solid #689BFE;border-radius: 0px;padding: 7px 10px;"
        size="medium"
        round
        icon="el-icon-plus"
        @click="setFdGw"
      >新建浮动岗位组</el-button>
    </div>
    <el-table :data="tableDatas" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="岗位组名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="浮动类型">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="编制比例">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="包含岗位">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="岗位组名称" prop="id"></el-table-column>
      <el-table-column label="浮动类型" prop="name"></el-table-column>
      <el-table-column label="人数" prop="desc"></el-table-column>
      <el-table-column label="单位名称" prop="desc"></el-table-column>
      <el-table-column label="部门" prop="desc"></el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="1000"
      ></el-pagination>
    </div>
    <!-- 新建浮动岗位组 -->
    <el-dialog title="新建浮动岗位组" :visible.sync="gangweizu" width="70%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demos-ruleForm"
      >
        <div style="magrin:15px 0px;font-size:14px;">岗位组命名：</div>
        <div class="flex">
          <el-form-item label="岗位组名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="浮动类型" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </div>
        <div style="magrin:15px 0px;font-size:14px;">编配比例：</div>
        <div class="flex">
          <el-form-item label="编制岗位" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="编制岗位占比" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </div>
        <div style="magrin:15px 0px;font-size:14px;">包含岗位：</div>
        <div class="flexs">
          <el-form-item label="单位名称" prop="region">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="部门" prop="region">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="岗位名称" prop="region">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="gangweizu = false">取 消</el-button>
        <el-button type="primary" @click="gangweizuEven">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "basetable",
  data() {
    return {
      gangweizu: false,
      ids:'',
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
      tableDatas: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        }
      ]
    };
  },
  components: {

  },
  watch: {
    count (newCount, oldCount) {
      
      if( oldCount.id ==  newCount.id){

      }else{
        console.log(newCount,'岗位组')
        this.ids = newCount;
      }
    }
  },
  computed: {
    count () {
      return this.$store.state.gw.station
    }
  },
  created(){
    console.log(this.$store.state.gw.station)
    this.ids = this.$store.state.gw.station
    // 请求岗位组的接口
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
    },
    // 新建浮动岗位组
    setFdGw() {
      this.gangweizu = true;
    },
    // 确定保存新建岗位组
    gangweizuEven() {}
  }
};
</script>

<style scoped>
.flexs {
  display: flex;
  flex-wrap: wrap;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.flex .el-form-item {
  flex: 1;
  margin-right: 10px;
}
.title {
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pagination {
  position: fixed;
  bottom: 10px;
}
.gen{
  width: 100%;
}
</style>
