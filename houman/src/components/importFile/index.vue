<template>
  <div class="main">
    <navbar></navbar>
    <ImportFile></ImportFile>
  </div>
</template>

<script>
import Navbar from "@/views/Dashboard/Navbar.vue";
import ImportFile from "./importFile.vue";
export default {
  name: "dashboard",
  components: { Navbar, ImportFile },
  data() {
    return {
      user: "",
    };
  },
  methods: {

  }
};
</script>

<style scoped>
.main {
  display: flex;
  height: 100%;
  flex-direction: column;
}

body > .el-container {
  flex: 1;
  margin-bottom: 40px;
}
</style>