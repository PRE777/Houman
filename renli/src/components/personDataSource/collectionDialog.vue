<template>
  <el-dialog title="收藏列表" :visible.sync="dialogVisible" width="70%">
    <el-table :data="collectionData" border>
      <el-table-column prop="datetime" label="收藏时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
function searchItem() {
  this.searchType = "";
  this.condition = "";
  this.value = "";
  this.search_selectedData = false;
  this.search_selectedLevel = false;
  this.logic = "";
}
import { LoadCollections } from "@/components/personDataSource/interface";
export default {
  name: "collection",
  data() {
    return {
      dialogVisible: false,
      collectionData: [{ datetime: "2019-4-9 13:53:00" }]
    };
  },
  created() {
    var that = this;
    this.$bus.$on("collectionDialog", function(val) {
      that.dialogVisible = true;
      var response = LoadCollections(val);
      //返回值加载数据  collectionData
    });
  },
  methods: {
    handleClick: function(row) {
        
      var collection1 = {
        condition: ">",
        logic: "and",
        searchType: "1",
        search_selectedData: true,
        search_selectedLevel: false,
        value: "2019-4-1"
      };
        var collection2 = {
        condition: "<",
        logic: "",
        searchType: "1",
        search_selectedData: true,
        search_selectedLevel: false,
        value: "2019-4-9"
      };
      var collections=[];
      collections.push(collection1);
      collections.push(collection2);

      this.$bus.$emit("getCollection",collections);
      this.dialogVisible=false;
    }
  }
};
</script>