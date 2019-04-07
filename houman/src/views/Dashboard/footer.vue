<template>
    <div class="navbar">
        <el-footer>XX人力资源信息系统   联系电话：010-000000</el-footer>
    </div>
</template>

<script>
  export default {
    name: "navbar",
    data () {
      return {
        user: ''
      }
    },
    methods: {
     
    },
    created () {
      
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .el-footer {
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 60px;
      position: fixed;
      bottom: 0px;
      width: 100%;
      background: #FFFFFF;
      box-shadow: 0 -1px 2px 0 rgba(209,209,209,0.50);
      font-family: MicrosoftYaHei;
      font-size: 13px;
      color: #5A6178;
    }  
</style>