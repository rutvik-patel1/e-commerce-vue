import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import axios from "axios";
// import { updateCart } from 'cart.js'
const state = {
  userId: null,
  token: null,
  uName: null,
  visible:true
}

const getters = {
  userId(state) {
    return state.userId;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  token(state) {
    return state.token;
  },
}

const mutations = {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
  },
  setName(state, payload) {
    state.uName = payload;
  },
  resetToken(state) {
    state.token = null;
    state.userId = null;
    state.uName = null;
  },
  setVisibility(state,payload){
    state.visible = payload
  }
}


const actions = {
  async login({ commit,dispatch }, form) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.pass)
      .then((userCredential) => {
        localStorage.setItem("token", userCredential._tokenResponse.idToken);
        localStorage.setItem("userId", userCredential._tokenResponse.email);
        return userCredential;
      })
      .then((userCredential) => {
        commit("setUser", {
          token: userCredential._tokenResponse.idToken,
          userId: userCredential._tokenResponse.email,
        });
        dispatch("userkey")
        console.log(userCredential._tokenResponse.idToken);
        console.log(userCredential._tokenResponse.email);
      })
      .then(()=>{dispatch("cart/updateCart")})
      .catch((error) => console.log(error));
  },
  async signup({ commit,dispatch }, form) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, form.email, form.pass)
      .then((userCredential) => {
        commit("setUser", {
          token: userCredential._tokenResponse.idToken,
          userId: userCredential._tokenResponse.email,
        });
        console.log(userCredential);
        const obj = {  
          email: form.email,
          name: form.name,
          pass: form.pass
        };
        axios
          .post(
            `https://e-commerce-75633-default-rtdb.firebaseio.com/users.json`,
            obj
          )
          .then((res) => {
            console.log(res);
            dispatch("userkey")
          })
          .catch((error) => console.log(error));
      })

      .catch((error) => console.log(error));
  },

  async userkey(){
    axios.get(`https://e-commerce-75633-default-rtdb.firebaseio.com/users.json`)
    .then((response) => {
      response = response.data
      const uid = localStorage.getItem("userId")
      console.log(response)
      for (var key in response) {
        if (response.hasOwnProperty(key)) {
            if(response[key].email == uid){
                localStorage.setItem('userkey',key);
                break;
            }
            
        }
    }
    })
    
  },
  async logout({ commit }) {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("logout");
      })
      .catch((err) => {
        console.error(err);
      });
    localStorage.clear();
    commit("resetToken");
  },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};


