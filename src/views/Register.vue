<template>
  <div class="container">
      <div class="layout-login">
          <div class="card">
              <div class="card-header">Register</div>
              <form @submit.prevent="getRegister">
                <label for="name">Name</label>
                <div class="card-text"><input type="text" id="name" v-model="form.name" required></div>
                  <label for="email">Email</label>
                  <div class="card-text"><input type="email" id="email" v-model="form.email" required></div>
                  
                  <label for="pass">Password</label>
                  <div class="card-text"><input type="password" id="pass" v-model="form.pass"></div>
                  <button type="submit" class="btn btn-primary">Register</button>
              </form>
              <div class="link"><router-link to="/login">Already have an account? Login</router-link></div>
          </div>
      </div>
  </div>
</template>

<script>

export default {
    data() {
        return {
            form:{
                name:'',
                pass:'',
                email:''
            }
        }
    },
  methods:{
      getRegister(){
          this.$store.dispatch('user/signup', this.form)
            .then((res) => {
            let redirectTo = this.$route.query.redirectTo;
            if (redirectTo) {
            this.$router.replace({ path: redirectTo });
            }
            this.$router.push('/home');
           return res;
        })
        .catch((err) => {
          console.log("error in login");
        }); 
      }
  }  
}
</script>

<style scoped>
.card{
    margin:auto;
    max-width: 500px;
    padding:10px;
}
input{
    width: 100%;
    padding:8px;
    
}
.card-title{
    margin: 8px;
}
.btn{
    margin-top: 10px;
}
.card-header{
    text-align: center;
    font-size: 18px;
    font-weight: 600;
}
.layout-login{
    margin: auto;
    margin-top: 125px;
}
.link a , .link{
    text-align: center;
    text-decoration: none ;
}
.card:hover{
    transform: translate(0, 0);
}
</style>