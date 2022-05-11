import axios from "axios"

const state = {
    
    cart:[],
    total:0

}

const getters = {
getCart(state){
    return state.cart
},
itemsInCart(state){
    return state.cart.length
},
getTotal(state){
    return state.total
}
}

const mutations = {
    RESET_STATE: (state) => {
        state.cart = []
    },
    SET_ITEM: (state, item) => {
        let result = state.cart;
            
        let resObj = result.find(resObj => resObj.id === item.id);
        resObj ? resObj.count++ : result.push({'id':item.id, 'title': item.title, "img":item.img, "price":item.price, 'count': 1});
        
        state.cart = result
        // state.cart.push(item);
    },
    SET_QUANTITY: (state, arr) => {
            const id = arr[0]
            const count = arr[1]
            state.cart.forEach((each,index) => {
                if(each.id == id) {
                    state.cart[index].count = count;
                }
            })
        },

    DEL_ITEM:(state,id)=>{
        state.cart.forEach((each,index) => {
            if(each.id == id) {
                state.cart.splice(index,1)
            }
        })
        
    },
   
};

const actions = {
      async updateCart({ commit,state}){
          const tkn = localStorage.getItem('token')
          if(tkn){
            const key = localStorage.getItem('userkey')
            console.log("updated cart",state.cart)
            axios.put(`https://e-commerce-75633-default-rtdb.firebaseio.com/users/${key}/cart.json`,state.cart)
//                       .then(res => console.log("cart upeded in firebase"))
          }
          else{
              console.log("loginFirst")
          }
      }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};


