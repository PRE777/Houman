<template>
  <!-- 编制岗位 -->
  <div class="gen">
    <div class="title">
      <span>
        岗位/岗位组列表
        <span style="color: #5C88F1;">(当前位置：{{ids.lable}}）</span>
      </span>
    </div>
    <div class="contentrl">
      <ul class="contentrlist">
        <li
          v-for="(item,index) in listzw"
          :key="index"
          :class="nums == index? 'a':''"
          @click="viewList(item.id,index)"
        >{{item.name}}</li>
      </ul>
      <div style="flex:1;">
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
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="1000"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "basetable",
  data() {
    return {
      ids: "",
      listzw: [{ name: "主任", id: "1" }, { name: "副主任", id: "2" }],
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
      ],
      nums: "biao"
    };
  },
  components: {},
  watch: {
    count(newCount, oldCount) {
      if (oldCount.id == newCount.id) {
      } else {
        console.log(newCount, "视图");
        this.ids = newCount;
        // 点击树---更改视图---兵请求接口
        this.listzw = [{ name: "主任1", id: "1" }, { name: "副主任1", id: "2" }];
        this.nums= "biao";
      }
    }
  },
  computed: {
    count() {
      return this.$store.state.gw.station;
    }
  },
  created() {
    console.log(this.$store.state.gw.station);
    // 重新加载---请求接口
    this.ids = this.$store.state.gw.station;
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    viewList(id, index) {
      console.log(id);
      this.nums = index;
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
.contentrl {
  display: flex;
}
.contentrlist {
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: #666666;
  letter-spacing: 0;
  width: 190px;
  min-height: 200px;
  margin: 0 10px;
  background: #ffffff;
  border: 1px solid #dddddd;
  list-style: none;
}
.contentrlist li {
  margin: 20px;
}
.pagination {
  position: fixed;
  bottom: 10px;
}
.gen {
  width: 100%;
}
.a {
  color: aqua;
}
.b {
  background: blue;
}
</style>
