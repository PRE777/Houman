<template>
    <div class="main">
        <navbar></navbar>
        <Contain></Contain>
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from './Navbar'
import Contain from './contain'
  export default {
    name: "dashboard",
    components: {Navbar,Contain},
    data () {
      return {
        user: ''
      }
    }
  }
</script>

<style scoped>
</style>