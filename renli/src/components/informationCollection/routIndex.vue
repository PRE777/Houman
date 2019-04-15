<template>
  <div class="wrap">
    <div class="header">
      <navbar></navbar>
    </div>
    <div class="main">
      <ul class="list">
        <li v-for="(item,index) in list" :key="index" @click="icon(item.path)">
          <img :src="item.img">
          <div>{{item.names}}</div>
        </li>
      </ul>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import luan from "@/assets/images/404.png";
import ln from "@/assets/images/404_cloud.png";
import Navbar from "@/views/Dashboard/Navbar.vue";
import Footer from "@/views/Dashboard/footer.vue";
export default {
  name: "",
  components: { Navbar, Footer },
  data() {
    return {
      user: "",
      list: [
        {
          path: "/informationCollection",
          names: "采集",
          img: ln,
          component: () => import("@/components/informationCollection/index"),
          children: []
        },
        {
          path: "/informationCollection",
          names: "审核",
          img: ln,
          component: () =>
            import("@/components/informationCollection/approveIndex"),
          children: []
        }
      ]
    };
  },
  methods: {
    icon: function(path) {
        debugger
      this.$router.push(path);
    }
  }
};
</script>

<style scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
}
.list li {
  margin: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: PingFangSC-Regular;
  font-size: 18px;
  color: #333333;
  letter-spacing: 0;
}
.list li img {
  display: block;
  width: 100px;
  height: 100px;
}
.list li div {
  margin-top: 10px;
}
</style>