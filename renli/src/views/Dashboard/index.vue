<template>
    <div class="wrap">
          <div class="header">
            <navbar></navbar>
          </div>
          <div class="main">
            <Contain></Contain>
            <router-view></router-view>
          </div>
          <div class="footer">
              <Footer></Footer>
          </div>
    </div>
</template>

<script>
import Navbar from './Navbar'
import Contain from './contain'
import Footer from './footer'
  export default {
    name: "dashboard",
    components: {Navbar,Contain,Footer},
    data () {
      return {
        
      }
    }
  }
</script>

<style scoped>
@import '../../../src/assets/css/publics.css'
</style>