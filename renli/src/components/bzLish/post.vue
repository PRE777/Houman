<template>
  <!-- 编制岗位 -->
  <div class="gen">
    <div class="title">
      <!-- {{gweven.lable}} -->
      <span>
        当前编制岗位
        <span style="color: #5C88F1;">(当前位置：{{ids.lable}}）</span>
      </span>
      <el-button
        style="color: #689BFE;border: 1px solid #689BFE;border-radius: 0px;padding: 7px 10px;"
        size="medium"
        round
        icon="el-icon-plus"
        @click="setGw"
      >新建编制岗位</el-button>
    </div>
    <el-table
      :data="data"
      border
      :header-cell-style="{background:'#EDEDF4'}"
      class="table"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="date" label="生日"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="gw" label="职位"></el-table-column>
      <el-table-column prop="address" label="编码"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-view" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="handleDelete(scope.$index, scope.row)"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="1000"
      ></el-pagination>
    </div>
    <!-- 新建编制岗位 -->
    <el-dialog title="新建编制岗位" :visible.sync="creatGroup" width="70%" :before-close="closeDialog">
      <el-dropdown>
        <span class="el-dropdown-link">
          携带信息
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
          <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-check-outline">蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <div class="flex">
          <el-form-item label="编制号" prop="bainzhihao">
            <el-input v-model="ruleForm.bianzhihao"></el-input>
          </el-form-item>
          <el-form-item label="部别" prop="name">
            <el-input v-model="ruleForm.bubie"></el-input>
          </el-form-item>
        </div>
        <div class="flex">
          <el-form-item label="职务名称" prop="name">
            <el-input v-model="ruleForm.zhiwumingcheng"></el-input>
          </el-form-item>
          <el-form-item label="职务等级" prop="name">
            <el-input v-model="ruleForm.zhiwudengji"></el-input>
          </el-form-item>
        </div>
        <div class="flex">
          <el-form-item label="详情别码" prop="name">
            <el-input v-model="ruleForm.xiangqingbeima"></el-input>
          </el-form-item>
          <el-form-item label="编制员额" prop="name">
            <el-input v-model="ruleForm.bainzhiyuane"></el-input>
          </el-form-item>
        </div>
        <div class="flex">
          <el-form-item label="军官文职" prop="region">
            <el-select v-model="ruleForm.wenzhi" placeholder="请选择职位">
              <el-option label="文职" value="shanghai"></el-option>
              <el-option label="士兵" value="beijing"></el-option>
              <el-option label="干部" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="在编情况" prop="regions">
            <el-select v-model="ruleForm.bianzhi" placeholder="请选择编制">
              <el-option label="编内" value="shanghai"></el-option>
              <el-option label="编外" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="callOf(ruleForm)">取 消</el-button>
        <el-button type="primary" @click="gangweiEven(ruleForm)">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑弹出框 -->
    <!-- <el-dialog title="编辑" :visible.sync="editVisible" width="40%">
      <el-form ref="form" :model="form" label-width="50px">
        <el-form-item label="生日">
          <el-date-picker
            type="date"
            placeholder="生日"
            v-model="form.date"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="编码">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="form.gw"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>-->
  </div>
</template>

<script>
export default {
  name: "basetable",
  data() {
    return {
      creatGroup: false,
      ids: {},
      ruleForm: {
        bainzhihao: null,
        region: null,
        date1: null,
        date2: null,
        delivery: false,
        type: [],
        resource: null,
        desc: null
      },
      rules: {
        bainzhihao: [
          { required: true, message: "请输入数字", trigger: "blur" }
        ],
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
      data: [
        {
          date: "1997-11-11",
          name: "林丽",
          age: "18",
          gw: "正团",
          address: "12341"
        },
        {
          date: "1987-09-24",
          name: "文敏",
          age: "18",
          gw: "正团",
          address: "123"
        },
        {
          date: "1996-08-08",
          name: "杨秀兰",
          age: "18",
          gw: "正团",
          address: "2222"
        },
        {
          date: "1978-06-18",
          name: "魏强",
          age: "18",
          gw: "正团",
          address: "11111"
        },
        {
          date: "1977-07-09",
          name: "石秀兰",
          age: "18",
          gw: "正团",
          address: "4444"
        },
        {
          date: "1994-09-20",
          name: "朱洋",
          age: "18",
          gw: "正团",
          address: "55555"
        },
        {
          date: "1980-01-22",
          name: "傅敏",
          age: "18",
          gw: "正团",
          address: "23424"
        },
        {
          date: "1985-10-10",
          name: "毛明",
          age: "18",
          gw: "正团",
          address: "234"
        },
        {
          date: "1975-09-08",
          name: "何静",
          age: "18",
          gw: "正团",
          address: "33333"
        },
        {
          date: "1970-06-07",
          name: "郭秀英",
          age: "18",
          gw: "正团",
          address: "876543"
        }
      ]
    };
  },
  components: {},
  watch: {
    count(newCount, oldCount) {
      if (oldCount.id == newCount.id) {
      } else {
        console.log(newCount, "岗位");
        this.ids = newCount;
      }
    }
  },
  computed: {
    count() {
      return this.$store.state.gw.station;
    }
  },
  created() {
    this.ruleForm ={
        bainzhihao: null,
        region: null,
        date1: null,
        date2: null,
        delivery: false,
        type: [],
        resource: null,
        desc: null
    }
    console.log(this.$store.state.gw.station);
    this.ids = this.$store.state.gw.station;
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
    },
    // 新建岗位
    setGw() {
      this.creatGroup = true;
      console.log(this.ruleForm)
    },
    // 确定保存新建岗位
    gangweiEven(ruleForm) {
      this.creatGroup = false;
       this.$nextTick(() => {
          this.$refs["ruleForm"].resetFields();
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      this.idx = index;
      const item = this.tableData[index];
      this.form = {
        name: item.name,
        date: item.date,
        address: item.address
      };
      this.editVisible = true;
    },
    handleDelete(index, row) {
      this.idx = index;
      this.delVisible = true;
    },
    //关闭新建的
    callOf(ruleForm) {
      this.creatGroup = false;
       this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
      });
    },
    closeDialog() {
      this.creatGroup = false;
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
      });
    }
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
.gen {
  width: 100%;
}
</style>
