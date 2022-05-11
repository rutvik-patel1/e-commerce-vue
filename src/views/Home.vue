<template>
<the-header class="shadow-sm"></the-header>
<div class="layout">
   <div class="section1">
      <p class="sidebar-title">categories</p>
      <ul v-for="item in categoryList" :key="item">
         <li @click="filteredItems(item)">{{item}}</li>
      </ul>
   </div>
   <div class="section2">
      <div class="item2" v-for="product in ProductList" :key="product.id">
         <item-card :product="product"></item-card> 
      </div>  
   </div>
</div>
</template>

<script>
import ItemCard from "../components/ItemCard.vue"
import TheHeader from "../components/TheHeader.vue"
import { mapState } from "vuex"
export default {
components:{
   ItemCard,
   TheHeader
   
},
data() {
   return {
      categoryList:[],
      ProductList:[],
      allProducts:[]
   }
},
created() {
   this.loadCategories()
   this.loadAllProducts()
},
computed:{
   ...mapState('cart', ['cart']),
   cart(){
    console.log("cart chanf=ged")
   }
},
methods:{
   loadCategories(){
      fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(json=>this.categoryList = json)
   },
   loadAllProducts(){
      fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then((json)=>{
               this.ProductList = json
               this.allProducts = json
               })
   },
   filteredItems(category){
      const filteredItems = this.allProducts.filter((item)=>{
        return item.category == category;
      })
      this.ProductList = filteredItems
   }
}

}
</script>

<style>
.layout{
   display: grid;
   gap:1.5rem;
   grid-template-areas: "section1 section2";
   grid-template-columns: 1fr 5fr;
}

.section2{
   display: flex;
   flex-wrap: wrap;
   padding-top: 20px;

}
.card{
   flex:0 0 30%;
   margin:10px;
}

.sidebar-title{
   text-align: center;
   font-size: 20px;
   margin-top: 25px;
   font-weight: bold;
}

.section1 > ul{
   list-style-type: none;
   text-align: center;
}

.section1 > ul:hover {
   border: 1px solid #000;
   background-color: #000;
   color: #fff;
}
.section1 > ul{
   border: 1px solid rgb(168, 165, 165);
   margin-left: 25px;
   padding: 5px;
   border-radius: 5px;
}
</style>