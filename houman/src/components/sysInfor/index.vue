<template>
    <div class="wrap">
        <div class="header">
          <navbar></navbar>
        </div>
        <div class="main">
            
        </div>
        <div class="footer">
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
import Navbar from '@/views/Dashboard/Navbar.vue'
import Footer from '@/views/Dashboard/footer.vue'
  export default {
    name: "dashboard",
    components: {Navbar,Footer},
    data () {
      return {
        user: ''
      }
    }
  }
</script>

<style scoped>
</style>