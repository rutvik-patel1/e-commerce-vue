import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import * as firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD7TQnjI-nesLrqxAQSmKvaS8dd_Hok4tE",
    authDomain: "e-commerce-75633.firebaseapp.com",
    projectId: "e-commerce-75633",
    storageBucket: "e-commerce-75633.appspot.com",
    messagingSenderId: "495084821984",
    appId: "1:495084821984:web:70b79cc436ef358b75df85"
  };
  

firebase.initializeApp(firebaseConfig);
createApp(App).use(store).use(router).mount('#app')
