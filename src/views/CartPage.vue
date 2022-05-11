<template>
<the-header class="shadow-sm"></the-header>
  <div class="container">
    <span v-on:keydown="key">{{message}}</span>
    <span class="d-flex mb-3 mt-2">
      <router-link to="/">
        <span class="material-symbols-outlined"> arrow_back </span> Back To
        Shopping
      </router-link>
    </span>
    <div class="card" v-if="cart.length != 0">
      <table class="table cart">
        <thead>
          <tr>
            <th scope="col" class="w-10">Product ID</th>
            <th scope="col" class="w-50">Item</th>
            <th scope="col" class="w-10">Quantity</th>
            <th scope="col" class="w-10">Price/item</th>
            <th scope="col" class="w-20"></th>
          </tr>
        </thead>
        <tbody>
    
              <tr v-for="product in allItems" :key="product.id">
                <td>{{product.id}}</td>
                <td class="d-flex">
                  <img
                    :src="product.img"
    
                  />
                  <span>{{product.title}}</span>
                </td>
                <td>
                  <input type="number" name="" id="" @change="onChange(product.id,$event)" :value="product.count" size="4" min="1" max="10" />
                </td>
                <td><span>Rs. &#8377;{{parseFloat(product.price*70).toFixed(2)}}</span></td>
                <td>
                  <button class="btn btn-danger" @click="deleteItem(product.id)">
                    <span class="material-symbols-outlined"> delete_forever </span>
                  </button>
                </td>
              </tr>
        
          <tr>
            <td></td>
            <td></td>
            <td>Total Quantity:{{items}}</td>
            <td>Grand Total :&#8377;{{total}}</td>
            <td><button class="btn btn-success" @click="checkout">Buy Now</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div  class="no-item" v-else>
      Nothing in the cart !!!
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import TheHeader from "../components/TheHeader.vue"
export default {
    components:{
      TheHeader
    },
    created() {
       console.log("Created",this.cart)
       this.allItems = this.cart

    },
    data() {
        return {
            allItems:[],
            message:''
            
        }
    },
    methods:{
        ...mapMutations('cart',['SET_QUANTITY']),
        ...mapMutations('cart',['DEL_ITEM']),
         onChange(id,e){
            console.log(id,e.target.value)
            const count = e.target.value
            if(count > 0 && count <= 10){
            const arr = [id,count]
            this.SET_QUANTITY(arr)
            console.log("completed")
             this.$store.dispatch('cart/updateCart').then(result => console.log("dispatched methosd"))
            }
            else{
              alert("invalid input")
            }
            
         },
         deleteItem(id){
           console.log("in deleted!!")
           this.DEL_ITEM(id)
            this.$store.dispatch('cart/updateCart').then(result => console.log("dispatched methosd"))  
         },
         checkout(){
           console.log("isAuthenticated",this.$store.getters['user/isAuthenticated'])
           if(!this.$store.getters['user/isAuthenticated']){
             console.log(this.$route)
             this.$router.push({path: "/login", query: { redirectTo: this.$route.fullPath }})
           }
           else{
             console.log("done with checkout")
             let op = confirm("Do you want to continue ?");
             if(op){
               this.$store.commit('cart/RESET_STATE')
                this.$store.dispatch('cart/updateCart').then(result => console.log("dispatched methosd"))
             }
             else{
               alert("your purchase is not completed!!")
             }
           }
         }
        
    },
    
    computed:{
        ...mapState('cart',['cart']),
        // ...mapSta('cart',['GET_TOTAL']),
        items(){
          let sum = 0
           this.cart.forEach((each) => {
           sum  = sum + Number(each.count)
          })
        return sum
        
        },
        total(){
           let sum = 0
           this.cart.forEach((each) => {
           sum  = sum +  each.price*each.count
          })
        return parseFloat(sum*70).toFixed(2)
        }
    }
};
</script>

<style scoped>
table {
  text-align: center;
}
.card {
  border: none;
}
.cart img {
  width: 70px;
  height: 70px;
}

.card-image {
  max-height: 200px;
  padding: 25px;
}
.card-text {
  font-size: 13px;
}
.card-title {
  font-size: 18px;
  font-weight: 600;
  max-block-size: 20px;
  overflow: hidden;
}
.card-title:hover {
  text-decoration: underline;
  cursor: pointer;
}
button {
  display: flex !important;
  justify-content: center;
}
.card:hover {
  transform: translate(0, -1px);
}
.card-body {
  margin-top: 0px;
}
.desc {
  max-block-size: 40px;
  overflow: hidden;
}
.item2 {
  flex: 0 0 33%;
}

input {
  border: 1px solid grey;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  padding: 4px;
}
tr {
  vertical-align: middle;
}
.no-item{
  margin:auto;
  font-size: 45px;
  text-decoration: none;
}

</style>
