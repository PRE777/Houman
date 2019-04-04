<template>
  <div class="navbar">
    <router-link to="/menus1">点击验证动画效果</router-link><br>
    <router-link to="/menus2">跳转到menu2</router-link><br>
    <router-link to="/exportFileIndex">跳转到导出文件界面</router-link><br>
    <router-link to="/importFileIndex">导入文件</router-link><br>
  </div>
</template>

<script>
export default {
  name: "contain",
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>