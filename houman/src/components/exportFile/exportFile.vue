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

// import func from "../../../vue-temp/vue-editor-bridge";
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
          ExportName: "2-导出Csv",
          ExportID: "Csv"
        },
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
      } else if (fileType == "Csv") {
        this.exportCSV(
          this.exportData,
          this.exportColumns,
          keys,
          this.subExportFileName
        );
      } else if (fileType == "Pdf") {
        let tempArray = [];
        let labels = titles.join(","); // title拼接成一个字符串
        let keys2 = keys.join(","); // 拼接字符串
        let row0 = this.exportData[0]; //导出数组内容的第一行
        var rowKeys = [];
        for (var p1 in row0) {
          // 数组
          if (row0.hasOwnProperty(p1)) {
            rowKeys.push(p1); // table内容的 key
          }
        }
        // keys 和 table的第一列的key比较 取table中不存在的列 为了赋空值
        var diffArray = keys.filter(key => !rowKeys.includes(key));
        let tableData = [];
        // 循环数组
        this.exportData.forEach((rowItem, index) => {
          let temp = rowItem;
          diffArray.forEach((keyItem, index) => {
            temp[keyItem] = " ";
          });
          tableData.push(temp);
        });
        this.exportPdfFile(keys2, labels, tableData);
      }
    },
    getRow: function(row, keys) {
      let obj = {};
      keys.forEach(col => {
        // debugger;
        let val = row[col];
        obj[col] = val;
      });
      return obj;
    },

    // 导出CSV
    exportCSV: function(data, columns, keys, fileName) {
      //导出的数据行集合
      const rows = data.map(t => this.getRow(t, keys));
      //导出的数据列标题
      var fields = [];
      columns.forEach(t => {
        if (t.key != "handle") {
          // 操作列定义为handle
          let temp = {
            value: t.key,
            label: t.title
          };
          fields.push(temp);
        }
      });

      try {
        const result = json2csv.parse(rows, {
          fields: fields,
          excelStrings: true
        });
        if (this.myBrowserIsIE()) {
          // IE10以及Edge浏览器
          var BOM = "\uFEFF";
          var csvData = new Blob([BOM + result], { type: "text/csv" });
          navigator.msSaveBlob(csvData, `${fileName}.csv`);
        } else {
          let csvContent = "data:text/csv;charset=utf-8,\uFEFF" + result;
          // 非ie 浏览器
          this.createDownLoadClick(csvContent, `${fileName}.csv`);
        }
      } catch (err) {
        alert(err);
      }
    },

    // 导出pdf文件
    exportPdfFile: function(valueKeys, labeNames, tableData) {
      let rexportPdfFile = {
        ExCode: "DownLoadFile",
        fileName: this.subExportFileName,
        access_token: this.$cookies.get("access_token"),
        valueKeys: valueKeys, // 例如 "Product,Version,Description",
        labeNames: labeNames, // 例如 "产品,版本,描述",
        tableData: tableData
      };
      // 思路 webapi返回二进制的文件流 js 通过Blob接收并转换成pdf文件下载
      this.$axios({
        method: "post",
        Prefix: "",
        data: {
          ExCode: "IRAP_RPT_DownLoadFile",
          fileName: this.subExportFileName,
          access_token: this.$cookies.get("access_token"),
          valueKeys: valueKeys, //"Product,Version,Description",
          labeNames: labeNames, // "产品,版本,描述",
          tableData: tableData
        }
        // responseType:'blob'
      })
        .then(response => {
          // base64字符串转 byte[]
          var bstr = atob(response.data.FileInfo),
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          // 转blob
          var blob = new Blob([u8arr], {
            type: `application/pdf;charset-UTF-8`
          });

          if (this.MyBrowserIsIE()) {
            // IE10以及Edge浏览器
            var BOM = "\uFEFF";
            // 传入 Blob 对象
            navigator.msSaveBlob(blob, `${this.subExportFileName}.pdf`);
          } else {
            // 非ie 浏览器
            let content = window.URL.createObjectURL(blob);
            this.createDownLoadClick(content, `${this.subExportFileName}.pdf`);
          }
        })
        .catch(err => {
          console.log(err);
        });
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
