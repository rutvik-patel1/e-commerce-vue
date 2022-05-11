<template>
  <div class="container">
    <div class="layout-login">
      <div class="card">
        <div class="card-header">Login</div>
        <form @submit.prevent="getlogin">
          <label for="email">Email</label>
          <div class="card-text">
            <input type="email" id="email" v-model="form.email" required />
          </div>

          <label for="pass">Password</label>
          <div class="card-text">
            <input type="password" id="pass" v-model="form.pass" required />
          </div>
          <button type="submit" class="btn btn-primary">Sign In</button>
        </form>
        <div class="link">
          <router-link to="/register"
            >Dont have an account? Register</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            form:{
                email:'',
                pass:''
            }
        }
    },
    
    methods:{
        getlogin(){
            console.log("pressed")
            this.$store.dispatch('user/login', this.form)
            .then((res) => {
            let redirectTo = this.$route.query.redirectTo;
            console.log("is Redirected",redirectTo)
            if (redirectTo) {
            this.$router.push({ path: redirectTo });
            }else{
            this.$router.push('/home');}
           return res;
        })
        .catch((err) => {
          console.log("error in login");
        }); 
            
            
        }
    },
    computed:{
        
    }
};
</script>

<style scoped>
.link a {
  text-align: center;
  text-decoration: none;
}
.card:hover {
  transform: translate(0, 0);
}
.card {
  margin: auto;
  max-width: 500px;
  padding: 10px;
}
input {
  width: 100%;
  padding: 8px;
}
.btn {
  margin-top: 10px;
}
.card-header {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}
.layout-login {
  margin: auto;
  margin-top: 125px;
}
</style>