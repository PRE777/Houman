<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" size="small"></el-input>
      </el-form-item>
      <el-form-item label="籍贯">
        <el-select v-model="formInline.region" size="small">
          <el-option label="山东" value="shanghai"></el-option>
          <el-option label="山西" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身份号">
        <el-input v-model="formInline.identity" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSubmit" style="width:200px">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="personInfo" border>
      <el-table-column prop="姓名" label="姓名"></el-table-column>
      <el-table-column prop="年龄" label="年龄"></el-table-column>
      <el-table-column prop="籍贯" label="籍贯"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="mini">配偶信息</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "persondata",
  data() {
    return {
      personInfo: [{ 姓名: "张三", 年龄: "20", 籍贯: "山东" }],
      formInline: {
        name: "",
        region: "",
        identity: ""
      }
    };
  },
  methods: {
    handleClick: function(row) {
        this.$bus.$emit("postPerson",row);
    },
    onSubmit: function() {}
  }
};
</script>
