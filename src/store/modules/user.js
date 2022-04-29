const state = {
    name:'',
    token:'',

}

const getters = {}

const mutations = {
    RESET_STATE: (state) => {
        state.name = ''
        state.token =''
    },
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
};

const actions = {
   
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
