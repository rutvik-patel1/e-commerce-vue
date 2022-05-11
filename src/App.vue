<template>
  <router-view/>
</template>

<script>
import { getDatabase, ref, set } from "firebase/database";
import { mapState } from "vuex";
import TheHeader from "./components/TheHeader.vue"
export default {
  components:{
   TheHeader
},
provide(){
  return{
    msg: this.msg
  }
},
computed:{
  
},
data() {
  return {
    
  }
},
}
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

</style>
