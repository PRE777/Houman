<template>
  <div class="dropdownBox">
    <span class="fileinput-button">
      <span class="spanStyle">上传</span>
      <input
        id="upload"
        type="file"
        @change="importfxx(this)"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      >
    </span>
    
  </div>
</template>

<script>
export default {
  name: "IMPORTFILE",
  data() {
    return {
      formData:[]
    };
  },
  methods: {
    // 导入
    importfxx: function(obj) {
      let _this = this;

      let inputDOM = this.$refs.inputer; // 通过DOM取文件数据
      this.file = event.currentTarget.files[0];
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;

      var reader = new FileReader(); //if (!FileReader.prototype.readAsBinaryString) {

      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";

        var rABS = false; //是否将文件读取为二进制字符串

        var pt = this;

        var wb; //读取完成的数据

        var outdata;

        var reader = new FileReader();

        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result);

          var length = bytes.byteLength;

          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }

          var XLSX = require("xlsx");

          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化

              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          } // outdata就是你想要的东西 excel导入的数据

          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); // excel 数据再处理
          //   let arr = [];

          //   outdata.map(v => {
          //     let obj = {};

          //     obj.account = v.登录账号;

          //     obj.name = v.姓名;

          //     obj.department = v.部门;

          //     obj.secondDepartment = v.二级部门;

          //     obj.status = v.状态;

          //     obj.id = v.id;

          //     arr.push(obj);
          //   });

          //   _this.accountList = [...arr];

          //   console.log(_this.accountList);

          //   _this.reload();

          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
          this.da = [...outdata];
          let arr = [];
          this.da.map(v => {
            let obj = {};
            obj.num = v.num;
            obj.bianzhihao = v.bianzhihao;
            obj.userId = v.userId;
            obj.name = v.name;
            obj.bubie = v.bubie;
            obj.zhiwumingcheng = v.zhiwumingcheng;
            obj.xiangangweishijian = v.xiangangweishijian;
            obj.zhijijishijian = v.zhijijishijian;
            obj.junxianjishijian = v.junxianjishijian;
            obj.birthDate = v.birthDate;
            obj.ruwushijian = v.ruwushijian;
            obj.jijishijian = v.jijishijian;
            obj.native = v.native;
            arr.push(obj);
          });
          console.log(arr);
          _this.$message({
            message: "请耐心等待导入……",
            type: "waitting"
          });
        _this.formData = arr;
        _this.$emit("importDatas",arr);

        //   let para = {
        //     //withList: JSON.stringify(this.da)
        //     withList: arr
        //   };
          //   withImport(para).then(res => {
          //     window.location.reload();
          //   });
        // 将数据加载到现有table表中

        };

        reader.readAsArrayBuffer(f);
      };

      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    }
  }
};
</script>


<style scoped>
.spanStyle {
  color: #409eff;
  font-size: 14px;
}
.fileinput-button {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.fileinput-button input {
  position: absolute;
  right: 0px;
  top: 0px;
  opacity: 0;
  /* -ms-filter: "alpha(opacity=0)"; */
}
.dropdownBox {
  display: flex;
  height: 40px;
}
.dropDiv {
  display: flex;
  width: 150px;
  height: 25px;
  background-color: transparent;
  align-items: center;
  justify-content: center;
}
</style>