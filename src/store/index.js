import Vuex from "vuex";
import cart from './modules/cart'
import user from './modules/user'

import createPersistedState from "vuex-persistedstate";

const store = new Vuex.Store({
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
        }),
    ],
    modules: {
        user,
        cart
    },
    
});

export default store;
