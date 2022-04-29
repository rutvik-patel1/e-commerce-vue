const state = {
    
    cart:[]

}

const getters = {
getCart(state){
    return state.cart
},
itemsInCart(state){
    return state.cart.length
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
    GET_TOTAL: (state)=>{
        let sum = 0
        state.cart.forEach((each) => {
           sum  = sum +  each.price
        })
        return sum
    }
   
};

const actions = {
      getTotal({state}){
        let sum = 0
        state.cart.forEach((each) => {
           sum  = sum +  each.price
        })
        return sum
      }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
