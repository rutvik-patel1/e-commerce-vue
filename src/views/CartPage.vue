<template>
  <div class="container">
    <span class="d-flex mb-3 mt-2">
      <span class="material-symbols-outlined"> arrow_back </span> Back To
      Shopping
    </span>
    <div class="card">
      <table class="table cart">
        <thead>
          <tr>
            <th scope="col" class="w-10">Product ID</th>
            <th scope="col" class="w-50">Item</th>
            <th scope="col" class="w-10">Quantity</th>
            <th scope="col" class="w-10">Price</th>
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
                  <input type="number" name="" id="" @change="onChange(product.id,$event)" :value="product.count" size="4" min="0" max="10" />
                </td>
                <td><span>Rs. &#8377;{{product.price}}</span></td>
                <td>
                  <button class="btn btn-danger" @click="deleteItem(product.id)">
                    <span class="material-symbols-outlined"> delete_forever </span>
                  </button>
                </td>
              </tr>
        
          <tr>
            <td></td>
            <td></td>
            <td>Total Quantity: 5</td>
            <td>Grand Total :Rs. &#8377;{{total}}</td>
            <td><button class="btn btn-success">Buy Now</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
    
    created() {
       console.log("Created",this.cart)
       this.allItems = this.cart

    },
    data() {
        return {
            allItems:[],
            
        }
    },
    methods:{
        ...mapMutations('cart',['SET_QUANTITY']),
        ...mapMutations('cart',['DEL_ITEM']),
         onChange(id,e){
            console.log(id,e.target.value)
            const count = e.target.value
            const arr = [id,count]
            this.SET_QUANTITY(arr)
            console.log("completed")
         },
         deleteItem(id){
           this.DEL_ITEM(id)  
         } 
         , ...mapMutations('cart',['GET_TOTAL']),
    },
    
    computed:{
        ...mapState('cart',['cart']),
       
         
         total(){
            const total = this.GET_TOTAL()
           return total
           
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

</style>
