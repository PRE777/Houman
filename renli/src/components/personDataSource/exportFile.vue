<template>
  <div class="dropdownBox">
    <div class="dropDiv">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          导出
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <template v-for="(item,index) in exportList">
            <el-dropdown-item
              :key="`${_uid}_${index}`"
              @click.native="selectExportFormat(item.ExportID)"
            >{{item.ExportName}}</el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import json2csv from "json2csv";
import XLSX from "../../assets/js/exportFile/exportEXCFile.js";
import { readesxle } from "../../assets/js/exportFile/exportEXCFile.js";
import FileSaver from "file-saver";

export default {
  name: "EXPORTFILE",
  data() {
    return {
      exportList: [
        {
          ExportName: "1-导出Excel",
          ExportID: "Excel"
        },
        {
          ExportName: "2-导出Json",
          ExportID: "Json"
        }
        // {
        //   ExportName: "3-导出Csv",
        //   ExportID: "Csv"
        // }
        // {
        //   ExportName: "3-导出Pdf",
        //   ExportID: "Pdf"
        // }
      ],
      subExportFileName: ""
    };
  },
  // 父控件传子空间
  props: {
    // 需要导出的数据
    exportData: {
      type: Array,
      default: () => []
    },
    // 是否分页
    isPagination: {
      type: Boolean,
      default: () => false
    },
    exportColumns: {
      type: Array,
      default: () => []
    },
    // 导出后的文件名
    exportFileName: {
      type: String,
      default: () => ""
    }
  },
  watch: {
    exportFileName: function(newVal, oldVal) {
      console.log("======" + newVal, oldVal);
      this.subExportFileName = exportFileName;
    }
  },
  computed: {},
  mounted() {
    // this.getRPTExportType() 初始化导出类型
    // console.log("exportFileName"+this.exportFileName);
  },
  methods: {
    // 选择导出方式
    selectExportFormat: function(value) {
      let val = value;
      console.log(val);
      this.exportFile(val);
    },

    formatDate: function(date) {
      // yyyy-MM-dd hh:mm:ss
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = minute < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },

    // 导出数据相关方法
    /**
     * IE浏览器 不支持a标签进行下载，会打开url
     * 故对于微软系浏览器（IE和Edge）和非微软系列浏览器采用两种不同的方式进行下载
     * IE和Edge 采用了 navigator.msSaveBlob 方法
     * 此方法为IE10及以上特有，
     * IE10以下勿采用非微软浏览器 使用a标签的click事件进行下载
     */
    //创建a标签下载
    createDownLoadClick: function(content, fileName) {
      const link = document.createElement("a");
      link.href = encodeURI(content);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    // 判断是否IE浏览器
    myBrowserIsIE: function() {
      let isIE = false;
      if (
        navigator.userAgent.indexOf("compatible") > -1 &&
        navigator.userAgent.indexOf("MSIE") > -1
      ) {
        // ie浏览器
        isIE = true;
      }
      if (navigator.userAgent.indexOf("Trident") > -1) {
        // edge 浏览器
        isIE = true;
      }
      return isIE;
    },
    btnExport: function(fileType) {
      //   debugger;
      // 如果是分页的
      if (this.isPagination == true) {
        // 向父组件提交一个需要重新传数据的方法 类型name
        this.$emit("myHandleRepeatExprot", fileType);
      } else {
        // 不分页直接导出
        this.exportFile(fileType);
      }
    },
    //  导出数据
    exportFile: function(fileType) {
      if (this.exportData.length == 0) {
        this.$Message.error("不允许导出空表格");
        return false;
      }
      if (this.exportFileName == "") {
        this.subExportFileName = this.formatDate(new Date());
      }
      this.exportData.forEach((item, index) => {
        let temp = {};
        // 循环数组中的对象 当传入数据为undefined的时候 赋空
        Object.keys(item).forEach(function(key) {
          if (item[key] == undefined) {
            item[key] == " ";
            temp[key] = "";
          } else {
            temp[key] = item[key];
          }
        });
        this.exportData[index] = temp;
      });

      let titles = []; // 导出内容的中文标题
      let keys = []; // 导出内容的英文标题
      this.exportColumns.forEach((item, index) => {
        if (item.key != "handle") {
          // 操作列定义为 handle
          titles.push(item.title);
          keys.push(item.key);
        }
      });
      if (fileType == "Excel") {
        const param = {
          title: titles,
          key: keys,
          data: this.exportData,
          autoWidth: true,
          filename: this.subExportFileName
        };
        XLSX.export_array_to_excel(param);
      } else if (fileType == "Json") {
        const data = JSON.stringify(this.exportData);
        const blob = new Blob([data], { type: "" });
        FileSaver.saveAs(blob, this.subExportFileName + ".json");
      }
    },
   
    getRPTExportType: function() {
      this.$axios({
        method: "post",
        Prefix: "",
        data: {
          ExCode: "IRAP_RPT_ExportType",
          access_token: this.$cookies.get("access_token")
        }
      })
        .then(response => {
          if (response.data.ErrCode == 0) {
            this.exportList = response.data.Rows;
          } else {
            this.$Message.error(response.data.ErrText);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.dropdownBox {
  display: flex;
  height: 30px;
}
.dropDiv {
  display: flex;
  width: 60px;
  height: 25px;
  background-color: transparent;
  align-items: center;
  justify-content: center;
}
</style>
