<template>
<the-header class="shadow-sm"></the-header>
  <div class="container">
    <div class="card shadow">
      <h5 class="card-title">{{product.title}}</h5>
      <img class="card-img-top card-image" :src="product.image" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">Rs. &#8377;{{product.price*70}}</h5>
        <p class="card-text desc">{{ product.description }}</p>
        <p class="card-text ">{{product.category}}</p>
        <p class="card-text"><small class="text-muted">Rating:{{product.rating}}/5</small></p>
        <div class="d-flex" style="justify-content: space-around;">
    <button class="btn btn-warning btn-text" type="button" @click="addToCart()">Add to Cart! <span class="material-symbols-outlined">
    add_shopping_cart
    </span></button>
    <button class="btn btn-primary" type="button">Buy Now!<span class="material-symbols-outlined">
    shopping_bag
    </span></button>
    </div>
      </div>
    </div>
    <router-link to="/">
        <span class="material-symbols-outlined"> arrow_back </span> Back To
        Shopping
      </router-link>
  </div>
</template>

<script>
import axios from 'axios'
import TheHeader from "../components/TheHeader.vue"
export default {
  components:{
    TheHeader
  },
  async created() {
    const id = this.$route.params.id
    await axios.get(`https://fakestoreapi.com/products/${id}`)
    .then(res =>{
      console.log(res)
      this.product = res.data;
      this.product.rating = res.data.rating.rate
    })
    .catch(err => console.log(err))    
    
  },

  data() {
    return {
       product:{}, 
    }
  },
  methods: {
    addToCart(){
      const product = {
            id: this.product.id,
            title :this.product.title,
            img:this.product.image,
            price:this.product.price,
        } ;
     this.$store.commit('cart/SET_ITEM',product)
    }
  },
}
</script>

<style scoped>
.card-image{
  /* max-height: 200px; */
  padding: 25px;
  /* width: auto; */
}
.card-img-top{
  width: 190px;
  margin: 0 auto;
}
.card-text{
  font-size: 13px;
}
.card-title{
  font-size: 18px;
  font-weight: 600;
  margin: 20px auto 5px auto;

}
.card-title:hover{
  text-decoration: underline;
  cursor: pointer;
}
button{
display: flex !important;
justify-content: center;
justify-content:space-evenly;
}
.card:hover{
   transform: translate(0, -5px);
   border:1px solid black
}
.card-body{
  margin-top: 0px;
}
</style>